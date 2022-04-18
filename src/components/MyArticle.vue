<template>
  <article>
    <div w-full @dblclick="setTitleEditable" text="lg center" font-bold>
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
        {{ store.title ? store.title : ' ' }}
      </div>
    </div>
    <div
      mt-10
      min-h="4/5"
      bg="white"
      whitespace-pre-wrap
      rounded-3xl
      p="x-10 y-6"
      relative
      font="serif"
    >
      <div
        :class="contentEditable ? 'i-mdi:content-save' : 'i-mdi:pen'"
        absolute
        top-3
        right-5
        btn-logo
        text="gray-600"
        @click="changeContentEditable"
      ></div>
      <div p="y-2 x-2" text="sm gray-400" flex justify="between">
        <span>本章字数：{{ contentWordsCount }}</span>
        <span text="right">{{ saveInfo }}</span>
      </div>
      <div
        min-h="[68vh]"
        w-full
        inline-block
        outline-none
        :contenteditable="contentEditable"
        text="base"
        ref="contentEditor"
        @input="saveContentDebounce($event.target, true)"
      >
        {{ store.content }}
      </div>
      
    </div>
  </article>
</template>

<script setup lang="ts">
import { useCurrentArticle } from '../store/currentArticle'
import { countWords, debounce, removeFLSpaces } from '../common/utils'
import chapterApi from '../apis/chapterApi'
const emit = defineEmits<{
  (e: 'updateTitle', id: string, title: string): void
}>()
const store = useCurrentArticle()

const titleEdited = ref(store.title)
const saveInfo = ref(' ')
const titleEditable = ref(false)
const contentEditable = ref(false)
const titleInput = ref<HTMLInputElement | null>(null)
const contentEditor = ref<HTMLDivElement | null>(null)

const contentWordsCount=ref(0)
let countTimer:number|null=null
const setTitleEditable = () => {
  titleEdited.value = store.title
  titleEditable.value = true
}
const setUnTitleEditable = () => {
  titleEditable.value = false
}

const changeContentEditable = async () => {
  contentEditable.value = !contentEditable.value
  if (!contentEditable.value) {
    await saveContent(contentEditor.value as HTMLDivElement, false)
    preventAutoSave()
  }
}

async function saveContent(contentEditor: HTMLDivElement, isAutoSave: boolean) {
  try {
    let content = contentEditor.innerText
    await chapterApi.updateChapterContent({ id: store.id, content })
    //store.setContent(content)
    let now = new Date()
    saveInfo.value = `文章${isAutoSave ? '自动' : ''}保存于${now.toLocaleTimeString()}`
  } catch (error) {
    alert(error)
  }
}
async function saveTitle(title: string) {
  try {
    title = title ? title : ' '
    store.setTitle(title)
    emit('updateTitle', store.id, title)
    await chapterApi.updateChapterName({ id: store.id, title })
  } catch (error) {
    alert(error)
  }
}

const { fnDebounced: saveContentDebounce, clearTime: preventAutoSave } = debounce(saveContent, 5000)
const clickExceptInput = (e: Event) => {
  if (titleEditable.value && e.target != titleInput.value) {
    setUnTitleEditable()
    titleEdited.value = removeFLSpaces(titleEdited.value)
    saveTitle(titleEdited.value)
    e.stopPropagation()
  }
}
onMounted(() => {
  window.addEventListener('click', clickExceptInput, true)
  contentWordsCount.value = countWords(contentEditor.value?.innerText as string)
  countTimer=setInterval(()=>{
    contentWordsCount.value = countWords(contentEditor.value?.innerText as string)
  },1000)
})

onUnmounted(() => {
  window.removeEventListener('click', clickExceptInput)
  clearInterval(countTimer as number)
})
</script>

<style lang="scss" scoped></style>
