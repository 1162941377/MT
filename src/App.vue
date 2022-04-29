<template>
  <div id="app">
    <router-view>
      <!-- 多页面跳转 -->
      <Home />
      <Login />
    </router-view>
  </div>
</template>

<style lang="less" scoped>
#app {
  // 设置窗体最小宽度，当页面宽度小于设定时，出现横向滚动条
  height: 100%;
  min-width: 1210px;
  overflow: auto;
}
</style>

<script>
import Home from './views/Home.vue';
import Login from './views/Login.vue';

export default {
  name: 'App',
  components: {
    Home,
    Login,
  },
};
</script>
