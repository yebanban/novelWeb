import { defineStore } from 'pinia'
import { removeFLSpaces,countWords } from '../common/utils'
export const useCurrentArticle = defineStore('main', {
  state: () => {
    return {
      article: {
        id: '',
        title: '',
        content: '',
      },
    }
  },
  getters: {
    id: state => {
      return state.article.id
    },
    title: state => {
      return state.article.title
    },
    content: state => {
      return state.article.content
    },
    contentWordsCount: state => {
      return countWords(state.article.content)
    },
  },
  actions: {
    setTitle(title: string) {
      this.article.title = title
    },
    setContent(content: string) {
      this.article.content = content
    },
    updateChapter(id: string, title: string, content: string) {
      this.article.id = id
      this.article.title = title
      this.article.content = content
    },
  },
})
