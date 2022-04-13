import { createRouter, createWebHashHistory } from "vue-router"
import Login from '../views/Login.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "",
            name: "login",
            component: Login
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
       {
           path:'/home',
           name:'home',
           component:()=>import('../views/Home.vue')
       }
    ]
});
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem("token");
    if (token || to.path === "/login") {
        next();
    }
    else {
        next("/login");
    }
})
export default router;