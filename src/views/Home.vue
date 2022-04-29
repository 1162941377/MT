<template>
  <div
    class="main"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="!loading">
      <el-container>
        <!-- 头部 -->
        <el-header>
          <mHeader />
        </el-header>
        <!-- 中间 -->
        <el-container>
          <!-- 左侧列表区域 -->
          <myLeft :movieData="movieData" />
          <!-- 轮播图展示 -->
          <myMain />
          <!-- 右侧信息展示 -->
          <myRight />
        </el-container>
        <!-- 尾部 -->
        <Footer />
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
// 引入css重置文件
@import url('../assets/reset.css');
.main {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
    }
    .el-header {
      margin: 0 auto;
      margin-bottom: 120px;
    }
    .el-container {
      width: 1190px;
      margin: 30px auto 22px;
    }
  }
}
</style>

<script>
import mHeader from '../components/Header.vue';
import myLeft from '../components/myLeft.vue';
import Footer from '../components/Footer.vue';
import myMain from '../components/myMain.vue';
import myRight from '../components/myRight.vue';

export default {
  data() {
    return {
      loading: true,
      flag: false,
      movieData: [], // 电影数据
    };
  },
  name: 'Home',
  components: {
    mHeader,
    myLeft,
    Footer,
    myMain,
    myRight,
  },
  created() {
    // 将仓库中保存的用户名和密码显示
    this.iphone = this.$store.state.iphone;
    this.pwd = this.$store.state.pwd;
    if (this.iphone) {
      // 将电影数据显示到二级菜单中
      this.$axios({
        method: 'get',
        url: '/movie',
      }).then((res) => {
        this.movieData = res.data;
      });
      // 首次进入时，才渲染数据
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    } else {
      // 刷新后跳回登录界面
      this.loading = true;
      this.$message({
        type: 'info',
        duration: 1500,
        message: '即将返回登录界面',
      });
      this.$router.replace('/login');
    }
  },
};
</script>
