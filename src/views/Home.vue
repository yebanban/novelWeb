<template>
  <div py-10 m-auto w="[65vw]" :class="loading ? 'blur-sm' : ''">
    <div flex justify="between" px-3>
      <h2>书架</h2>
      <div flex="~ gap-5">
        <div btn-logo i-ph:magnifying-glass />
        <div btn-logo i-ph:plus @click="openInputDialog" />
      </div>
    </div>
    <div
      mt-10
      bg="light-100/50"
      min-h="[78.5vh]"
      rounded-2xl
      font="sans"
      shadow="xl blue-100"
      w="full"
      box-border
      p="y-10 x-[4vw]"
      flex="~ wrap gap-15"
    >
      <div v-for="book in books" w-40>
        <div
          border="1 gray-300"
          rounded-md
          p-2
          flex
          justify="center"
          items-center
          cursor-pointer
          hover="transition-300 shadow-light-500 shadow-xl -translate-y-1"
          @click="openBook(book)"
          @contextmenu.prevent.stop="showDeleteMenu($event, book.id)"
        >
          <div shadow="sm blue-100" w-full rounded overflow-hidden >
            <!-- <div v-if="book.Cover"></div>
            <div v-else bg="gray-400/20" w='[10vw]' h-40 text-lg box-border p="x-3 y-1">
              {{ book.name }}
            </div> -->
            <div bg="gray-400/20" h-40  text-lg box-border p="x-3 y-1">
              {{ book.name }}
            </div>
          </div>
        </div>
        <p p="x-3 y-2" truncate >{{ book.name }}</p>
      </div>
    </div>
    <input-dialog
      v-model="dialogVisible"
      @clickEnter="newBook"
      title="新建小说"
      placeholder="请输入新小说名"
    />
  </div>
  <div
    v-if="isShowMenu"
    p="y-1 "
    w-25
    border="1 gray-400"
    shadow="sm gray-900/10"
    rounded-md
    absolute
    z-10
    bg="white"
    :style="{ top: menuTop, left: menuLeft }"
  >
    <div
      v-for="item in menus"
      font-mono
      text="sm center gray-900"
      p-y-1
      p-x-3
      hover-bg="blue-500/20"
      @click="item.clickMe"
      select-none
      cursor-pointer
    >
      {{item.name}}
    </div>
  </div>
  <input-dialog
      v-model="updateDialogVisible"
      @clickEnter="updateBook"
      title="修改小说名"
      placeholder="请输入小说名"
    />
  <Dialog v-model="deleteDialogVisible" tips="是否删除本书？" @clickEnter="deleteBook" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import bookApi, { BookInfo } from '../apis/bookApi'
import { getScroll, removeFLSpaces } from '../common/utils'
const router = useRouter()
const books = ref<BookInfo[]>()
const setLoading = inject<(on: boolean) => void>('setLoading') as (on: boolean) => void
const loading = inject<boolean>('loading')
const dialogVisible = ref(false)
const updateDialogVisible=ref(false)
const deleteDialogVisible = ref(false)
const currentSelectedId = ref('')
const isShowMenu = ref(false)
const menuTop = ref('')
const menuLeft = ref('')
document.title = '夜半小说网'

try {
  setLoading(true)
  books.value = (await bookApi.getAllBook()).result.books
  setLoading(false)
} catch (error) {
  setLoading(false)
  alert(error)
}
const openInputDialog = () => {
  dialogVisible.value = true
}
const openUpdateDialog=()=>{
  updateDialogVisible.value = true
}
const openDeleteDialog = () => {
  deleteDialogVisible.value = true
}
const addBook = (book: BookInfo) => {
  books.value?.push(book)
}
const updateBookItem=(book: BookInfo) => {
  const index=books.value?.findIndex(b=>b.id===book.id) as number
  (books.value as BookInfo[])[index].name=book.name
}
const removeBook = (id: string) => {
  const index = books.value?.findIndex(book => book.id === id) as number
  if (index >= 0) books.value?.splice(index, 1)
}
const updateBook=async (name:string)=>{
  try {
    setLoading(true)
    name = removeFLSpaces(name)
    await bookApi.updateBookName({ id:currentSelectedId.value, name })
    updateBookItem({ id: currentSelectedId.value, name })
    setLoading(false)
  } catch (error) {
    setLoading(false)
    alert(error)
  }
}
const newBook = async (name: string) => {
  try {
    
    setLoading(true)
    name = removeFLSpaces(name)
    const bookId = (await bookApi.create({ name })).result.id
    addBook({ id: bookId, name })
    setLoading(false)
  } catch (error) {
    setLoading(false)
    alert(error)
  }
}
const showDeleteMenu = (e: MouseEvent, id: string) => {
  isShowMenu.value = true
  let { scrollX, scrollY }=getScroll()
  menuTop.value = e.clientY+scrollY + 'px'
  menuLeft.value = e.clientX+scrollX + 'px'
  currentSelectedId.value = id
}
const hiddenDeleteMenu = (e: MouseEvent) => {
  e.preventDefault()
  isShowMenu.value = false
}
const deleteBook = async () => {
  deleteDialogVisible.value = false
  try {
    setLoading(true)
    await bookApi.deleteBook({ id: currentSelectedId.value })
    removeBook(currentSelectedId.value)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    alert(error)
  }
}
const openBook = (book: BookInfo) => {
  router.push({ name: 'edit', params: { name: book.name, id: book.id } })
}
const menus=ref([{name:'修改名字',clickMe:openUpdateDialog},{name:'删除本书',clickMe:openDeleteDialog}])
onMounted(() => {
  window.addEventListener('click', hiddenDeleteMenu)
  window.addEventListener('contextmenu', hiddenDeleteMenu)
})
</script>

<style lang="scss" scoped></style>
