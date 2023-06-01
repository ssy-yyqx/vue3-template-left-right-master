<template>
<div class="login-container">
  <div class='login-section class="components-input-demo-presuffix"'>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="username" name="username">
        <a-input v-model:value="formState.username" placeholder="请输入用户名" size="large">
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item ref="password" name="password">
        <a-input type="password" v-model:value="formState.password" placeholder="请输入密码" size="large">
          <template #prefix>
            <LockOutlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button style="width: 100%;" type="primary" @click="onSubmit" size="large">登 录</a-button>
      </a-form-item>
    </a-form>
  </div>
</div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, ref, reactive, UnwrapRef, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import * as API from '@/api/user'
import { setToken } from '@/utils/auth'
interface FormState {
  username: string;
  password: string;
}
export default defineComponent({
  name: 'Login',
  components: { UserOutlined, LockOutlined },
  setup () {
    const formRef = ref()
    const router = useRouter()
    // 表单数据
    const formState: UnwrapRef<FormState> = reactive({
      username: '',
      password: ''
    })
    // 表单验证规则
    const rules = {
      username: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }
    // 提交
    const onSubmit = () => {
      formRef.value.validate().then(() => {
        API.login(toRaw(formState)).then(res => {
          const { code, token, msg } = res
          if (code === 200) {
            setToken(token)
            router.push({ name: 'Home' })
          } else {
            message.error(msg)
          }
        })
      }).catch((error: ValidateErrorEntity<FormState>) => {
        console.log('error', error)
      })
    }
    return {
      formRef,
      formState,
      rules,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container{
  width: 100vw;
  height: 100vh;
  background: #2d3a4b;
  .login-section{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
