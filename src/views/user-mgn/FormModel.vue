<template>
  <a-modal v-model:visible="state.visible" :title="title" :maskClosable="false" @cancel="handleClose" :maskStyle="{'opacity': '0.2','background': '#000000', 'animation': 'none'}">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="username" label="用户名" name="username">
        <a-input v-model:value="formState.username" :disabled="type==='detail'"/>
      </a-form-item>
      <a-form-item ref="realName" label="真实姓名" name="realName">
        <a-input v-model:value="formState.realName" :disabled="type==='detail'" />
      </a-form-item>
      <a-form-item ref="phoneNumber" label="联系电话" name="phoneNumber">
        <a-input v-model:value="formState.phoneNumber" :disabled="type==='detail'" />
      </a-form-item>
      <a-form-item ref="company" label="公司" name="company">
        <a-input v-model:value="formState.company" :disabled="type==='detail'" />
      </a-form-item>
      <a-form-item ref="roleName" label="用户类型" name="roleName">
         <a-select
            v-model:value="formState.roleName"
            :options="state.options"
            :disabled="type==='detail'"
          >
        </a-select>
      </a-form-item>
      <a-form-item ref="email" label="邮箱" name="email">
         <a-input v-model:value="formState.email" :disabled="type==='detail'" />
      </a-form-item>
    </a-form>
    <template v-slot:footer>
      <a-button v-if="type==='detail'" @click="handleClose">关闭</a-button>
      <template v-else>
        <a-button @click="handleClose">取消</a-button>
        <a-button @click="handleOk" type="primary">确定</a-button>
      </template>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { SelectTypes } from 'ant-design-vue/es/select'
import { defineComponent, reactive, ref, toRaw, UnwrapRef, toRefs, computed } from 'vue'
interface FormState {
  username: string;
  realName: string;
  roleName: string;
  phoneNumber: string;
  email: string;
  company: string;
}
export default defineComponent({
  props: {
    type: String,
    dialogVisible: Boolean,
    currentRowData: Object
  },
  setup (props, ctx) {
    const { emit } = ctx
    const { type, dialogVisible, currentRowData } = toRefs(props)
    const state = reactive({
      visible: dialogVisible,
      options: ref<SelectTypes['options']>([
        { label: '未注册用户', value: '未注册用户' },
        { label: '超级管理员', value: '超级管理员' },
        { label: '普通管理员', value: '普通管理员' },
        { label: '一般用户', value: '一般用户' }
      ])
    })
    const title = computed(() => {
      if (type.value === 'add') {
        return '添加用户信息'
      } else if (type.value === 'edit') {
        return '修改用户信息'
      } else {
        return '查看用户信息'
      }
    })
    const formRef = ref()
    // 获取表单数据
    const formData = Object.assign({}, toRaw(currentRowData.value))
    // 表单默认值
    const formState: UnwrapRef<FormState> = reactive({
      username: formData.username,
      realName: formData.realName,
      roleName: formData.roleName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      company: formData.company
    })
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      realName: [
        { required: true, message: '请输入真实姓名', trigger: 'blur' }
      ],
      phoneNumber: [{ required: true, message: '请输入电话号码' }],
      roleName: [
        {
          required: true,
          message: '请选择用户类型',
          trigger: 'change'
        }
      ],
      email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    }
    // 确定
    function handleOk () {
      formRef.value.validate().then(() => {
        state.visible = false
        emit('closeDialog')
      })
    }
    // 取消
    function handleClose () {
      state.visible = false
      emit('closeDialog')
    }
    return {
      formRef,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      formState,
      title,
      rules,
      state,
      handleOk,
      handleClose
    }
  }
})
</script>

<style>

</style>
