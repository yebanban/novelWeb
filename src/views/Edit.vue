<template>
  <div bg="light-600" min-h="full" flex :class="loading ? 'blur-sm' : ''">
    <my-aside @expand="addWidth" @close="reduceWidth" :novelId="novelId" :menuList="MenuList"
      :menuScrollIndex="menuScrollIndex" z-10 />
    <div :style="{ width: w }" min-h="full" duration-500 ease-in-out></div>
    <my-article v-if="MenuList ? MenuList[1]?.menuItems?.length : false" md:my-8 md:mx-16 my-4 mx-1 flex="1" ref="modal"
      @updateTitle="updateCatalogItemTitle" />
    <blank-article v-else my="[10vh]" mx-16 flex="1" />
    <input-dialog v-model="dialogVisible" @clickEnter="newChapter" title="新建章节" placeholder="请输入新章节名" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import bookApi from '../apis/bookApi'
import chapterApi, { ChapterIdName } from '../apis/chapterApi'
import { removeFLSpaces, getOrder } from '../common/utils';
import { useCurrentArticle } from '../store/currentArticle'
import MyArticle from '../components/MyArticle.vue';
import MyAside from '../components/MyAside.vue';
const modal = ref<InstanceType<typeof MyArticle> & { changeContentWordsCount: () => Promise<void>, updateContentEditor: (str: string) => void } | null>(null)
const menuScrollIndex = ref(0)
const w = ref('0')
const route = useRoute()
const router = useRouter()
const novelName = ref(route.params.name)
const store = useCurrentArticle()
const novelId = ref(route.params.id as string)
const chapters = ref<ChapterIdName[]>()
const MenuList = ref<Menu[]>()
const dialogVisible = ref(false)
document.title = novelName.value as string
const setLoading = inject<(on: boolean) => void>('setLoading') as (on: boolean) => void
const loading = inject<boolean>('loading')
const createCatalogItem = (id: string, title: string, selected: boolean) => {
  return {
    id,
    itemName: title,
    selected,
    canDelete: true,
    clickMe: async function () {
      if (this.selected) return
      setLoading(true)
      try {
        let content = (await chapterApi.getChapterContent({ id: this.id })).result.content
        store.updateChapter(this.id, this.itemName, content)
        modal.value?.updateContentEditor(content)
        window.scrollTo(0, 0)
        await modal.value?.changeContentWordsCount()
      } catch (error) {
        alert(error)
      }
      setLoading(false)
    },
  }
}
try {
  setLoading(true)
  chapters.value = (await bookApi.getChapters({ id: novelId.value })).result.chapters
  chapters.value.sort((a, b) => getOrder(a.title) - getOrder(b.title))
  if (chapters.value.length > 0) {
    let content = (await chapterApi.getChapterContent({ id: chapters.value[0].id })).result.content
    store.updateChapter(chapters.value[0].id, chapters.value[0].title, content)
    modal.value?.updateContentEditor(content)
  }
  setLoading(false)
  MenuList.value = [
    {
      name: '主页',
      logo: 'i-ph:house',
      clickMe: () => {
        router.push('/home')
      },
    },
    {
      name: '目录',
      logo: 'i-mdi:format-align-right',
      menuItems: chapters.value.map((chapter, index) =>
        createCatalogItem(chapter.id, chapter.title, index === 0 ? true : false)
      ),
    },
    { name: '设置', logo: 'i-ph:nut-bold' },
    { name: '关于', logo: 'i-mdi:information-outline' },
  ]
} catch (error) {
  setLoading(false)
  alert(error)
  router.push('/home')
}
const updateCatalogItemTitle = (id: string, title: string) => {
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      let index = menuItems.findIndex(item => item.id === id)
      menuItems[index].itemName = title
      menuItems.sort((a, b) => getOrder(a.itemName) - getOrder(b.itemName))
      index = menuItems.findIndex(item => item.id === id)
      menuScrollIndex.value = index
    }
  }
}
const addCatalogItem = (id: string, title: string) => {
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      let index = menuItems.findIndex(item => getOrder(item.itemName) > getOrder(title))
      if (index === -1) index = menuItems.length
      menuItems.forEach(item => (item.selected = false))
      menuItems.splice(index, 0, createCatalogItem(id, title, true));
      menuScrollIndex.value = index
    }
  }
}
const openNewChapterDialog = () => {
  dialogVisible.value = true
}
const deleteCatalogItem = async (id: string) => {
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      let index = menuItems.findIndex(item => item.id === id)
      menuItems.splice(index, 1)
      if (menuItems.length === 0) {
        store.updateChapter('', '', '')
        modal.value?.updateContentEditor('')
        return
      } else if (index === menuItems.length) {
        index--
      }
      const item = menuItems[index]
      setLoading(true)
      let content = (await chapterApi.getChapterContent({ id: item.id })).result.content
      setLoading(false)
      menuItems.forEach(item => (item.selected = false))
      item.selected = true
      store.updateChapter(item.id, item.itemName, content)
      modal.value?.updateContentEditor(content)
      window.scrollTo(0, 0)
      await modal.value?.changeContentWordsCount()
    }
  }
}
const newChapter = async (name: string) => {
  try {
    setLoading(true)
    name = removeFLSpaces(name)
    const chapterId = (await chapterApi.create({ bookId: novelId.value, chapterName: name })).result
      .id
    setLoading(false)
    addCatalogItem(chapterId, name)
    store.updateChapter(chapterId, name, '')

    window.scrollTo(0, 0)
    await modal.value?.changeContentWordsCount()
    modal.value?.updateContentEditor('')
  } catch (error) {
    setLoading(false)
    alert(error)
  }
}
provide('openNewChapterDialog', openNewChapterDialog)
provide('deleteCatalogItem', deleteCatalogItem)

const addWidth = () => {
  w.value = 16.25 + 'rem'
}
const reduceWidth = () => {
  w.value = '0'
}
</script>

<style lang="scss" scoped></style>
