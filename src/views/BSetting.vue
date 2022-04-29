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
          <el-container>
            <!-- 左侧的导航条 -->
            <el-menu default-active="3" class="el-menu" :collapse="isCollapse">
              <!-- 负责人和手机号 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-custom" />
                  <span slot="title">{{ setting.iphoneTxt }}</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">{{ setting.officialTxt }}</span>
                  <el-menu-item index="1-1">{{ setting.official[0] }}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <span slot="title">{{ setting.iphoneTxt }}</span>
                  <el-menu-item index="1-2">{{ setting.iphone[0] }}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group v-if="setting.official[1]">
                  <span slot="title">{{ setting.officialTxt }}</span>
                  <el-menu-item index="1-3">{{ setting.official[1] }}</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group v-if="setting.official[1]">
                  <span slot="title">{{ setting.iphoneTxt }}</span>
                  <el-menu-item index="1-4">{{ setting.iphone[1] }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 用户名 -->
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document" />
                  <span slot="title">{{ setting.iphoneTxt }}</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">{{ setting.usernameTxt }}</span>
                  <el-menu-item index="2-1">{{ setting.username }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 账户设置 -->
              <el-menu-item index="3">
                <i class="el-icon-setting" />
                <span slot="title">{{ mainLeft.setting }}</span>
              </el-menu-item>
            </el-menu>
            <!-- 主区域 -->
            <el-main>
              <el-descriptions :title="mainLeft.setting" direction="vertical" :column="2" border>
                <template slot="extra">
                  <el-button type="success" size="small" @click="toSetting">
                    {{ setting.toSetting }}
                  </el-button>
                  <el-button type="primary" size="small" @click="toIndex">
                    {{ setting.toIndex }}
                  </el-button>
                  <el-button type="info" size="small" @dblclick.native="change">
                    {{ setting.change }}
                  </el-button>
                </template>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user" />
                    {{ setting.usernameTxt }}
                  </template>
                  {{ setting.username }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone" />
                    {{ setting.iphoneTxt }}
                  </template>
                  {{ setting.iphone }}
                </el-descriptions-item>
                <el-descriptions-item span="2">
                  <template slot="label">
                    <i class="el-icon-postcard" />
                    {{ setting.nameTxt }}
                  </template>
                  {{ setting.name }}
                </el-descriptions-item>
                <el-descriptions-item span="2">
                  <template slot="label">
                    <i class="el-icon-time" />
                    {{ setting.yearTxt }}
                  </template>
                  {{ setting.year }}
                </el-descriptions-item>
                <el-descriptions-item span="2">
                  <template slot="label">
                    <i class="el-icon-map-location" />
                    {{ setting.stateTxt }}
                  </template>
                  {{ setting.state }}
                </el-descriptions-item>
                <el-descriptions-item span="2">
                  <template slot="label">
                    <i class="el-icon-office-building" />
                    {{ setting.industryTxt }}
                  </template>
                  {{ setting.industry }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-custom" />
                    {{ setting.officialTxt }}
                  </template>
                  {{ setting.official }}
                </el-descriptions-item>
              </el-descriptions>
              <el-dialog
                :title="mainLeft.setting"
                :visible.sync="setting.dialog"
                width="30%"
                center
              >
                <el-row :gutter="10">
                  <el-col :span="5" class="txt" :offset="1">{{ setting.usernameTxt }}</el-col>
                  <el-col :span="13">
                    <el-input maxlength="10" v-model="setting.nick" clearable />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button icon="el-icon-edit" circle @click="changeNick(setting.nick)" />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5" class="txt" :offset="1">{{ setting.iphoneTxt }}</el-col>
                  <el-col :span="13">
                    <el-input v-model="setting.iphone1" maxlength="11" clearable />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button icon="el-icon-edit" circle @click="changeIphone1(setting.iphone1)" />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="5" class="txt" :offset="1">{{ setting.officialTxt }}</el-col>
                  <el-col :span="13">
                    <el-input maxlength="4" v-model="setting.official1" clearable />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button
                      icon="el-icon-edit"
                      circle
                      @click="changeOfficial1(setting.official1)"
                    />
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-if="setting.flag">
                  <el-col :span="5" class="txt" :offset="1">{{ setting.iphoneTxt }}</el-col>
                  <el-col :span="13">
                    <el-input v-model="setting.iphone2" maxlength="11" clearable />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button icon="el-icon-edit" circle @click="changeIphone2(setting.iphone2)" />
                  </el-col>
                </el-row>
                <el-row :gutter="10" v-if="setting.flag">
                  <el-col :span="5" class="txt" :offset="1">{{ setting.officialTxt }}</el-col>
                  <el-col :span="13">
                    <el-input maxlength="4" v-model="setting.official2" clearable />
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button
                      icon="el-icon-edit"
                      circle
                      @click="changeOfficial2(setting.official2)"
                    />
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="info" @click="setting.dialog = false">
                    {{ setting.cancel }}
                  </el-button>
                </span>
              </el-dialog>
            </el-main>
          </el-container>
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
      .el-container {
        margin-bottom: 0;
      }
      .el-menu {
        height: 100%;
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
</style>

<script>
export default {
  data() {
    return {
      loading: true,
      isCollapse: true,
      // 头部的信息
      header: {
        // eslint-disable-next-line global-require
        logo: require('../assets/img/外卖平台直连.svg'),
        title: '订单来电',
        username: this.$cookie.get('username'),
        exit: '退出',
        flag: false,
      },
      mainLeft: {
        setting: '账户设置',
      },
      // 账户设置
      setting: {
        usernameTxt: '用户名',
        iphoneTxt: '手机号',
        nameTxt: '店铺名',
        yearTxt: '注册年份',
        stateTxt: '店铺所在地区',
        industryTxt: '店铺所属行业',
        officialTxt: '负责人',
        username: '',
        iphone: [],
        name: [],
        year: [],
        state: [],
        industry: [],
        official: [],
        change: '修改信息',
        dialog: false,
        cancel: '放弃更改',
        iphone1: '',
        iphone2: '',
        official1: '',
        official2: '',
        nick: '',
        flag: true,
        toSetting: '前往提交页',
        toIndex: '前往管理页',
      },
    };
  },
  name: 'BSetting',
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
    // 对数组去重
    handleMsg(msg) {
      return Array.from(new Set(msg));
    },
    // 打开账户信息框
    change() {
      this.setting.nick = this.setting.username;
      // eslint-disable-next-line prefer-destructuring
      this.setting.iphone1 = this.setting.iphone[0];
      // eslint-disable-next-line prefer-destructuring
      this.setting.iphone2 = this.setting.iphone[1];
      // eslint-disable-next-line prefer-destructuring
      this.setting.official1 = this.setting.official[0];
      // eslint-disable-next-line prefer-destructuring
      this.setting.official2 = this.setting.official[1];
      // eslint-disable-next-line no-self-compare
      if (!this.setting.iphone[1] || !this.setting.official[1]) {
        // 如果手机号只有一个，那么只显示一个框
        this.setting.flag = false;
      }
      this.setting.dialog = true;
    },
    // 修改用户名
    changeNick(name) {
      // 向后端发送数据，验证身份信息
      const param = new URLSearchParams();
      param.append('username', name);
      param.append('iphoneMd', this.$cookie.get('account'));
      param.append('iphone1', this.setting.iphone[0]);
      param.append('iphone2', this.setting.iphone[1]);
      this.$axios({
        method: 'patch',
        url: '/business/change/nick',
        data: param,
      }).then((res) => {
        // 显示提示信息
        this.$message({
          message: res.data,
          type: res.data === '修改成功' ? 'success' : 'error',
          duration: 1500,
          center: true,
        });
        // 将获取的新的用户名修改到页面中显示
        this.setting.username = this.$cookie.get('username');
        this.header.username = this.$cookie.get('username');
        this.setting.dialog = false;
      });
    },
    // 修改手机号
    changeIphone1(iphone) {
      // 验证手机号
      const reg = /^1[3456789]\d{9}$/;
      if (reg.test(iphone)) {
        // 向后端发送数据，验证身份信息
        const param = new URLSearchParams();
        param.append('official', this.setting.official[0]);
        param.append('iphone', iphone);
        param.append('username', this.setting.username);
        this.$axios({
          method: 'patch',
          url: '/business/change/iphone',
          data: param,
        }).then((res) => {
          // 显示提示信息
          this.$message({
            message: res.data.msg,
            type: res.data.msg === '修改成功' ? 'success' : 'error',
            duration: 1500,
            center: true,
          });
          if (res.data.data) {
            // 将获取的新的手机号修改到页面中显示
            res.data.data.forEach((arr) => {
              this.setting.iphone[0] = arr.iphone;
            });
          }
          this.setting.dialog = false;
        });
      } else {
        this.$message({
          type: 'error',
          message: '手机号格式不正确，必须是 11 位数字',
          duration: 1500,
          center: true,
        });
        this.setting.dialog = false;
      }
    },
    // 修改负责人
    changeOfficial1(official) {
      // 向后端发送数据，验证身份信息
      const param = new URLSearchParams();
      param.append('iphone', this.setting.iphone[0]);
      param.append('official', official);
      param.append('username', this.setting.username);
      this.$axios({
        method: 'patch',
        url: '/business/change/official',
        data: param,
      }).then((res) => {
        // 显示提示信息
        this.$message({
          message: res.data.msg,
          type: res.data.msg === '修改成功' ? 'success' : 'error',
          duration: 1500,
          center: true,
        });
        if (res.data.data) {
          // 将获取的新的手机号修改到页面中显示
          res.data.data.forEach((arr) => {
            this.setting.official[0] = arr.official;
          });
        }
        this.setting.dialog = false;
      });
    },
    // 修改手机号
    changeIphone2(iphone) {
      // 验证手机号
      const reg = /^1[3456789]\d{9}$/;
      if (reg.test(iphone)) {
        // 向后端发送数据，验证身份信息
        const param = new URLSearchParams();
        param.append('official', this.setting.official[1]);
        param.append('iphone', iphone);
        param.append('username', this.setting.username);
        this.$axios({
          method: 'patch',
          url: '/business/change/iphone',
          data: param,
        }).then((res) => {
          // 显示提示信息
          this.$message({
            message: res.data.msg,
            type: res.data.msg === '修改成功' ? 'success' : 'error',
            duration: 1500,
            center: true,
          });
          if (res.data.data) {
            // 将获取的新的手机号修改到页面中显示
            res.data.data.forEach((arr) => {
              this.setting.iphone[1] = arr.iphone;
            });
          }
          this.setting.dialog = false;
        });
      } else {
        this.$message({
          type: 'error',
          message: '手机号格式不正确，必须是 11 位数字',
          duration: 1500,
          center: true,
        });
        this.setting.dialog = false;
      }
    },
    // 修改负责人
    changeOfficial2(official) {
      // 向后端发送数据，验证身份信息
      const param = new URLSearchParams();
      param.append('iphone', this.setting.iphone[1]);
      param.append('official', official);
      param.append('username', this.setting.username);
      this.$axios({
        method: 'patch',
        url: '/business/change/official',
        data: param,
      }).then((res) => {
        // 显示提示信息
        this.$message({
          message: res.data.msg,
          type: res.data.msg === '修改成功' ? 'success' : 'error',
          duration: 1500,
          center: true,
        });
        if (res.data.data) {
          // 将获取的新的手机号修改到页面中显示
          res.data.data.forEach((arr) => {
            this.setting.official[1] = arr.official;
          });
        }
        this.setting.dialog = false;
      });
    },
    // 监听键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.setting.dialog = false;
      }
    },
    // 前往商家提交页
    toSetting() {
      this.$message({
        message: '即将进入商家提交页',
        center: true,
        duration: 1500,
        type: 'info',
      });
      this.$router.push('/business/submit');
      this.$route.meta.show = true;
      this.$route.meta.setting = true;
      this.$route.meta.flag = true;
    },
    // 前往商家主页
    toIndex() {
      this.$router.push('/business');
      this.$route.meta.flag = true;
    },
  },
  created() {
    if (this.$route.meta.flag) {
      setTimeout(() => {
        this.loading = false;
      }, 1800);
      // 判断是否已经有用户名
      if (this.$cookie.get('username')) {
        // 向后端发送数据，验证身份信息
        const param = new URLSearchParams();
        param.append('username', this.$cookie.get('username'));
        this.$axios({
          method: 'get',
          url: '/business/check',
          params: param,
        }).then((res) => {
          res.data.data.forEach((arr) => {
            this.setting.username = arr.username;
            this.setting.iphone.push(arr.iphone);
            this.setting.name.push(arr.businessName);
            this.setting.year.push(arr.year);
            this.setting.state.push(arr.state);
            this.setting.industry.push(arr.industry);
            this.setting.official.push(arr.official);
          });
          // 对数组中的数据去重
          this.setting.iphone = this.handleMsg(this.setting.iphone);
          this.setting.year = this.handleMsg(this.setting.year);
          this.setting.state = this.handleMsg(this.setting.state);
          this.setting.industry = this.handleMsg(this.setting.industry);
          this.setting.official = this.handleMsg(this.setting.official);
          // 显示提示信息
          this.$message({
            message: res.data.msg,
            type: res.data.msg === '欢迎进入商家设置界面' ? 'success' : 'error',
            duration: 1500,
            center: true,
          });
          // 如果商家没有信息，返回商家提交界面
          if (res.data.msg === '请前往商家信息提交页') {
            this.$router.replace('/business/submit');
          }
        });
      } else {
        // 如果没有，跳回登录界面
        this.loading = true;
        this.$message({
          type: 'info',
          duration: 1500,
          message: '即将返回登录界面',
        });
        this.$router.replace('/login');
      }
    } else {
      this.$router.replace('/login');
    }
  },
  // 监听dialog的变化，如果关闭，更新页面中的值
  watch: {
    'setting.dialog': {
      handler(flag) {
        if (!flag) {
          // 移除键盘事件
          document.removeEventListener('keydown', this.handleKeyDown);
          // 向后端发送数据，验证身份信息
          const param = new URLSearchParams();
          param.append('username', this.setting.username);
          this.$axios({
            method: 'get',
            url: '/business/change/official/show',
            params: param,
          }).then((res) => {
            res.data.forEach((arr) => {
              this.setting.official.push(arr.official);
            });
            // 对数组中的数据去重
            this.setting.official = this.handleMsg(this.setting.official);
            // 如果有第二个负责人存在，那么显示
            if (this.setting.official[1]) {
              // eslint-disable-next-line prefer-destructuring
              this.setting.official2 = this.setting.official[1];
              this.setting.flag = true;
            }
          });
        } else {
          document.addEventListener('keydown', this.handleKeyDown);
        }
      },
      deep: true,
    },
  },
};
</script>
