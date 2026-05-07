<script setup lang="ts">
const loading=ref(false)
const setLoading=(on:boolean)=>{
  loading.value=on
}

provide('setLoading',setLoading)
provide('loading',loading)
</script>

<template>
<Loading  v-if="loading"/>
<!-- 原先用 <suspense> 包裹 router-view。Suspense 在路由切换时与子组件内的
     Transition（见 MyAside.vue / Menu.vue）产生 DOM 竞态：
     旧组件卸载时 Transition 试图对已移除的节点执行动画，触发
     "Cannot read properties of null (reading 'parentNode')"。
     现将 Home/Edit 的顶层 await 移入 onMounted，组件不再依赖 Suspense，
     直接裸放 router-view 即可。 -->
<router-view />
</template>

<style>
#app{
  height:100%;
}
.a{
  width:20px;
}
</style>
