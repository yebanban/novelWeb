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
      <div v-for="book in books">
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
        >
          <div shadow="sm blue-100" rounded overflow-hidden>
            <!-- <div v-if="book.Cover"></div>
            <div v-else bg="gray-400/20" w='[10vw]' h-40 text-lg box-border p="x-3 y-1">
              {{ book.name }}
            </div> -->
            <div bg="gray-400/20" w="[10vw]" h-40 text-lg box-border p="x-3 y-1">
              {{ book.name }}
            </div>
          </div>
        </div>
        <p p="x-3 y-2">{{ book.name }}</p>
      </div>
    </div>
    <input-dialog
      v-model="dialogVisible"
      @clickEnter="newBook"
      title="新建小说"
      placeholder="请输入新小说名"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import bookApi, { BookInfo } from '../apis/bookApi'
import { removeFLSpaces } from '../common/utils';
const router = useRouter()
const books = ref<BookInfo[]>()
const setLoading = inject<(on: boolean) => void>('setLoading') as (on: boolean) => void
const loading = inject<boolean>('loading')
const dialogVisible = ref(false)
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
const addBook = (book:BookInfo) => {
  books.value?.push(book)
}
const newBook = async (name: string) => {
  try {
    setLoading(true)
    name=removeFLSpaces(name)
    const bookId = (await bookApi.create({ name })).result.id
    addBook({id:bookId, name})
    setLoading(false)
  } catch (error) {
    setLoading(false)
    alert(error)
  }
}
const openBook = (book: BookInfo) => {
  router.push({ name: 'edit', params: { name: book.name, id: book.id } })
}
</script>

<style lang="scss" scoped></style>
