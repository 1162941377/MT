<template>
  <div
    class="setting"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="!loading">
      <el-container>
        <el-header><elHeader /></el-header>
        <el-main>
          <el-page-header @click.native="goBack" />
          <div class="content">
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="head">{{ head }}</el-col>
              <el-col :span="14" :offset="1">
                <el-avatar :size="size" :src="headUrl" />
              </el-col>
              <el-col :span="2">
                <el-button round @click="changeAvatar">{{ change }}</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="nick head">{{ nick }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ nickName }}</el-col>
              <el-col :span="2">
                <el-button round @click="openNickDialog">{{ change }}</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="nick head">{{ iphoneTxt }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ iphone }}</el-col>
              <el-col :span="2">
                <el-button round @click="openIphoneDialog">{{ change }}</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" :offset="2" class="nick head">{{ pwdTxt }}</el-col>
              <el-col :span="14" :offset="1" class="text">{{ pwd }}</el-col>
              <el-col :span="2">
                <el-button round @click="openPwdDialog">{{ change }}</el-button>
              </el-col>
            </el-row>
          </div>
        </el-main>
        <Footer />
      </el-container>
      <!-- 昵称 -->
      <el-dialog :title="nickInfo.nickTitle" :visible.sync="nickInfo.nickDialog" width="30%" center>
        <el-row :gutter="10">
          <el-col :span="6" class="txt">{{ nickInfo.originNick }}</el-col>
          <el-col :span="18">
            <el-input v-model="nickInfo.beforeNick" readonly />
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="6" class="txt">{{ nickInfo.updateNick }}</el-col>
          <el-col :span="18">
            <el-input v-model="nickInfo.afterNick" clearable ref="nickRef" />
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="nickInfo.nickDialog = false">{{ cancel }}</el-button>
          <el-button type="primary" @click="changeName(nickInfo.afterNick)">{{ change }}</el-button>
        </span>
      </el-dialog>
      <!-- 手机号 -->
      <el-dialog
        :title="iphoneInfo.iphoneTitle"
        :visible.sync="iphoneInfo.iphoneDialog"
        width="30%"
        center
      >
        <el-row :gutter="10">
          <el-col :span="7" class="txt">{{ iphoneInfo.originIphone }}</el-col>
          <el-col :span="17">
            <el-input v-model="iphoneInfo.beforeIphone" readonly />
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="7" class="txt">{{ iphoneInfo.updateIphone }}</el-col>
          <el-col :span="17">
            <el-input v-model="iphoneInfo.afterIphone" clearable ref="iphoneRef" />
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="iphoneInfo.iphoneDialog = false">{{ cancel }}</el-button>
          <el-button type="primary" @click="changeIphone(iphoneInfo.afterIphone)">
            {{ change }}
          </el-button>
        </span>
      </el-dialog>
      <!-- 密码 -->
      <el-dialog :title="pwdInfo.pwdTitle" :visible.sync="pwdInfo.pwdDialog" width="30%" center>
        <el-row :gutter="10">
          <el-col :span="6" class="txt">{{ pwdInfo.originPwd }}</el-col>
          <el-col :span="18">
            <el-input v-model="pwdInfo.beforePwd" readonly />
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="10">
          <el-col :span="6" class="txt">{{ pwdInfo.updatePwd }}</el-col>
          <el-col :span="18">
            <el-input v-model="pwdInfo.afterPwd" clearable ref="pwdRef" />
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pwdInfo.pwdDialog = false">{{ cancel }}</el-button>
          <el-button type="primary" @click="changePwd(pwdInfo.afterPwd)">{{ change }}</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<style lang="less" scoped>
.setting {
  height: 100%;
  .el-dialog {
    .txt {
      height: 40px;
      line-height: 40px;
    }
  }
  .el-container {
    margin-bottom: 40px;
    .el-main {
      margin: 0 auto;
      overflow: visible;
      position: relative;
      .el-page-header {
        position: absolute;
        top: -10px;
        color: #666;
      }
      .content {
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        min-height: 200px;
        width: 888px;
        float: right;
        background: #fff;
        padding: 30px;
        padding-bottom: 0;
        .el-row {
          border-bottom: 1px solid #e5e5e5;
          padding: 30px 0;
          display: flex;
          align-items: center;
          &:last-child {
            border-bottom: 0;
          }
          .el-avatar {
            margin-top: 4px;
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
import elHeader from '../components/myHeader.vue';

export default {
  data() {
    return {
      // eslint-disable-next-line global-require
      headUrl: require('../assets/img/avatar.jpg'),
      head: '头像',
      nick: '昵称',
      nickName: decodeURIComponent(this.$cookie.get('username')),
      iphoneTxt: '手机号',
      iphone: '',
      pwdTxt: '密码',
      pwd: '',
      size: 48,
      fileList: [],
      loading: true,
      change: '修 改',
      cancel: '取 消',
      // 昵称
      nickInfo: {
        nickDialog: false,
        beforeNick: '',
        nickTitle: '昵称修改',
        afterNick: '',
        originNick: '原来的昵称：',
        updateNick: '修改的昵称：',
      },
      // 手机号
      iphoneInfo: {
        iphoneDialog: false,
        beforeIphone: '',
        iphoneTitle: '手机号修改',
        afterIphone: '',
        originIphone: '原来的手机号：',
        updateIphone: '修改的手机号：',
      },
      // 密码
      pwdInfo: {
        pwdDialog: false,
        beforePwd: '',
        pwdTitle: '密码修改',
        afterPwd: '',
        originPwd: '原来的密码：',
        updatePwd: '修改的密码：',
      },
    };
  },
  methods: {
    changeAvatar() {
      this.$message({
        type: 'info',
        duration: 1500,
        message: '该功能尚未完善，仍需等待',
        center: true,
      });
    },
    goBack() {
      this.$message({
        type: 'info',
        duration: 1500,
        message: '欢迎回到首页',
        center: true,
      });
      this.$router.push('/');
    },
    // 打开昵称对话框
    openNickDialog() {
      this.nickInfo.nickDialog = true;
      this.nickInfo.beforeNick = this.nickName;
      // 自动聚焦
      setTimeout(() => {
        this.$refs.nickRef.focus();
      }, 0);
    },
    // 打开手机号对话框
    openIphoneDialog() {
      this.iphoneInfo.iphoneDialog = true;
      this.iphoneInfo.beforeIphone = this.iphone;
      // 自动聚焦
      setTimeout(() => {
        this.$refs.iphoneRef.focus();
      }, 0);
    },
    // 打开手机号对话框
    openPwdDialog() {
      this.pwdInfo.pwdDialog = true;
      this.pwdInfo.beforePwd = this.pwd;
      // 自动聚焦
      setTimeout(() => {
        this.$refs.pwdRef.focus();
      }, 0);
    },
    // 修改昵称
    changeName(nick) {
      if (nick) {
        this.nickInfo.nickDialog = false;
        // 向后端发送数据，更改用户名
        const param = new URLSearchParams();
        param.append('username', nick);
        param.append('account', this.$md5(this.iphone));
        this.$axios({
          url: '/update/nick',
          method: 'patch',
          data: param,
        }).then((res) => {
          this.$message({
            type: res.data === '修改成功' ? 'success' : 'error',
            duration: 1500,
            message: res.data,
            center: true,
          });
          if (res.data === '修改成功') {
            // 修改昵称，并清空框
            this.nickName = nick;
            this.nickInfo.afterNick = '';
          }
        });
      } else {
        this.$message({
          type: 'error',
          message: '请输入新的昵称',
          duration: 1500,
          center: true,
        });
      }
    },
    // 修改手机号
    changeIphone(num) {
      if (num) {
        this.iphoneInfo.iphoneDialog = false;
        // 验证手机号
        const reg = /^1[3456789]\d{9}$/;
        if (reg.test(num)) {
          // 向后端发送数据，更改手机号
          const param = new URLSearchParams();
          param.append('account', this.$md5(num));
          param.append('username', this.nickName);
          this.$axios({
            url: '/update/iphone',
            method: 'patch',
            data: param,
          }).then((res) => {
            this.$message({
              type: res.data === '修改成功' ? 'success' : 'error',
              duration: 1500,
              message: res.data,
              center: true,
            });
            if (res.data === '修改成功') {
              // 修改昵称，并清空框
              this.iphone = num;
              this.iphoneInfo.afterIphone = '';
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '手机号格式不正确，必须是 11 位数字',
            duration: 1500,
            center: true,
          });
        }
      } else {
        this.$message({
          type: 'error',
          message: '请输入新的手机号',
          duration: 1500,
          center: true,
        });
      }
    },
    // 修改密码
    changePwd(num) {
      if (num) {
        this.pwdInfo.pwdDialog = false;
        // 验证手机号
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z|.]{4,20}$/;
        if (reg.test(num)) {
          // 向后端发送数据，更改手机号
          const param = new URLSearchParams();
          param.append('pwd', this.$md5(num));
          param.append('username', this.nickName);
          this.$axios({
            url: '/update/pwd',
            method: 'patch',
            data: param,
          }).then((res) => {
            this.$message({
              type: res.data === '修改成功' ? 'success' : 'error',
              duration: 1500,
              message: res.data,
              center: true,
            });
            if (res.data === '修改成功') {
              // 修改昵称，并清空框
              this.pwd = num;
              this.pwdInfo.afterPwd = '';
            }
          });
        } else {
          this.$message({
            type: 'error',
            message: '密码格式不正确，必须是 5 - 15位的英文(含.)和数字的组合',
            duration: 1500,
            center: true,
          });
        }
      } else {
        this.$message({
          type: 'error',
          message: '请输入新的密码',
          duration: 1500,
          center: true,
        });
      }
    },
    // 提交昵称
    submitNick(e) {
      if (e.key === 'Enter') {
        this.changeName(this.nickInfo.afterNick);
      }
    },
    // 提交手机号
    submitIphone(e) {
      if (e.key === 'Enter') {
        this.changeIphone(this.iphoneInfo.afterIphone);
      }
    },
    // 提交密码
    submitPwd(e) {
      if (e.key === 'Enter') {
        this.changePwd(this.pwdInfo.afterPwd);
      }
    },
  },
  name: 'Setting',
  components: {
    Footer,
    elHeader,
  },
  created() {
    // 将仓库中保存的用户名和密码显示
    this.iphone = this.$store.state.iphone;
    this.pwd = this.$store.state.pwd;
    if (this.$store.state.iphone) {
      setTimeout(() => {
        // 首次进入时，才渲染数据
        this.loading = false;
      }, 1500);
    } else {
      // 刷新后调回登录界面
      this.loading = true;
      this.$message({
        type: 'info',
        duration: 1500,
        message: '即将返回登录界面',
      });
      this.$router.push('/login');
    }
  },
  beforeUpdate() {
    // 在打开或关闭弹框前判断，并加入或移除对应的键盘事件
    if (this.nickInfo.nickDialog) {
      document.addEventListener('keydown', this.submitNick);
    } else if (!this.nickInfo.nickDialog) {
      document.removeEventListener('keydown', this.submitNick);
    }
    if (this.iphoneInfo.iphoneDialog) {
      document.addEventListener('keydown', this.submitIphone);
    } else if (!this.iphoneInfo.iphoneDialog) {
      document.removeEventListener('keydown', this.submitIphone);
    }
    if (this.pwdInfo.pwdDialog) {
      document.addEventListener('keydown', this.submitPwd);
    } else if (!this.pwdInfo.pwdDialog) {
      document.removeEventListener('keydown', this.submitPwd);
    }
  },
};
</script>
