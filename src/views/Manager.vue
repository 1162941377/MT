<template>
  <!-- 这是管理员界面 -->
  <div
    class="manager"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="!loading">
      <el-container>
        <!-- logo展示 头部 -->
        <el-header>
          <el-row :gutter="24">
            <el-col :span="1" :offset="1">
              <el-image style="width: 50px" :src="header.logo" />
            </el-col>
            <el-col :span="19">{{ header.title }}</el-col>
            <el-col :span="3" @mouseenter.native="showFlag" @mouseleave.native="hideFlag">
              {{ header.username }}
              <transition name="el-fade-in-linear">
                <span class="exit" v-show="header.flag" @mouseenter="showFlag" @click="toLogin">
                  {{ header.exit }}
                </span>
              </transition>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主内容展示 -->
        <el-main>
          <el-aside>
            <el-tabs :tab-position="tabPosition" type="border-card" @tab-click="fetch">
              <!-- 日历 -->
              <el-tab-pane :label="mainLeft.calendar">
                <el-calendar v-model="mainRight.date" :first-day-of-week="7" />
              </el-tab-pane>
              <!-- 账号管理 -->
              <el-tab-pane :label="mainLeft.account">
                <el-table
                  v-loading="mainRight.account.tableLoading"
                  height="629"
                  :data="mainRight.account.tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    prop="id"
                    :label="mainRight.account.id"
                    width="149"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="username"
                    :label="mainRight.account.username"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="iphone"
                    :label="mainRight.account.iphone"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="pwd"
                    :label="mainRight.account.pwd"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="status"
                    :label="mainRight.account.status"
                    width="150"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="createTime"
                    :label="mainRight.account.createTime"
                    width="228"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="updateTime"
                    :label="mainRight.account.updateTime"
                    width="228"
                    sortable
                  />
                </el-table>
                <!-- 分页实现 -->
                <el-pagination
                  background
                  @current-change="handleAccountCurrentChange"
                  :current-page.sync="mainRight.account.currentPage"
                  :page-size="mainRight.account.size"
                  layout="total, prev, pager, next, jumper"
                  :total="mainRight.account.length"
                />
              </el-tab-pane>
              <!-- 电影管理 -->
              <el-tab-pane :label="mainLeft.movie">
                <el-row :gutter="24" style="margin-top: 10px">
                  <el-col :span="5" :offset="1">
                    <el-input
                      size="mini"
                      placeholder="请输入电影名"
                      maxlength="10"
                      clearable
                      v-model="mainRight.search.movieName"
                      @change="searchMovieName(mainRight.search.movieName)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      size="mini"
                      placeholder="请输入上映年份"
                      maxlength="4"
                      clearable
                      v-model="mainRight.search.movieYear"
                      @change="searchMovieYear(mainRight.search.movieYear)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      size="mini"
                      placeholder="请输入类型"
                      maxlength="2"
                      clearable
                      v-model="mainRight.search.movieType"
                      @change="searchMovieType(mainRight.search.movieType)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                </el-row>
                <el-table
                  v-loading="mainRight.movie.tableLoading"
                  height="540"
                  :data="mainRight.movie.tableData"
                  border
                  style="width: 100%; margin-top: 20px;"
                >
                  <el-table-column
                    align="center"
                    prop="id"
                    :label="mainRight.movie.id"
                    width="150"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="movieName"
                    :label="mainRight.movie.movieName"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="year"
                    :label="mainRight.movie.year"
                    width="160"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="duration"
                    :label="mainRight.movie.duration"
                    width="175"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="state"
                    :label="mainRight.movie.state"
                    width="120"
                  />
                  <el-table-column
                    align="center"
                    prop="director"
                    :label="mainRight.movie.director"
                    width="150"
                  />
                  <el-table-column
                    align="center"
                    prop="role"
                    :label="mainRight.movie.role"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="type"
                    :label="mainRight.movie.type"
                    width="200"
                  />
                </el-table>
                <!-- 分页实现 -->
                <el-pagination
                  background
                  @current-change="handleMovieCurrentChange"
                  :current-page.sync="mainRight.movie.currentPage"
                  :page-size="mainRight.movie.size"
                  layout="total, prev, pager, next, jumper"
                  :total="mainRight.movie.length"
                />
              </el-tab-pane>
              <!-- 商家管理 -->
              <el-tab-pane :label="mainLeft.business">
                <el-row :gutter="24" style="margin-top: 10px">
                  <el-col :span="5" :offset="1">
                    <el-input
                      size="mini"
                      placeholder="请输入注册年份"
                      maxlength="4"
                      clearable
                      v-model="mainRight.search.businessYear"
                      @change="searchBusinessYear(mainRight.search.businessYear)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      size="mini"
                      placeholder="请输入所在地区"
                      maxlength="4"
                      clearable
                      v-model="mainRight.search.businessState"
                      @change="searchBusinessState(mainRight.search.businessState)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                  <el-col :span="4">
                    <el-input
                      size="mini"
                      placeholder="请输入所属行业"
                      maxlength="4"
                      clearable
                      v-model="mainRight.search.businessIndustry"
                      @change="searchBusinessIndustry(mainRight.search.businessIndustry)"
                      @focus="onFocus"
                      debounce="500"
                      suffix-icon="el-icon-search"
                    />
                  </el-col>
                </el-row>
                <el-table
                  v-loading="mainRight.business.tableLoading"
                  height="540"
                  :data="mainRight.business.tableData"
                  border
                  style="width: 100%; margin-top: 20px"
                >
                  <el-table-column
                    align="center"
                    prop="id"
                    :label="mainRight.business.id"
                    width="150"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="businessName"
                    :label="mainRight.business.businessName"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="year"
                    :label="mainRight.business.year"
                    width="200"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="state"
                    :label="mainRight.business.state"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="industry"
                    :label="mainRight.business.industry"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="official"
                    :label="mainRight.business.official"
                    width="200"
                  />
                  <el-table-column
                    align="center"
                    prop="iphone"
                    :label="mainRight.business.iphone"
                    width="205"
                    sortable
                  />
                </el-table>
                <!-- 分页实现 -->
                  <el-pagination
                    background
                    @current-change="handleBusinessCurrentChange"
                    :current-page.sync="mainRight.business.currentPage"
                    :page-size="mainRight.business.size"
                    layout="total, prev, pager, next, jumper"
                    :total="mainRight.business.length"
                  />
              </el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-main>
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.manager {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    height: 100%;
    .el-header {
      background-color: rgba(255, 150, 0, 0.08);
      line-height: 60px;
      font-size: 13.5px;
      color: #666;
      position: relative;
      .el-image {
        padding: 5px 0;
      }
      .el-row {
        height: 100%;
        .el-col {
          cursor: default;
          position: relative;
          &:last-child {
            text-align: center;
            width: fit-content;
            position: absolute;
            right: 75px;
            cursor: pointer;
          }
          .exit {
            width: 100%;
            height: 40px;
            line-height: 40px;
            position: absolute;
            right: 0px;
            top: 60px;
            cursor: pointer;
            &:hover {
              background-color: #ccc;
            }
          }
        }
      }
    }
    .el-main {
      height: 100%;
      .el-aside {
        height: 100%;
        width: 100% !important;
        padding: 0px;
        overflow: hidden;
        .el-tabs {
          height: 100%;
        }
        .el-pagination {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'Manager',
  data() {
    return {
      // 标签出现的位置
      tabPosition: 'left',
      loading: true,
      // 头部的信息
      header: {
        // eslint-disable-next-line global-require
        logo: require('../assets/img/外卖平台直连.svg'),
        title: '订单来电',
        username: this.$cookie.get('username'),
        exit: '退出',
        flag: false,
      },
      // 左侧的信息
      mainLeft: {
        calendar: '日历展示',
        account: '账号展示',
        movie: '电影展示',
        business: '商家展示',
      },
      // 右侧展示
      mainRight: {
        // 日历
        date: new Date(),
        // 账号管理
        account: {
          id: '编号',
          username: '用户名',
          iphone: '手机号',
          pwd: '密码',
          status: '身份',
          createTime: '创建日期',
          updateTime: '修改日期',
          tableData: [],
          size: 8,
          currentPage: 1,
          data: 0,
          length: 0,
          tableLoading: true,
        },
        // 电影管理
        movie: {
          id: '编号',
          movieName: '电影名',
          year: '上映年份',
          duration: '时长',
          state: '出版国家',
          director: '导演',
          role: '主演',
          type: '类型',
          tableData: [],
          size: 10,
          currentPage: 1,
          data: 0,
          length: 0,
          tableLoading: true,
        },
        // 商家管理
        business: {
          id: '编号',
          businessName: '店铺名',
          year: '注册年份',
          state: '所在地区',
          industry: '所属行业',
          official: '负责人',
          iphone: '联系电话',
          tableData: [],
          size: 10,
          currentPage: 1,
          data: 0,
          length: 0,
          tableLoading: true,
        },
        // 检索信息
        search: {
          movieName: '',
          movieYear: '',
          movieType: '',
          businessYear: '',
          businessState: '',
          businessIndustry: '',
        },
      },
    };
  },
  methods: {
    // 展示退出按钮
    showFlag() {
      this.header.flag = true;
    },
    // 隐藏退出按钮
    hideFlag() {
      this.header.flag = false;
    },
    // 返回登录界面
    toLogin() {
      this.$router.replace('/login');
      this.$message({
        type: 'info',
        duration: 1500,
        message: '即将返回登录界面',
        center: true,
      });
    },
    // 获取数据
    fetch({ index }) {
      // 清空所有表格中的数据
      this.mainRight.movie.tableData = [];
      this.mainRight.movie.tableLoading = true;
      this.mainRight.account.tableData = [];
      this.mainRight.account.tableLoading = true;
      this.mainRight.business.tableData = [];
      this.mainRight.business.tableLoading = true;
      if (Number(index) === 1) {
        // 获取账户信息
        this.fetchAccount();
      } else if (Number(index) === 2) {
        // 获取电影信息
        this.fetchMovie();
      } else if (Number(index) === 3) {
        // 获取商家信息
        this.fetchBusiness();
      }
    },
    // 获取账号信息
    fetchAccount() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('data', this.mainRight.account.data);
      param.append('size', this.mainRight.account.size);
      this.$axios({
        url: '/manager/account',
        method: 'get',
        params: param,
      }).then((res) => {
        // 遍历数据库中的数据，将数据逐一插入到表格中
        this.mainRight.account.length = res.data.total;
        res.data.msg.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.username = arr.username;
          obj.iphone = arr.account;
          obj.pwd = arr.pwd;
          obj.status = arr.status;
          obj.createTime = this.handleTime(arr.createtime);
          obj.updateTime = this.handleTime(arr.updatetime);
          setTimeout(() => {
            this.mainRight.account.tableLoading = false;
            this.mainRight.account.tableData.push(obj);
          }, 500);
        });
      });
    },
    // 获取电影信息
    fetchMovie() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('data', this.mainRight.movie.data);
      param.append('size', this.mainRight.movie.size);
      this.$axios({
        url: '/manager/movie',
        method: 'get',
        params: param,
      }).then((res) => {
        // 遍历数据库中的数据，将数据逐一插入到表格中
        this.mainRight.movie.length = res.data.total;
        res.data.msg.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.movieName = arr.movieName;
          obj.year = arr.year;
          obj.duration = arr.duration;
          obj.state = arr.state;
          obj.director = arr.director;
          obj.role = arr.role;
          obj.type = arr.type;
          setTimeout(() => {
            this.mainRight.movie.tableLoading = false;
            this.mainRight.movie.tableData.push(obj);
          }, 500);
        });
      });
    },
    // 获取商家信息
    fetchBusiness() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('data', this.mainRight.business.data);
      param.append('size', this.mainRight.business.size);
      this.$axios({
        url: '/manager/business',
        method: 'get',
        params: param,
      }).then((res) => {
        // 遍历数据库中的数据，将数据逐一插入到表格中
        this.mainRight.business.length = res.data.total;
        res.data.msg.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.businessName = arr.businessName;
          obj.year = arr.year;
          obj.state = arr.state;
          obj.industry = arr.industry;
          obj.official = arr.official;
          obj.iphone = arr.iphone;
          setTimeout(() => {
            this.mainRight.business.tableLoading = false;
            this.mainRight.business.tableData.push(obj);
          }, 500);
        });
      });
    },
    // 将获取的时间进一步处理 格式为：年-月-日 时:分:秒
    handleTime(time) {
      return `${time.split('T')[0]} ${time.split('T')[1].split('.')[0]}`;
    },
    // 页码改变时，改变账号数据中的数据
    handleAccountCurrentChange(page) {
      this.mainRight.account.tableLoading = true;
      this.mainRight.account.tableData = [];
      if (page === 1) {
        this.mainRight.account.data = 0;
      } else {
        this.mainRight.account.data = this.mainRight.account.size * (page - 1);
      }
      this.fetchAccount();
    },
    // 页码改变时，改变电影数据中的数据
    handleMovieCurrentChange(page) {
      this.mainRight.movie.tableLoading = true;
      this.mainRight.movie.tableData = [];
      if (page === 1) {
        this.mainRight.movie.data = 0;
      } else {
        this.mainRight.movie.data = this.mainRight.movie.size * (page - 1);
      }
      this.fetchMovie();
    },
    // 页码改变时，改变商家数据中的数据
    handleBusinessCurrentChange(page) {
      this.mainRight.business.tableLoading = true;
      this.mainRight.business.tableData = [];
      if (page === 1) {
        this.mainRight.business.data = 0;
      } else {
        this.mainRight.business.data = this.mainRight.business.size * (page - 1);
      }
      this.fetchBusiness();
    },
    // 检索电影名
    searchMovieName(name) {
      if (!name) {
        this.mainRight.movie.tableData = [];
        this.mainRight.movie.tableLoading = true;
        this.fetchMovie();
        return;
      }
      this.mainRight.movie.tableLoading = true;
      setTimeout(() => {
        this.mainRight.movie.tableData = this.mainRight.movie.tableData.filter(
          (data) => !name || data.movieName.includes(name.replace(/\s*/g, '')),
        );
        this.mainRight.movie.length = this.mainRight.movie.tableData.length;
        this.mainRight.movie.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 检索年份
    searchMovieYear(year) {
      if (!year) {
        this.mainRight.movie.tableData = [];
        this.mainRight.movie.tableLoading = true;
        this.fetchMovie();
        return;
      }
      this.mainRight.movie.tableLoading = true;
      setTimeout(() => {
        this.mainRight.movie.tableData = this.mainRight.movie.tableData.filter(
          (data) => data.year.includes(year.replace(/\s*/g, '')),
        );
        this.mainRight.movie.length = this.mainRight.movie.tableData.length;
        this.mainRight.movie.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 检索类型
    searchMovieType(type) {
      if (!type) {
        this.mainRight.movie.tableData = [];
        this.mainRight.movie.tableLoading = true;
        this.fetchMovie();
        return;
      }
      this.mainRight.movie.tableLoading = true;
      setTimeout(() => {
        this.mainRight.movie.tableData = this.mainRight.movie.tableData.filter(
          (data) => data.type.includes(type.replace(/\s*/g, '')),
        );
        this.mainRight.movie.length = this.mainRight.movie.tableData.length;
        this.mainRight.movie.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 检索商家注册年份
    searchBusinessYear(year) {
      if (!year) {
        this.mainRight.business.tableData = [];
        this.mainRight.business.tableLoading = true;
        this.fetchBusiness();
        return;
      }
      this.mainRight.business.tableLoading = true;
      setTimeout(() => {
        this.mainRight.business.tableData = this.mainRight.business.tableData.filter(
          (data) => !year || data.year.includes(year.replace(/\s*/g, '')),
        );
        this.mainRight.business.length = this.mainRight.business.tableData.length;
        this.mainRight.business.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 检索商家所属地区
    searchBusinessState(state) {
      if (!state) {
        this.mainRight.business.tableData = [];
        this.mainRight.business.tableLoading = true;
        this.fetchBusiness();
        return;
      }
      this.mainRight.business.tableLoading = true;
      setTimeout(() => {
        this.mainRight.business.tableData = this.mainRight.business.tableData.filter(
          (data) => !state || data.state.includes(state.replace(/\s*/g, '')),
        );
        this.mainRight.business.length = this.mainRight.business.tableData.length;
        this.mainRight.business.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 检索商家所属行业
    searchBusinessIndustry(industry) {
      if (!industry) {
        this.mainRight.business.tableData = [];
        this.mainRight.business.tableLoading = true;
        this.fetchBusiness();
        return;
      }
      this.mainRight.business.tableLoading = true;
      setTimeout(() => {
        this.mainRight.business.tableData = this.mainRight.business.tableData.filter(
          (data) => !industry || data.industry.includes(industry.replace(/\s*/g, '')),
        );
        this.mainRight.business.length = this.mainRight.business.tableData.length;
        this.mainRight.business.tableLoading = false;
      }, 500);
      this.$message({
        type: 'info',
        message: '务必清除输入框中的内容后，先按回车键(Enter)，再输入内容',
        duration: 1500,
        center: true,
      });
    },
    // 聚焦的时候，给出提示信息
    onFocus() {
      this.$message({
        type: 'info',
        message: '输入内容后，按回车键(Enter)查询',
        duration: 1500,
        center: true,
      });
    },
  },
  created() {
    if (this.$route.meta.flag) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    } else {
      this.$router.replace('/login');
    }
  },
};
</script>
