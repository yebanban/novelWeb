<template>
  <el-dialog :modelValue="modelValue" @update:modelValue="(newValue: boolean) => emit('update:modelValue', newValue)"
    destroy-on-close
    @open="addEnterEventListener"
    :before-close=clearInput
    :title="title" width="50%" draggable>
    <el-input v-model="input" :placeholder="placeholder" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearInput">取消</el-button>
        <el-button type="primary" :disabled="/^\s*$/.test(input) ? true : false" @click="enter">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
defineProps<{
  modelValue: boolean,
  title: string,
  placeholder: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', a: boolean): void,
  (e: 'clickEnter', name: string): void
}>()
const input = ref('')
const enter = () => {
  emit('clickEnter', input.value)
  emit('update:modelValue', false)
  input.value = ''
}
const keydownEnter = (e: KeyboardEvent) => {
  console.log(e)
  if (/^\s*$/.test(input.value)) return
  var e = e || window.event
  //获取发生事件的元素，兼容IE和DOM
  var key = e.code
  if (key == 'NumpadEnter' || key == 'Enter') {
    enter()
    window.removeEventListener('keydown',keydownEnter)
  }
}
const addEnterEventListener = () => {
  window.addEventListener('keydown',keydownEnter)
}
const clearInput = () => {
  input.value = ''
  window.removeEventListener('keydown',keydownEnter)
  emit('update:modelValue', false)
}
</script>

<style lang='scss' scoped></style>
