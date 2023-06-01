<template>
  <a-config-provider :locale="locale">
    <router-view/>
  </a-config-provider>
</template>
<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const locale = ref(zhCN)
    return {
      locale
    }
  }
})
</script>
<style lang="scss">
html,body{
  overflow-x: hidden;
}
</style>
