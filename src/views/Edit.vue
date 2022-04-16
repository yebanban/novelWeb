<template>
  <div bg="light-600" min-h="full" flex>
    <my-aside @expand="addWidth" @close="reduceWidth" :novelId="novelId" :menuList="MenuList" />
    <div :style="{ width: w }" min-h="full" duration-500 ease-in-out></div>
    <my-article v-if="MenuList[1]?.menuItems?.length" my-8 mx-16 flex="1" min-h="[90vh]" @updateTitle="updateMenuItemTitle" />
    <blank-article v-else my="[10vh]" mx-16 flex="1" />
    <el-dialog v-model="dialogVisible" title="新建章节" width="50%" draggable>
      <el-input v-model="newChapterTitle" placeholder="请输入新章节名" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false;newChapterTitle=''">取消</el-button>
          <el-button
            type="primary"
            :disabled="newChapterTitle ? false : true"
            @click="newChapter(newChapterTitle)"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import bookApi from '../apis/bookApi'
import chapterApi, { ChapterIdName } from '../apis/chapterApi'
import { useCurrentArticle } from '../store/currentArticle'
const w = ref('0')
const route = useRoute()
const novelName = ref(route.params.name)
const newChapterTitle = ref('')
const store = useCurrentArticle()
const novelId = ref(route.params.id as string)
const chapters = ref<ChapterIdName[]>()
const MenuList = ref<Menu[]>()
const dialogVisible = ref(false)
document.title = novelName.value as string

try {
  chapters.value = (await bookApi.getChapters({ id: novelId.value })).result.chapters
  //chapters.value.sort((a, b) => a.title.localeCompare(b.title))
  if(chapters.value.length>0){
    let content = (await chapterApi.getChapterContent({ id: chapters.value[0].id })).result.content
    store.updateChapter(chapters.value[0].id, chapters.value[0].title, content)
  }
  
  MenuList.value = [
    { name: '主页', logo: 'i-ph:house' },
    {
      name: '目录',
      logo: 'i-mdi:format-align-right',
      menuItems: chapters.value.map((chapter,index) => ({
        id: chapter.id,
        itemName: chapter.title,
        selected: index>0?false:true,
        canDelete:true,
        clickMe: async function () {
          let content = (await chapterApi.getChapterContent({ id: chapter.id })).result.content
          store.updateChapter(this.id, this.itemName, content)
        },
      })),
    },
    { name: '设置', logo: 'i-ph:nut-bold' },
    { name: '关于', logo: 'i-mdi:information-outline' },
  ]
} catch (error) {
  alert(error)
}
const updateMenuItemTitle = (id: string, title: string) => {
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      let index = menuItems.findIndex(item => item.id === id)
      menuItems[index].itemName = title
      //menuItems.sort((a, b) => a.itemName.localeCompare(b.itemName))
    }
  }
}
const addMenuItem = (id: string, title: string) => {
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      //let index = menuItems.findIndex(item => item.itemName.localeCompare(title) > 0)
      menuItems.forEach(item=>item.selected=false)
      menuItems.push({
        id,
        itemName: title,
        selected: true,
        canDelete:true,
        clickMe: async function () {
          let content = (await chapterApi.getChapterContent({ id })).result.content
          store.updateChapter(this.id, this.itemName, content)
        },
      })
    }
  }
}
const openNewChapterDialog = () => {
  dialogVisible.value = true
}
const deleteMenuItem=async (id:string)=>{
  if (MenuList.value) {
    const menuItems = MenuList.value[1].menuItems
    if (menuItems) {
      let index = menuItems.findIndex(item => item.id===id)
      menuItems.splice(index,1)
      if(menuItems.length===0){
        store.updateChapter('', '', '')
        return
      }else if(index===menuItems.length){
        index--
      }
      const item=menuItems[index]
      let content = (await chapterApi.getChapterContent({ id: item.id })).result.content
      menuItems.forEach(item=>item.selected=false)
      item.selected=true
      store.updateChapter(item.id,item.itemName, content)
    }
  }
}
provide('openNewChapterDialog',openNewChapterDialog)
provide('deleteMenuItem',deleteMenuItem)
const newChapter = async (name: string) => {
  try {
    const chapterId = (
      await chapterApi.create({ bookId: novelId.value, chapterName: newChapterTitle.value })
    ).result.id
    addMenuItem(chapterId, name)
    store.updateChapter(chapterId, name, '')
    newChapterTitle.value=''
    dialogVisible.value=false
  } catch (error) {
    alert(error)
  }
}
const addWidth = () => {
  w.value = 16.25 + 'rem'
}
const reduceWidth = () => {
  w.value = '0'
}
</script>

<style lang="scss" scoped></style>
