<template>
  <div>
    <div menu-item @click="expand(); emit('clickMe')"
      :class="{ 'bg-blue-200/400': isShowItems, 'hover:bg-blue-200/400': isShowItems }" mb-1>
      <div :class="logo" text="base"></div>
      {{ name }}
    </div>
    <Transition appear name="itemList">
      <div :style="{ 'transition-duration': duration + 's' }" max-h="[35vh]" shadow="sm gray-200" rounded-lg box-border
        overflow-y-auto class="hideScrollbar" ref="menu" v-if="isShowItems">
        <div p="l-4 r-2 y-2" text="xs center" cursor="pointer" border-gray-100 border="0 b-1"
          @click="openNewChapterDialog" bg="red-100/40 hover:red-100/70 active:red-100">
          新建章节
        </div>
        <div p="l-4 r-2 y-2" text="xs" cursor="pointer" border-gray-100 border="0 b-1" truncate relative
          v-for="item in menuItems" :key="item.id" @click="item.clickMe(); select(item)" :class="getbgColor(item)"
          class="item">
          {{ item.itemName }}
          <div v-if="item.canDelete" class="delete" hidden btn-logo i-mdi:trash-can-outline absolute right="1" top="1/2"
            translate-y="-1/2" @click="showDeleteDialog(item.id)"></div>
        </div>
      </div>
    </Transition>
    <Dialog v-model="dialogVisible" tips="是否删除该章节？" @clickEnter="deleteChapter(wantToDelete)" />
  </div>
</template>

<script setup lang="ts">
import chapterApi from '../apis/chapterApi'
import { throttle } from '../common/utils'
const props = withDefaults(
  defineProps<{
    name: string
    logo: string
    menuItems?: MenuItem[]
    duration?: number
    menuScrollIndex: number
  }>(),
  {
    duration: 0.5,
  }
)
const emit = defineEmits<{
  (e: 'clickMe'): void
}>()
const menu = ref<HTMLDivElement | null>(null)
const dialogVisible = ref(false)
const wantToDelete = ref('')
const openNewChapterDialog = inject<() => void>('openNewChapterDialog')
const deleteCatalogItem = inject<(id: string) => Promise<void>>('deleteCatalogItem')
const showDeleteDialog = (id: string) => {
  dialogVisible.value = true
  wantToDelete.value = id
}
const isShowItems = ref(false)
const expand = throttle(() => {
  if (props.menuItems) {
    isShowItems.value = !isShowItems.value
  }
}, props.duration * 1000)

const getbgColor = (menuItem: MenuItem) => {
  if (!menuItem.selected) return 'hover:bg-blue-100/20'
  return 'bg-blue-100/50 hover:bg-blue-100/50'
}
const select = (menuItem: MenuItem) => {
  props.menuItems?.forEach(item => (item.selected = false))
  menuItem.selected = true
}
const deleteChapter = async (id: string) => {
  dialogVisible.value = false
  try {
    await chapterApi.deleteChapter({ id })
    if (deleteCatalogItem) {
      await deleteCatalogItem(id)
    }
  } catch (error) {
    alert(error)
  }
}
const menuScrollTo = (index: number) => {
  nextTick().then(function () {
    menu.value?.scrollTo(0, index <= 2 ? 0 : (index - 2) * 32.7)
  })
}
watch(() => props.menuScrollIndex, (menuScrollIndex) => {
  menuScrollTo(menuScrollIndex)
})
</script>

<style lang="scss" scoped>
.itemList-enter-from,
.itemList-leave-to {
  max-height: 0;
}

.item {
  &:hover {
    .delete {
      display: block;
    }
  }
}
</style>
