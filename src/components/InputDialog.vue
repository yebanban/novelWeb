<template>
<el-dialog :modelValue="modelValue" @update:modelValue="(newValue:boolean)=>emit('update:modelValue',newValue)" :title="title" width="50%" draggable>
      <el-input v-model="input" :placeholder="placeholder" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emit('update:modelValue',false);input=''">取消</el-button>
          <el-button
            type="primary"
            :disabled="/^\s*$/.test(input)? true : false"
            @click="enter"
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
const input=ref('')
const enter=()=>{
    emit('clickEnter',input.value)
    emit('update:modelValue',false)
    input.value=''
}
</script> 

<style lang='scss' scoped>

</style>
