<template>
  <aside>
    <Transition name="menu">
      <div
        v-if="isExpand"
        w-50
        h-screen
        rounded-r-3xl
        bg-white
        fixed
        z-10
        flex="~ col gap-8"
        items-center
      >
        <div m-y-25 h="[70vh]" w-40 font="sans semibold" text="xs gray-600" flex="~ col gap-3" select-none>
          <div menu-item>
            <div i-ph:house text="base"></div>
            主页
          </div>
          <div menu-item>
            <div i-mdi:format-align-right text="base"></div>
            目录
          </div>
          <div menu-item>
            <div i-ph:nut-bold text="base"></div>
            设置
          </div>
          <div menu-item>
            <div i-mdi:information-outline text="base"></div>
            关于
          </div>
        </div>
        <div i-mdi:close btn-logo absolute top-3 right-3 text="gray-600" @click="close"></div>
      </div>
    </Transition>
    <Transition name="expand">
      <div
        v-if="!isExpand"
        h="20"
        shadow="lg blue-500/50"
        bg-white
        rounded-r-xl
        top="[40vh]"
        flex
        justify="center"
        items-center
        fixed
        @click="expand"
      >
        <div btn i-mdi:menu px-2></div>
      </div>
    </Transition>
  </aside>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'expand'): void
  (e: 'close'): void
}>()
const isExpand = ref(false)
const expand = () => {
  isExpand.value = true
  emit('expand')
}
const close = () => {
  isExpand.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
.expand-enter-active {
  transition: 0.3s;
}
.expand-enter-from {
  transform: translateX(-2rem);
}
.expand-enter-to {
  transform: translateX(0);
}
.menu-enter-active,
.menu-leave-active {
  transition: 0.5s ease-in-out;
}
.menu-enter-from,
.menu-leave-to {
  transform: translateX(-50rem);
}
.menu-leave-from,
.menu-enter-to {
  transform: translateX(0);
}
</style>
