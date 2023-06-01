<template>
  <div class="logo-section">vue3 初体验</div>
  <div class="menu-section">
    <a-menu
      id="dddddd"
      style="width: 256px"
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item key="Home">
        <template #icon>
          <HomeOutlined />
        </template>
        首页
      </a-menu-item>
      <a-menu-item key="UserMgn">
        <template #icon>
          <UserSwitchOutlined />
        </template>
        用户管理
      </a-menu-item>
      <a-menu-item key="PriorityMgn">
        <template #icon>
          <KeyOutlined />
        </template>
        权限管理
      </a-menu-item>
      <a-menu-item key="LogMgn">
        <template #icon>
          <AlignLeftOutlined />
        </template>
        日志管理
      </a-menu-item>
      <a-menu-item key="MenuMgn">
        <template #icon>
          <MenuUnfoldOutlined />
        </template>
        菜单管理
      </a-menu-item>
      <a-menu-item key="ContentMgn">
        <template #icon>
          <ConsoleSqlOutlined />
        </template>
        内容管理
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { HomeOutlined, UserSwitchOutlined, KeyOutlined, AlignLeftOutlined, MenuUnfoldOutlined, ConsoleSqlOutlined } from '@ant-design/icons-vue'
interface ClickEvent {
  key: string;
}
export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    // 点击菜单
    const handleClick = (e: ClickEvent) => {
      store.dispatch('settings/setActiveMenuName', e.key)
      router.push({ name: e.key })
    }
    // 选中的菜单
    const selectedKeys = computed(() => [route.name])
    return {
      selectedKeys,

      handleClick
    }
  },
  components: {
    HomeOutlined,
    UserSwitchOutlined,
    KeyOutlined,
    AlignLeftOutlined,
    MenuUnfoldOutlined,
    ConsoleSqlOutlined
  }
})
</script>
<style lang="scss" scoped>
.logo-section{
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  color: #FFFFFF;
  padding-left: 20px;
}
.menu-section{
  height: calc(100% - 70px);
  overflow-y: auto;
}
</style>
