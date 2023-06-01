<template>
  <div class="header-container">
    <Breadcrumb></Breadcrumb>
    <UserInfo></UserInfo>
  </div>
</template>

<script lang="ts">
import Breadcrumb from './Breadcrumb.vue'
import UserInfo from './UserInfo.vue'
export default {
  components: { Breadcrumb, UserInfo }
}
</script>

<style lang="scss" scoped>
.header-container{
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 5px 5px #e0dede;
}
</style>
