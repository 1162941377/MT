<template>
  <div
    class="login"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <template v-if="!loading">
      <el-container>
        <!-- logo展示 -->
        <el-header><elHeader /></el-header>
        <el-main>
          <el-container>
            <!-- 左侧图标 -->
            <el-image style="width: 480px; height: 370px" :src="bgUrl" />
            <!-- 右侧表单 -->
            <el-aside width="350px">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item :label="item.iphone" prop="name1">
                  <el-input
                    v-model="ruleForm.name1"
                    ref="name1"
                    maxLength="11"
                    clearable
                    autofocus
                  />
                </el-form-item>
                <el-form-item :label="item.pwd" prop="name2">
                  <el-input v-model="ruleForm.name2" show-password maxlength="15" />
                </el-form-item>
                <el-checkbox v-model="item.checked">{{ item.isChecked }}</el-checkbox>
                <el-form-item :label="item.protocol" class="f-inline protocol" />
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">
                    {{ item.login }}
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">{{ item.reset }}</el-button>
                  <el-button @click="goLogon" :plain="true">{{ item.logon }}</el-button>
                </el-form-item>
              </el-form>
            </el-aside>
          </el-container>
          <!-- 忘记密码 -->
          <el-button class="forage" type="info" icon="el-icon-edit" @click="goForage">
            {{ forage }}
          </el-button>
        </el-main>
        <!-- 尾部 -->
        <Footer />
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-main {
      margin: 0 auto;
      text-align: center;
      position: relative;
      .forage {
        position: absolute;
        top: 0;
        right: 20.5px;
      }
      // 清除浮动带来的影响
      &::after {
        display: block;
        content: '';
        clear: both;
      }
      .el-aside {
        float: right;
        margin-left: 10%;
        .f-inline {
          display: inline-block;
          width: 100px;
          &.protocol {
            margin-left: 15px;
            vertical-align: top;
            width: 235px;
          }
        }
        .el-checkbox {
          margin-left: -45px;
          margin-top: 10px;
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
  name: 'Login',
  data() {
    return {
      // eslint-disable-next-line global-require
      bgUrl: require('../assets/img/bg.jpg'),
      forage: '忘记密码',
      loading: true,
      item: {
        iphone: '账号',
        pwd: '密码',
        message: '协议',
        protocol:
          '我已阅读并同意《用户协议》《隐私政策》 ，并授权使用该账号信息（如昵称、头像、收货地址）管理',
        login: '登录',
        reset: '重置',
        isChecked: '协议',
        logon: '注册',
        checked: false,
      },
      ruleForm: {
        name1: '',
        name2: '',
      },
      rules: {
        name1: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'change',
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确，必须是 11 位数字',
            trigger: 'change',
          },
        ],
        name2: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change',
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z|.]{4,20}$/,
            message: '密码格式不正确，必须是 5 - 15位的英文(含.)和数字的组合',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    // 验证表单信息
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        // 必须勾选协议才能登录
        if (!this.item.checked) {
          this.$message({
            message: '请勾选协议',
            type: 'error',
            duration: 1500,
            center: true,
          });
          return false;
        }
        if (valid) {
          // 将用户名密码保存到仓库中
          this.$store.commit('changeIphone', this.ruleForm.name1);
          this.$store.commit('changePwd', this.ruleForm.name2);
          // 向后端发送数据，验证身份信息
          const param = new URLSearchParams();
          param.append('account', this.$md5(this.ruleForm.name1));
          param.append('pwd', this.$md5(this.ruleForm.name2));
          this.$axios({
            url: '/login',
            method: 'get',
            params: param,
          }).then((res) => {
            // 登录成功信息
            this.$message({
              message: res.data,
              type: res.data === '登录成功' ? 'success' : 'error',
              duration: 1500,
              center: true,
            });
            if (res.data === '账号不存在，请重新输入') {
              // 清空账号框
              this.ruleForm.name1 = '';
            } else if (res.data === '账号或密码错误，请重新输入') {
              // 清空密码框
              this.ruleForm.name2 = '';
            } else if (this.$cookie.get('status') === 'administrator') {
              // 如果是管理员，跳到管理界面
              this.$router.push('/manager');
              this.$route.meta.flag = true;
            } else if (this.$cookie.get('status') === 'merchantUser') {
              // 如果是商家，跳到商家界面
              this.$router.push('/business/setting');
              this.$route.meta.flag = true;
            } else {
              // 如果是普通用户，跳到主界面
              this.$router.push('/');
            }
          });
        } else {
          // 提示错误信息
          if (!this.ruleForm.name1 || !this.ruleForm.name2) {
            this.$message({
              message: '手机号或密码不能为空',
              type: 'error',
              duration: 1500,
              center: true,
            });
            return false;
          }
          return false;
        }
      });
    },
    // 重置表单内容
    resetForm(formName) {
      // 重置表单信息
      this.$refs[formName].resetFields();
    },
    // 前往注册界面
    goLogon() {
      this.$router.push('/logon');
    },
    // 前往忘记密码界面
    goForage() {
      this.$router.push('/change');
    },
    // 监听键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.submitForm('ruleForm');
      }
    },
  },
  components: {
    Footer,
    elHeader,
  },
  created() {
    // 加入键盘事件
    document.addEventListener('keydown', this.handleKeyDown);
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
  // 在销毁组件前移除
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>
