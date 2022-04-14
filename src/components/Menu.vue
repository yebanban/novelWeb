<template>
  <div>
    <div
      menu-item
      @click="expand"
      :class="{ 'bg-blue-200/400': isShowItems, 'hover:bg-blue-200/400': isShowItems }"
      mb-1
    >
      <div :class="logo" text="base"></div>
      {{ name }}
    </div>
    <Transition appear name="itemList" @before-enter="onBeforeEnter" @after-enter="onAfterEnter">
      <div
        :style="{ 'transition-duration': duration + 's' }"
        max-h="[35vh]"
        shadow="sm gray-200"
        rounded-lg
        box-border
        overflow-y-auto
        class="hideScrollbar"
        v-if="isShowItems"
      >
        <div
          p="l-4 r-2 y-2"
          text="xs"
          cursor="pointer"
          border-gray-100
          border="0 b-1"
          truncate
          v-for="item in menuItems"
          :key="item.id"
          @click="item.clickMe;select(item)"
          :class="getbgColor(item)"
        >
          {{ item.itemName }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { throttle } from '../composables/help'
const props = withDefaults(
  defineProps<{
    name: string
    logo: string
    menuItems?: MenuItem[]
    duration?: number
  }>(),
  {
    duration: 0.5,
  }
)

const isShowItems = ref(false)
const expand = throttle(() => {
    if(props.menuItems){
        isShowItems.value = !isShowItems.value
    }
}, props.duration * 1000)
const onBeforeEnter = (el: HTMLElement) => {
  console.log(window.getComputedStyle(el).height)
}
const onAfterEnter = (el: HTMLElement) => {
  console.log(window.getComputedStyle(el).height)
}
const getbgColor=(menuItem:MenuItem)=>{
    if(!menuItem.selected) return 'hover:bg-blue-100/20'
    return 'bg-blue-100/50 hover:bg-blue-100/50'
}
const select=(menuItem:MenuItem)=>{
    props.menuItems?.forEach(item=>item.selected=false)
    menuItem.selected=true
}
</script>

<style lang="scss" scoped>
.itemList-enter-from,
.itemList-leave-to {
  max-height: 0;
}
</style>
