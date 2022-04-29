<template>
  <div
    class="business"
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
        <el-main>
          <el-aside>
            <el-tabs :tab-position="tabPosition" type="border-card" @tab-click="fetch">
              <!-- 日历 -->
              <el-tab-pane :label="mainLeft.calendar">
                <el-calendar v-model="mainRight.date" :first-day-of-week="7" />
              </el-tab-pane>
              <!-- 店铺管理 -->
              <el-tab-pane :label="mainLeft.business">
                <el-table
                  v-loading="mainRight.business.tableLoading"
                  height="688"
                  :data="mainRight.business.tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    prop="id"
                    :label="mainRight.business.id"
                    width="149"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="name"
                    :label="mainRight.business.name"
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
                    width="180"
                  />
                  <el-table-column
                    align="center"
                    prop="industry"
                    :label="mainRight.business.industry"
                    width="180"
                  />
                  <el-table-column
                    align="center"
                    prop="official"
                    :label="mainRight.business.official"
                    width="219"
                  />
                  <el-table-column
                    align="center"
                    prop="iphone"
                    :label="mainRight.business.iphone"
                    width="228"
                    sortable
                  />
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @dblclick.native="editData(scope.row)" type="text" size="small">
                        {{ mainRight.edit }}
                      </el-button>
                      <el-button @dblclick.native="deleteData(scope.row)" type="text" size="small">
                        {{ mainRight.del }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 分页实现 -->
                <el-pagination
                  background
                  layout="total, prev, pager, next"
                  :total="mainRight.business.length"
                />
                <!-- 修改信息 -->
                <el-dialog
                  :title="mainRight.bDialog.title"
                  :visible.sync="mainRight.bDialog.flag"
                  width="30%"
                  center
                >
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.business.name }}</el-col>
                    <el-col :span="13">
                      <el-input maxlength="10" v-model="mainRight.bDialog.name" clearable />
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button
                        icon="el-icon-edit"
                        circle
                        @click="changeName(mainRight.bDialog.name)"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.business.year }}</el-col>
                    <el-col :span="13">
                      <el-input maxlength="4" v-model="mainRight.bDialog.year" clearable />
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button
                        icon="el-icon-edit"
                        circle
                        @click="changeYear(mainRight.bDialog.year)"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.state }}
                    </el-col>
                    <el-col :span="13">
                      <el-select v-model="mainRight.bDialog.state" placeholder="">
                        <el-option
                          v-for="i in mainRight.bDialog.states"
                          :key="i.id"
                          :label="i.text"
                          :value="i.text"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button
                        icon="el-icon-edit"
                        circle
                        @click="changeState(mainRight.bDialog.state)"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.industry }}
                    </el-col>
                    <el-col :span="13">
                      <el-select v-model="mainRight.bDialog.industry" placeholder="">
                        <el-option
                          v-for="i in mainRight.bDialog.industrys"
                          :key="i.id"
                          :label="i.text"
                          :value="i.text"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button
                        icon="el-icon-edit"
                        circle
                        @click="changeIndustry(mainRight.bDialog.industry)"
                      />
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="info" @click="mainRight.bDialog.flag = false">
                      {{ mainRight.bDialog.cancel }}
                    </el-button>
                  </span>
                </el-dialog>
                <!-- 删除信息 -->
                <el-dialog
                  :title="mainRight.delDialog.title"
                  :visible.sync="mainRight.delDialog.flag"
                  width="30%"
                  center
                >
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.business.name }}</el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.name" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.business.year }}</el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.year" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.state }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.state" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.industry }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.industry" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.official }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.official" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.business.iphone }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.delDialog.iphone" readonly />
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="delData">
                      {{ mainRight.delDialog.del }}
                    </el-button>
                    <el-button type="info" @click="mainRight.delDialog.flag = false">
                      {{ mainRight.delDialog.cancel }}
                    </el-button>
                  </span>
                </el-dialog>
              </el-tab-pane>
              <!-- 电影管理 -->
              <el-tab-pane :label="mainLeft.movie">
                <el-table
                  v-loading="mainRight.movie.tableLoading"
                  height="688"
                  :data="mainRight.movie.tableData"
                  border
                  style="width: 100%"
                >
                  <el-table-column
                    align="center"
                    prop="id"
                    :label="mainRight.movie.id"
                    width="149"
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
                    width="200"
                    sortable
                  />
                  <el-table-column
                    align="center"
                    prop="state"
                    :label="mainRight.movie.state"
                    width="180"
                  />
                  <el-table-column
                    align="center"
                    prop="director"
                    :label="mainRight.movie.director"
                    width="180"
                  />
                  <el-table-column
                    align="center"
                    prop="role"
                    :label="mainRight.movie.role"
                    width="219"
                  />
                  <el-table-column
                    align="center"
                    prop="type"
                    :label="mainRight.movie.type"
                    width="228"
                    sortable
                  />
                  <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button @dblclick.native="editMovie(scope.row)" type="text" size="small">
                        {{ mainRight.edit }}
                      </el-button>
                      <el-button @dblclick.native="deleteMovie(scope.row)" type="text" size="small">
                        {{ mainRight.del }}
                      </el-button>
                    </template>
                  </el-table-column>
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
                <!-- 修改信息 -->
                <el-dialog
                  :title="mainRight.mDialog.title"
                  :visible.sync="mainRight.mDialog.flag"
                  width="30%"
                  center
                >
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.movieName }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.mDialog.name" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.movie.year }}</el-col>
                    <el-col :span="13">
                      <el-date-picker
                        v-model="mainRight.mDialog.year"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                      />
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button
                        icon="el-icon-edit"
                        circle
                        @click="changeMovieYear(mainRight.mDialog.year)"
                      />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.state }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.mDialog.state" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.director }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.mDialog.director" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.role }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.mDialog.role" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.type }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.mDialog.type" readonly />
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="info" @click="mainRight.mDialog.flag = false">
                      {{ mainRight.mDialog.cancel }}
                    </el-button>
                  </span>
                </el-dialog>
                <!-- 删除信息 -->
                <el-dialog
                  :title="mainRight.dDialog.title"
                  :visible.sync="mainRight.dDialog.flag"
                  width="30%"
                  center
                >
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.movieName }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.name" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">{{ mainRight.movie.year }}</el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.year" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.state }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.state" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.director }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.director" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.role }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.role" readonly />
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="5" class="txt" :offset="1">
                      {{ mainRight.movie.type }}
                    </el-col>
                    <el-col :span="13">
                      <el-input v-model="mainRight.dDialog.type" readonly />
                    </el-col>
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="delMovie">
                      {{ mainRight.dDialog.del }}
                    </el-button>
                    <el-button type="info" @click="mainRight.dDialog.flag = false">
                      {{ mainRight.dDialog.cancel }}
                    </el-button>
                  </span>
                </el-dialog>
              </el-tab-pane>
              <!-- 注册店铺 -->
              <el-tab-pane :label="mainLeft.bSubmit" />
              <!-- 注册电影 -->
              <el-tab-pane :label="mainLeft.mMovie" />
              <!-- 账户设置 -->
              <el-tab-pane :label="mainLeft.bSetting" />
            </el-tabs>
          </el-aside>
        </el-main>
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.business {
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
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
        }
        .el-dialog {
          .el-row {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'Business',
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
      // 左侧信息展示
      mainLeft: {
        calendar: '日历显示',
        business: '店铺管理',
        bSubmit: '注册店铺',
        bSetting: '账户设置',
        mMovie: '注册电影',
        movie: '电影管理',
      },
      // 右侧内容展示
      mainRight: {
        edit: '编辑',
        del: '删除',
        date: new Date(),
        // 店铺管理
        business: {
          id: '编号',
          name: '店铺名称',
          year: '注册年份',
          state: '所在地区',
          industry: '所属行业',
          official: '负责人',
          iphone: '手机号',
          tableData: [],
          length: 0,
          tableLoading: true,
        },
        // 电影管理
        movie: {
          id: '编号',
          movieName: '电影名称',
          year: '定档年份',
          duration: '放映时长',
          state: '出版地区',
          director: '担任导演',
          role: '领衔主演',
          type: '影片类型',
          tableData: [],
          length: 0,
          tableLoading: true,
          size: 10,
          currentPage: 1,
          data: 0,
        },
        // 店铺的编辑弹框
        bDialog: {
          flag: false,
          title: '店铺管理',
          name: '',
          year: '',
          state: '',
          industry: '',
          id: '',
          cancel: '放弃更改',
          edit: '修改记录',
          states: [],
          industrys: [],
        },
        // 电影的编辑弹框
        mDialog: {
          flag: false,
          title: '电影管理',
          name: '',
          year: '',
          state: '',
          director: '',
          role: '',
          type: '',
          id: '',
          cancel: '放弃更改',
        },
        // 电影的删除框
        delDialog: {
          flag: false,
          title: '店铺管理',
          name: '',
          year: '',
          state: '',
          industry: '',
          official: '',
          iphone: '',
          cancel: '放弃更改',
          del: '删除记录',
          id: '',
        },
        // 电影的删除框
        dDialog: {
          flag: false,
          title: '电影管理',
          name: '',
          year: '',
          state: '',
          director: '',
          role: '',
          type: '',
          cancel: '放弃更改',
          del: '删除记录',
          id: '',
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
      this.mainRight.business.tableData = [];
      this.mainRight.business.tableLoading = true;
      this.mainRight.movie.tableData = [];
      this.mainRight.movie.tableLoading = true;
      if (Number(index) === 1) {
        // 获取商家信息
        this.fetchBusiness();
      } else if (Number(index) === 3) {
        this.$router.push('/business/submit');
        this.$route.meta.index = true;
        this.$route.meta.flag = true;
        this.$message({
          type: 'info',
          message: '即将进入商家提交页',
          center: true,
          duration: 1500,
        });
      } else if (Number(index) === 5) {
        this.$router.push('/business/setting');
        this.$route.meta.flag = true;
      } else if (Number(index) === 4) {
        this.$router.push('/movie/submit');
        this.$route.meta.flag = true;
        this.$message({
          type: 'info',
          message: '即将进入电影提交页',
          center: true,
          duration: 1500,
        });
      } else if (Number(index) === 2) {
        // 获取电影信息
        this.fetchMovie();
      }
    },
    // 获取商家信息
    fetchBusiness() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('username', this.header.username);
      this.$axios({
        url: '/business/data',
        method: 'get',
        params: param,
      }).then((res) => {
        // 遍历数据库中的数据，将数据逐一插入到表格中
        this.mainRight.business.length = res.data.total;
        res.data.msg.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.name = arr.businessName;
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
    // 获取电影信息
    fetchMovie() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('username', this.header.username);
      param.append('data', this.mainRight.movie.data);
      param.append('size', this.mainRight.movie.size);
      this.$axios({
        url: '/movie/data',
        method: 'get',
        params: param,
      }).then((res) => {
        if (!res.data.total) {
          this.$router.push('/movie/submit');
          this.$route.meta.flag = true;
          this.$message({
            type: 'info',
            message: '即将进入电影提交页',
            center: true,
            duration: 1500,
          });
        } else {
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
        }
      });
    },
    // 改变页码时，改变表格中的数据
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
    // 编辑店铺信息
    editData(msg) {
      // 减轻网络开销，首次加载时才获取数据
      if (!this.mainRight.bDialog.states.length || !this.mainRight.bDialog.industrys.length) {
        this.$axios({
          method: 'get',
          url: '/business/submit',
        }).then((res) => {
          res.data.state.forEach((arr) => {
            const obj = {};
            obj.id = arr.id;
            obj.text = arr.state;
            this.mainRight.bDialog.states.push(obj);
          });
          res.data.industry.forEach((arr) => {
            const obj = {};
            obj.id = arr.id;
            obj.text = arr.industry;
            this.mainRight.bDialog.industrys.push(obj);
          });
        });
      }
      this.mainRight.bDialog.name = msg.name;
      this.mainRight.bDialog.year = msg.year;
      this.mainRight.bDialog.state = msg.state;
      this.mainRight.bDialog.industry = msg.industry;
      this.mainRight.bDialog.id = msg.id;
      this.mainRight.bDialog.flag = true;
    },
    // 编辑电影信息
    editMovie(msg) {
      this.mainRight.mDialog.name = msg.movieName;
      this.mainRight.mDialog.year = msg.year;
      this.mainRight.mDialog.state = msg.state;
      this.mainRight.mDialog.director = msg.director;
      this.mainRight.mDialog.role = msg.role;
      this.mainRight.mDialog.type = msg.type;
      this.mainRight.mDialog.id = msg.id;
      this.mainRight.mDialog.flag = true;
    },
    // 删除店铺信息
    deleteData(msg) {
      this.mainRight.delDialog.name = msg.name;
      this.mainRight.delDialog.year = msg.year;
      this.mainRight.delDialog.state = msg.state;
      this.mainRight.delDialog.industry = msg.industry;
      this.mainRight.delDialog.official = msg.official;
      this.mainRight.delDialog.iphone = msg.iphone;
      this.mainRight.delDialog.id = msg.id;
      this.mainRight.delDialog.flag = true;
    },
    // 删除店铺数据
    delData() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.delDialog.id);
      this.$axios({
        method: 'delete',
        url: '/business/del',
        params: param,
      }).then((res) => {
        this.$message({
          type: 'success',
          duration: 1500,
          center: true,
          message: res.data,
        });
        // 重新获取遍数据
        this.mainRight.delDialog.flag = false;
        this.mainRight.business.tableData = [];
        this.mainRight.business.tableLoading = true;
        this.fetchBusiness();
      });
    },
    // 删除电影信息
    deleteMovie(msg) {
      this.mainRight.dDialog.name = msg.movieName;
      this.mainRight.dDialog.year = msg.year;
      this.mainRight.dDialog.state = msg.state;
      this.mainRight.dDialog.director = msg.director;
      this.mainRight.dDialog.role = msg.role;
      this.mainRight.dDialog.type = msg.type;
      this.mainRight.dDialog.id = msg.id;
      this.mainRight.dDialog.flag = true;
    },
    // 删除电影信息
    delMovie() {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.dDialog.id);
      this.$axios({
        method: 'delete',
        url: '/movie/del',
        params: param,
      }).then((res) => {
        this.$message({
          type: 'success',
          duration: 1500,
          center: true,
          message: res.data,
        });
        // 重新获取遍数据
        this.mainRight.dDialog.flag = false;
        // 回到第一页渲染
        this.handleMovieCurrentChange(1);
      });
    },
    // 修改店铺名
    changeName(name) {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.bDialog.id);
      param.append('businessName', name);
      param.append('username', this.header.username);
      this.$axios({
        method: 'patch',
        url: '/business/change/name',
        data: param,
      }).then((res) => {
        this.$message({
          type: res.data === '修改成功' ? 'success' : 'error',
          message: res.data,
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
        if (res.data === '修改成功') {
          // 重新获取遍数据
          this.mainRight.business.tableData = [];
          this.mainRight.business.tableLoading = true;
          this.fetchBusiness();
        }
      });
    },
    // 修改注册年份
    changeYear(oldYear) {
      const year = new Date().getFullYear();
      if (!Number(oldYear)) {
        this.$message({
          type: 'error',
          message: '年份格式不正确',
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
      } else if (Number(oldYear) > year) {
        this.$message({
          type: 'error',
          message: `输入的年份不得超过${year}年`,
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
      } else if (Number(oldYear) < 2000) {
        this.$message({
          type: 'error',
          message: '输入的年份不得小于2000年',
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
      } else {
        // 向后端传递页数，得到数据
        const param = new URLSearchParams();
        param.append('id', this.mainRight.bDialog.id);
        param.append('year', oldYear);
        param.append('username', this.header.username);
        this.$axios({
          method: 'patch',
          url: '/business/change/year',
          data: param,
        }).then((res) => {
          this.$message({
            type: res.data === '修改成功' ? 'success' : 'error',
            message: res.data,
            duration: 1500,
            center: true,
          });
          this.mainRight.bDialog.flag = false;
          if (res.data === '修改成功') {
            // 重新获取遍数据
            this.mainRight.business.tableData = [];
            this.mainRight.business.tableLoading = true;
            this.fetchBusiness();
          }
        });
      }
    },
    // 修改地区
    changeState(state) {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.bDialog.id);
      param.append('state', state);
      param.append('username', this.header.username);
      this.$axios({
        method: 'patch',
        url: '/business/change/state',
        data: param,
      }).then((res) => {
        this.$message({
          type: res.data === '修改成功' ? 'success' : 'error',
          message: res.data,
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
        if (res.data === '修改成功') {
          // 重新获取遍数据
          this.mainRight.business.tableData = [];
          this.mainRight.business.tableLoading = true;
          this.fetchBusiness();
        }
      });
    },
    // 修改行业
    changeIndustry(industry) {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.bDialog.id);
      param.append('industry', industry);
      param.append('username', this.header.username);
      this.$axios({
        method: 'patch',
        url: '/business/change/industry',
        data: param,
      }).then((res) => {
        this.$message({
          type: res.data === '修改成功' ? 'success' : 'error',
          message: res.data,
          duration: 1500,
          center: true,
        });
        this.mainRight.bDialog.flag = false;
        if (res.data === '修改成功') {
          // 重新获取遍数据
          this.mainRight.business.tableData = [];
          this.mainRight.business.tableLoading = true;
          this.fetchBusiness();
        }
      });
    },
    // 修改电影年份
    changeMovieYear(year) {
      // 向后端传递页数，得到数据
      const param = new URLSearchParams();
      param.append('id', this.mainRight.mDialog.id);
      param.append('year', year);
      param.append('username', this.header.username);
      this.$axios({
        method: 'patch',
        url: '/movie/year',
        data: param,
      }).then((res) => {
        this.$message({
          type: res.data === '修改成功' ? 'success' : 'error',
          message: res.data,
          duration: 1500,
          center: true,
        });
        this.mainRight.mDialog.flag = false;
        if (res.data === '修改成功') {
          // 重新获取遍数据
          this.mainRight.movie.tableData = [];
          this.mainRight.movie.tableLoading = true;
          this.fetchMovie();
        }
      });
    },
    // 监听键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.mainRight.bDialog.flag = false;
        this.mainRight.delDialog.flag = false;
        this.mainRight.mDialog.flag = false;
        this.mainRight.dDialog.flag = false;
      }
    },
  },
  created() {
    if (this.$route.meta.flag) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
      // 显示提示信息
      this.$message({
        message: '欢迎进入商家管理页',
        type: 'success',
        duration: 1500,
        center: true,
      });
    } else {
      // 调回登录界面
      this.$router.replace('/login');
    }
  },
  // 监听dialog的变化，如果关闭，更新页面中的值
  watch: {
    'mainRight.bDialog.flag': {
      handler(flag) {
        if (!flag) {
          // 移除键盘事件
          document.removeEventListener('keydown', this.handleKeyDown);
        } else {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      },
      deep: true,
    },
    'mainRight.delDialog.flag': {
      handler(flag) {
        if (!flag) {
          // 移除键盘事件
          document.removeEventListener('keydown', this.handleKeyDown);
        } else {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      },
      deep: true,
    },
    'mainRight.mDialog.flag': {
      handler(flag) {
        if (!flag) {
          // 移除键盘事件
          document.removeEventListener('keydown', this.handleKeyDown);
        } else {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      },
      deep: true,
    },
    'mainRight.dDialog.flag': {
      handler(flag) {
        if (!flag) {
          // 移除键盘事件
          document.removeEventListener('keydown', this.handleKeyDown);
        } else {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      },
      deep: true,
    },
  },
};
</script>
