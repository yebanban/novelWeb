<template>
  <article>
    <div w-full @dblclick="setTitleEditable" text="lg center" font-bold>
      <input v-show="titleEditable" w="full" type="text" v-model="titleEdited" border="0 gray-500 b-2" outline="none"
        bg="transparent" text="lg center" font="bold sans" ref="titleInput" />
      <div v-show="!titleEditable" font-sans border="0 b-2 transparent" whitespace-pre-wrap>
        {{ store.title ? store.title : ' ' }}
      </div>
    </div>
    <div md:mt-10 mt-4 min-h="4/5" bg="white" whitespace-pre-wrap rounded-3xl p="x-3 md:x-10 y-6" relative font="sans">
      <div :class="contentEditable ? 'i-mdi:content-save' : 'i-mdi:pen'" absolute top-3 right-5 btn-logo text="gray-600"
        @click="changeContentEditable" ></div>
      <div p="y-2 x-2" text="sm gray-400" flex justify="between">
        <span>本章字数：{{ contentWordsCount }}</span>
        <span text="right">{{ saveInfo }}</span>
      </div>
      <div min-h="[68vh]" w-full inline-block outline-none :contenteditable="contentEditable" text="base"
        ref="contentEditor" @input="saveContentDebounce($event.target as HTMLDivElement, true); changeContentWordsCount()" @paste="handlePaste">
        {{ content }}
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
const content = ref('')
content.value=store.content
const contentWordsCount = ref(0)
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
const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault()
  let txt = ''
  let range :Range|null = null
  // 获取复制的文本
  txt = (e.clipboardData as DataTransfer).getData('text/plain')
  // 获取页面文本选区
  range = (window.getSelection() as Selection).getRangeAt(0)
  // 删除默认选中文本
  range.deleteContents()
  // 创建一个文本节点，用于替换选区文本
  let pasteTxt = document.createTextNode(txt)
  // 插入文本节点
  range.insertNode(pasteTxt)
  // 将焦点移动到复制文本结尾
  range.collapse(false)
  saveContentDebounce(e.target as HTMLDivElement, true)
  changeContentWordsCount()
}
async function saveContent(contentEditor: HTMLDivElement, isAutoSave: boolean) {
  try {
    let content = contentEditor.innerText
    await chapterApi.updateChapterContent({ id: store.id, content })
    store.setContent(content)
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
const changeContentWordsCount = async () => {
  await nextTick()
  contentWordsCount.value = countWords(contentEditor.value?.innerText as string)
}
const { fnDebounced: saveContentDebounce, clearTime: preventAutoSave } = debounce(saveContent, 2000)
const clickExceptInput = (e: Event) => {
  if (titleEditable.value && e.target != titleInput.value) {
    setUnTitleEditable()
    titleEdited.value = removeFLSpaces(titleEdited.value)
    saveTitle(titleEdited.value)
    e.stopPropagation()
  }
}
const updateContentEditor = (str: string) => {
  content.value = str
  contentEditor.value!.innerHTML=str
  changeContentWordsCount()
}

defineExpose({
  changeContentWordsCount,
  contentEditor,
  updateContentEditor
})
onMounted(() => {
  window.addEventListener('click', clickExceptInput, true)
  contentWordsCount.value = countWords(contentEditor.value?.innerText as string)
  /* countTimer = setInterval(() => {
    contentWordsCount.value = countWords(contentEditor.value?.innerText as string)
  }, 1000) */
})

onUnmounted(() => {
  window.removeEventListener('click', clickExceptInput)
  //clearInterval(countTimer as number)
})
</script>

<style lang="scss" scoped></style>
