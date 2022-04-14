<template>
  <aside>
    <Transition name="menu">
      <div
        v-if="isExpand"
        w-65
        h-screen
        rounded-r-3xl
        bg-white
        fixed
        z-10
        flex="~ col gap-8"
        items-center
      >
        <div
          m-y-25
          h="[70vh]"
          w-53
          font="sans semibold"
          text="sm gray-600"
          flex="~ col gap-3"
          select-none
        >
          <Menu
            v-for="(menu, index) in MenuList"
            :key="index"
            :name="menu.name"
            :logo="menu.logo"
            :menu-items="menu.menuItems"
            :duration="menu.duration"
          />
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
interface Menu {
  name: string
  logo: string
  menuItems?: MenuItem[]
  duration?: number
}
const MenuList  = ref<Menu[]>([
  { name: '主页', logo: 'i-ph:house' },
  {
    name: '目录',
    logo: 'i-mdi:format-align-right',
    menuItems: [
      {
        id:0,
        itemName: '第一章 绝世美女',
        clickMe: () => {
          console.log(1)
        },
        selected:false
      },
      {
        id:1,
        itemName: '第二章 天下第一美女',
        clickMe: () => {
          console.log(1)
        },
        selected:false
      },{
        id:2,
        itemName: '第三章 巨乳细腰肥臀大长腿美女',
        clickMe: () => {
          console.log(1)
        },
        selected:false
      },
      {
        id:3,
        itemName: '第一章 绝世美女',
        clickMe: () => {
          console.log(1)
        },
        selected:false
      },
      {
        id:4,
        itemName: '第一章 绝世美女',
        clickMe: () => {
          console.log(1)
        },
        selected:false
      },
    ],
  },
  { name: '设置', logo: 'i-ph:nut-bold' },
  { name: '关于', logo: 'i-mdi:information-outline' },
])
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
