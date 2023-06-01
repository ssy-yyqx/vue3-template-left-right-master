<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in state.levelList"
      :key="index"
      @click="gotoPage(item)">
      <span class="breadcrumb-item">{{item.menuName}}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, reactive, watchEffect } from '@vue/runtime-core'
import { RouteLocationNormalizedLoaded, useRoute, RouteMeta, useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const route: RouteLocationNormalizedLoaded = useRoute()
    const router = useRouter()
    const state = reactive({
      levelList: [] as RouteMeta[]
    })
    watchEffect(() => {
      state.levelList = []
      if (route.name === 'Home') {
        state.levelList.push(route.meta)
      } else {
        route.matched.forEach(item => {
          state.levelList.push(item.meta)
        })
      }
    })
    // 跳转到某页面
    function gotoPage (data: RouteMeta) {
      router.push({
        name: data.routerName as string
      })
    }
    return {
      state,
      gotoPage
    }
  }
})
</script>
<style lang="scss" scoped>
.breadcrumb-item{
  cursor: pointer;
}
</style>
