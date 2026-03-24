/*
 * @Description: 
 * @Author: yebanban
 * @Date: 2022-04-13 09:49:58
 * @LastEditTime: 2025-07-03 17:01:53
 * @LastEditors: yebanban
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'uno.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupPlugins } from './plugins'
const app=createApp(App)
app.use(ElementPlus)
app.use(router)
setupPlugins(app)
app.mount('#app')
