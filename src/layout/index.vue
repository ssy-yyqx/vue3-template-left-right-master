<template>
<div class="app-wrapper">
  <div class="sidebar-container">
    <SideBar/>
  </div>
  <div class="main-container">
    <Header />
    <div class="main-page-container">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import SideBar from './sidebar'
import Header from './header'
export default {
  components: { SideBar, Header }
}
</script>

<style lang="scss" scoped>
.app-wrapper{
  width: 100vw;
  height: 100vh;
  display: flex;
  .sidebar-container{
    width: 260px;
    height: 100%;
    background: #2d3a4b;
  }
  .main-container{
    flex: 1;
    background: #FFFFFF;
    .main-page-container{
      height: calc(100% - 60px);
    }
  }
}
</style>
