<template>
  <article>
    <div w-auto @dblclick="setTitleEditable" text="lg center" font-bold>
      <input
        v-show="titleEditable"
        w="full"
        type="text"
        v-model="titleEdited"
        border="0 gray-500 b-2"
        outline="none"
        bg="transparent"
        text="lg center"
        font="bold sans"
        ref="titleInput"
      />
      <div v-show="!titleEditable" font-sans border="0 b-2 transparent" whitespace-pre-wrap>
        {{ title }}
      </div>
    </div>
    <div mt-10 min-h="4/5" bg="white" whitespace-pre-wrap rounded-3xl p="x-10 y-6" relative font="serif">
      <div
        i-mdi:pen
        absolute
        top-3
        right-5
        btn-logo
        text="gray-600"
        @click="changeContentEditable"
      ></div>
      <p p="y-2 x-6" text="right sm gray-400">{{ saved ? `文章自动保存于 ${time}` : ' ' }}</p>
      <div
        min-h="[70vh]"
        w-full
        inline-block
        outline-none
        :contenteditable="contentEditable"
        text="base"
        @input="saveContentDebounce($event)"
      >
        {{ content }}
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Article } from '../../types/article'
import { useCurrentArticle } from '../store/currentArticle';
import {debounce} from '../common/utils'
const props = defineProps<{ article: Article }>()
const content=ref(props.article.content)
const {setTitle,setContent}=useCurrentArticle()
const title = toRef(props.article, 'title')
const titleEdited = ref(title.value)
const time = ref('')
watch(title, () => {
  if (title.value === '') {
    title.value = ' '
    setTitle(' ')
  }
})
const titleEditable = ref(false)
const contentEditable = ref(false)
const saved = ref(false)
const titleInput = ref<HTMLInputElement | null>(null)
const setTitleEditable = () => {
  titleEditable.value = true
}
const setUnTitleEditable = () => {
  titleEditable.value = false
  
}
const changeContentEditable = () => {
  contentEditable.value = !contentEditable.value
}

function saveContent(event: InputEvent) {
  let content=(event.target as unknown as HTMLDivElement).innerText
  if (!saved.value) {
    saved.value = true
  }
  setContent(content)
  let now = new Date()
  time.value = now.toLocaleTimeString()
}
function saveTitle(title: string) {
  setTitle(title)
}
const saveContentDebounce = debounce(saveContent, 5000)
const clickExceptInput = (e: Event) => {
  if (titleEditable.value && e.target != titleInput.value) {
    setUnTitleEditable()
    titleEdited.value=titleEdited.value.replace(/(.+?)\s*$/, `$1`)
    saveTitle(titleEdited.value)
  }
}
window.addEventListener('click', clickExceptInput)
onUnmounted(() => {
  window.removeEventListener('click', clickExceptInput)
})
</script>

<style lang="scss" scoped></style>
