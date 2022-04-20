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
<suspense >
  <router-view />
</suspense>
</template>

<style>
#app{
  height:100%;
}
.a{
  width:20px;
}
</style>
