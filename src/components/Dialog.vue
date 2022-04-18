<template>
  <el-dialog
    :modelValue="modelValue"
    @update:modelValue="(newValue:boolean)=>emit('update:modelValue',newValue)"
    title="提示"
    width="50%"
    draggable
  >
    <span>{{ tips }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('update:modelValue', false)">取消</el-button>
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
</script>

<style lang="scss" scoped></style>
