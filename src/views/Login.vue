<template>
  <div bg="dark-900" h="full" text-center :class="loading ? 'blur-sm' : ''">
    <div pt-50 flex="~ col"  items-center>
      <h3 text="gray-200">夜半小说后台管理系统</h3>
      <div w-80 pt-5 flex="~ col"  items-start >
        <input type="text" v-model="username" placeholder="请输入管理员账号" input />
        <div flex items-center mt-3>
          <input type="password" v-model="input" placeholder="请输入管理员密码" input />
          <button @click="login" i-ph:caret-right-bold btn-logo text="white-200 2xl"></button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import loginApi from '../apis/loginApi';
const username = ref('')
const input = ref('')
const router = useRouter()
const loading = inject<boolean>('loading')
const login = async () => {
  try {
    let token = (await loginApi.login({username:username.value, password: input.value })).result.token

    if (token) {
      sessionStorage.setItem('token', token)
      router.push('/home')
    }
  } catch (error) {
    alert(error)
  }
}
document.onkeydown = function (e) {
  var e = e || window.event
  //获取发生事件的元素，兼容IE和DOM
  var key = e.code
  if (key == 'NumpadEnter' || key == 'Enter') {
    login()
  }
}

document.title = '登录'

onBeforeUnmount(() => {
  document.onkeydown = null
})
</script>

<style lang="scss" scoped></style>
