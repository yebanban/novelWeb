import {defineStore} from 'pinia'
import type { Article } from '../../types/article'
export const useCurrentArticle=defineStore('main',{
    state:()=>{
        return {
            article:{
                title:'',
                content:''
            }
        }
    },
    getters:{
        title:(state)=>{
            return state.article.title
        },
        content:(state)=>{
            return state.article.content
        }
    },
    actions:{
        setTitle(title:string){
            this.article.title=title
        },
        setContent(content:string){
            this.article.content=content
        },
        async getArticle(chapter:number){
            this.article.title='第一章'
            this.article.content=`import { defineStore } from 'pinia'
            import { Auth } from './auth' //使用其他的store
            export const PublicStore = defineStore('Public', {
               // other options...
               actions: {
                   setUserMsg(userMsg) {
                       this.userMsg = userMsg
            
            作者：菜的不行
            链接：https://juejin.cn/post/7068583319855693860
            来源：稀土掘金
            著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
        }
    }
})