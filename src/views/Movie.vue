<template>
  <div
    class="movie"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="!loading">
      <el-container>
        <el-header>
          <!-- logo展示 -->
          <img :src="logoUrl" />
          <span>{{ content }}</span>
        </el-header>
        <el-main>
          <el-page-header @click.native="goBack" />
          <div class="content">
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="movieName head">{{ movieName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ movieMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="yearName head">{{ yearName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ yearMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="durationName head">{{ durationName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ durationMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="stateName head">{{ stateName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ stateMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="directorName head">{{ directorName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ directorMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="roleName head">{{ roleName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ roleMsg }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="typeName head">{{ typeName }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ typeMsg }}</el-col>
            </el-row>
          </div>
        </el-main>
        <Footer />
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.movie {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-header {
      margin: 15px auto;
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .el-main {
      margin: auto;
      overflow: visible;
      position: relative;
      .el-page-header {
        position: absolute;
        top: -10px;
        color: #666;
      }
      .content {
        position: relative;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        width: 888px;
        background: #fff;
        padding-bottom: 0;
        .el-row {
          border-bottom: 1px solid #e5e5e5;
          padding: 30px 0;
          display: flex;
          align-items: center;
          &:last-child {
            border-bottom: 0;
          }
          .head {
            border-right: 1px solid #e5e5e5;
          }
          .text {
            font-size: 13.5px;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>

<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Movie',
  data() {
    return {
      // eslint-disable-next-line global-require
      logoUrl: require('../assets/img/电影.svg'),
      content: '小z电影',
      loading: true,
      movieName: '片名',
      movieMsg: '',
      yearName: '年份',
      yearMsg: '',
      durationName: '时长',
      durationMsg: '',
      stateName: '国家',
      stateMsg: '',
      directorName: '导演',
      directorMsg: '',
      roleName: '主演',
      roleMsg: '',
      typeName: '类型',
      typeMsg: '',
      movieId: '',
    };
  },
  components: {
    Footer,
  },
  created() {
    this.movieId = this.$store.state.movieId;
    if (this.movieId) {
      const param = new URLSearchParams();
      param.append('movieId', this.movieId);
      this.$axios({
        method: 'get',
        url: '/movie/id',
        params: param,
      }).then((res) => {
        res.data.forEach((data) => {
          this.movieMsg = data.movieName;
          this.yearMsg = data.year;
          this.durationMsg = data.duration;
          this.stateMsg = data.state;
          this.directorMsg = data.director;
          this.roleMsg = data.role;
          this.typeMsg = data.type;
        });
      });
      setTimeout(() => {
        // 首次进入时，才渲染数据
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
  methods: {
    // 回到首页
    goBack() {
      this.$message({
        type: 'info',
        duration: 1500,
        message: '欢迎回到首页',
        center: true,
      });
      this.$router.push('/');
    },
  },
};
</script>
