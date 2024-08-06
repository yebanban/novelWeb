<template>
  <el-dialog
    :modelValue="modelValue"
    destroy-on-close
    @open="addEnterEventListener"
    :before-close=removeEnterEventListener
    @update:modelValue="(newValue:boolean)=>emit('update:modelValue',newValue)"
    title="提示"
    width="50%"
    draggable
  >
    <span>{{ tips }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="removeEnterEventListener">取消</el-button>
        <el-button type="primary" @click="enter">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  tips: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', a: boolean): void
  (e: 'clickEnter',params?:any): void
}>()
const enter = () => {
  emit('clickEnter')
  emit('update:modelValue', false)
}
const keydownEnter = (e: KeyboardEvent) => {
  console.log(1)
  var e = e || window.event
  //获取发生事件的元素，兼容IE和DOM
  var key = e.code
  if (key == 'NumpadEnter' || key == 'Enter') {
    enter()
    removeEnterEventListener()
  }
}
const addEnterEventListener = () => {
  window.addEventListener('keydown',keydownEnter)
}
const removeEnterEventListener = () => {
  emit('update:modelValue', false)
  window.removeEventListener('keydown',keydownEnter)
}
</script>

<style lang="scss" scoped></style>
