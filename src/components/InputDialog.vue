<template>
<el-dialog :modelValue="modelValue" @update:modelValue="(newValue:boolean)=>emit('update:modelValue',newValue)" :title="title" width="50%" draggable>
      <el-input v-model="newChapterTitle" :placeholder="placeholder" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('update:modelValue',false);newChapterTitle=''">取消</el-button>
          <el-button
            type="primary"
            :disabled="/^\s*$/.test(newChapterTitle)? true : false"
            @click="newChapter"
          >
            确定
          </el-button>
        </span>
      </template>
</el-dialog>
</template>

<script setup lang='ts'>
defineProps<{
    modelValue:boolean,
    title:string,
    placeholder:string
}>()
const emit=defineEmits<{
    (e:'update:modelValue',a:boolean):void,
    (e:'clickEnter',name:string):void
}>()
const newChapterTitle=ref('')
const newChapter=()=>{
    emit('clickEnter',newChapterTitle.value)
    emit('update:modelValue',false)
    newChapterTitle.value=''
}
</script> 

<style lang='scss' scoped>

</style>
