<template>
  <div w-full h-full bg="transparent" absolute z="10">
    <div text-center>
      <div w-40 h-40 relative m-auto m-t="[30vh]">
        <div
          v-for="i in 10"
          :key="i"
          h-6
          w-1
          bg-blue-500
          absolute
          left="1/2"
          top="1/2"
          duration-1000
          ease-linear
          :style="{ transform: `rotate(${36 * (i - 1 + a)}deg)`, 'transform-origin': '0 -50%' }"
        ></div>

        <span absolute left="1/3" bottom="5" font="sans semibold" text="sm gray-600">
          加载中...
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const a = ref(0)
setTimeout(() => {
  a.value += 4
})
let timer = setInterval(() => {
  a.value += 4
}, 1000)
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped></style>
