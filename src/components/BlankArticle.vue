<template>
  <article>
    <div
      rounded-3xl
      bg="white"
      h="[80vh]"
      w="4/5"
      m-auto
      flex="~ col gap-4"
      justify-center
      items-center
      cursor-pointer
      @click="openNewChapterDialog"
    >
      <div border="1 blue-100" rounded="1/2" p-6>
        <div btn-logo i-ph:plus text="gray-400"></div>
      </div>
      <span text="gray-600">新建章节</span>
    </div>
  </article>
</template>

<script setup lang="ts">
const openNewChapterDialog = inject<() => void>('openNewChapterDialog')
</script>

<style lang="scss" scoped></style>
