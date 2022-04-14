<template>
  <div py-10 m-auto w="[65vw]">
    <div flex justify="between" px-3>
      <h2>书架</h2>
      <div flex="~ gap-5">
        <div btn-logo i-ph:magnifying-glass />
        <div btn-logo i-ph:plus />
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
            <div v-if="book.Cover"></div>
            <div v-else bg="gray-400/20" w='[10vw]' h-40 text-lg box-border p="x-3 y-1">
              {{ book.name }}
            </div>
          </div>
        </div>
        <p p="x-3 y-2">{{ book.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Book } from '../../types/book'
import { http } from '../plugins/axios';
const router = useRouter()
const b=await http.request({url:'getbooks'})
console.log(b)
const books = ref<Book[]>([
  { id: 0, name: '逆天邪神' },
  { id: 1, name: '斗罗大陆' },
  { id: 2, name: '无敌公子' },
  { id: 0, name: '逆天邪神' },
  { id: 1, name: '斗罗大陆' },
  { id: 2, name: '无敌公子' },
  { id: 0, name: '逆天邪神' },
  { id: 1, name: '斗罗大陆' },
  { id: 2, name: '无敌公子' },
])
const openBook = (book: Book) => {
  router.push({ name: 'edit', params: { name: book.name, id: book.id } })
}

</script>

<style lang="scss" scoped></style>
