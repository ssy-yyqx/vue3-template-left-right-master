<template>
<a-dropdown :trigger="['click']">
  <a class="ant-dropdown-link" @click.prevent>
    <a-avatar :size="32" style="margin-right: 8px;">
      <template #icon><UserOutlined /></template>
    </a-avatar>
    <DownOutlined style="color: #333333"/>
  </a>
  <template #overlay>
      <a-menu @click="onClick">
        <a-menu-item key="1">退出</a-menu-item>
      </a-menu>
    </template>
</a-dropdown>
</template>

<script lang="ts">
import { defineComponent, VNodeChild } from 'vue'
import { UserOutlined, DownOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import * as API from '@/api/user'
import { setToken } from '@/utils/auth'
interface MenuInfo {
  key: string;
  keyPath: string[];
  item: VNodeChild;
  domEvent: MouseEvent;
}
export default defineComponent({
  components: { UserOutlined, DownOutlined },
  setup () {
    const router = useRouter()
    const onClick = ({ key }: MenuInfo) => {
      if (key === '1') {
        API.logout().then(res => {
          const { code, msg } = res
          if (code === '200') {
            setToken('')
            router.push({ name: 'Login' })
          } else {
            message.error(msg)
          }
        })
      }
    }
    return {
      onClick
    }
  }
})
</script>

<style>

</style>
