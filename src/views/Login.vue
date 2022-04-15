<template>
  <div bg="dark-900" h="full" text-center>
    <div pt-50>
      <h3 text="gray-200">夜半小说后台管理系统</h3>
      <div pt-10 flex justify="center" items-center>
        <input
          type="password"
          v-model="input"
          placeholder="请输入管理员密码"
          input
        />
        <button @click="login" i-ph:caret-right-bold btn-logo text="white-200 2xl"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const input = ref('')
const router = useRouter()
const login = () => {
  if (input.value === '123321') {
    sessionStorage.setItem('token', 'res.token')
    router.push('/home')
  }
}
document.onkeydown = function (e) {
  var e = e || window.event
  //获取发生事件的元素，兼容IE和DOM
  var key = e.code
  if (key == 'NumpadEnter'||key=='Enter') {
    login()
  }
}

document.title="登录"

onBeforeUnmount(()=>{
    document.onkeydown=null
})
</script>

<style lang="scss" scoped></style>
