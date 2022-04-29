<template>
  <div
    class="logon"
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
          <!-- 表单显示 -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <div class="asideLeft">
              <el-form-item :label="item.iphone" prop="name1">
                <el-input v-model="ruleForm.name1" clearable autofocus maxlength="11" />
              </el-form-item>
              <el-form-item :label="item.pwd1" prop="name2">
                <el-input v-model="ruleForm.name2" show-password maxlength="15" />
              </el-form-item>
              <el-form-item :label="item.pwd2" prop="name3">
                <el-input v-model="ruleForm.name3" show-password maxlength="15" />
              </el-form-item>
            </div>
            <div class="asideRight">
              <el-form-item :label="item.account" prop="name4">
                <el-input v-model="ruleForm.name4" maxlength="10" clearable />
              </el-form-item>
              <el-form-item :label="item.identity" prop="status">
                <el-select v-model="ruleForm.status" placeholder="">
                  <el-option v-for="i in item.info" :key="i.id" :label="i.text" :value="i.text" />
                </el-select>
              </el-form-item>
              <el-checkbox v-model="item.checked">{{ item.isChecked }}</el-checkbox>
              <el-form-item :label="item.protocol" class="protocol" />
            </div>
          </el-form>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ item.logon }}</el-button>
          <el-button @click="resetForm('ruleForm')">{{ item.reset }}</el-button>
          <el-button @click="goLogin" :plain="true">{{ item.login }}</el-button>
        </el-main>
        <!-- 尾部 -->
        <div class="br" />
        <Footer />
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.logon {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-main {
      margin: 0 auto;
      text-align: center;
      overflow: visible;
      .el-form {
        width: 300px;
        position: relative;
        margin-bottom: 72px;
        .asideLeft {
          transform: translateX(-150px);
        }
        .asideRight {
          position: absolute;
          top: 0;
          left: 200px;
          .el-form-item:first-child {
            padding: 0 6px;
          }
        }
      }
      .el-form-item {
        &.protocol {
          width: 235px;
        }
      }
    }
    .br {
      margin-top: 52.5px;
    }
  }
}
</style>

<script>
import Footer from '../components/Footer.vue';
import elHeader from '../components/myHeader.vue';

export default {
  name: 'Logon',
  components: {
    Footer,
    elHeader,
  },
  data() {
    return {
      loading: true,
      item: {
        iphone: '账号',
        pwd1: '密码',
        pwd2: '确认密码',
        account: '用户名',
        message: '协议',
        protocol:
          '我已阅读并同意《用户协议》《隐私政策》 ，并授权使用该账号信息（如昵称、头像、收货地址）管理',
        login: '登录',
        reset: '重置',
        isChecked: '协议',
        logon: '注册',
        checked: false,
        identity: '身份',
        info: [
          { id: 1, text: '普通用户' }, // regularUser
          { id: 2, text: '商家用户' }, // merchantUser
          { id: 3, text: '管理员' }, // administrator
        ],
      },
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        status: '',
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
        name3: [
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
        name4: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            trigger: 'change',
            message: '请选择身份',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 提交表单信息，进行验证
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        // 必须勾选协议才能注册
        if (!this.item.checked) {
          this.$message({
            message: '请勾选协议',
            type: 'error',
            duration: 1500,
            center: true,
          });
          return false;
        }
        if (!this.ruleForm.name1 || !this.ruleForm.name2 || !this.ruleForm.name3) {
          this.$message({
            message: '手机号或密码不能为空',
            type: 'error',
            duration: 1500,
            center: true,
          });
          return false;
        }
        if (this.ruleForm.name2 !== this.ruleForm.name3) {
          this.$message({
            message: '两次输入的密码不一致',
            type: 'error',
            duration: 1500,
            center: true,
          });
          return false;
        }
        if (valid) {
          this.$store.commit('changeStatus', this.ruleForm.status);
          this.$store.commit('changeUsername', this.ruleForm.name4);
          // 向后端发送数据，注册账号
          const param = new URLSearchParams();
          param.append('account', this.$md5(this.ruleForm.name1));
          param.append('pwd', this.$md5(this.ruleForm.name2));
          param.append('username', this.$store.state.username);
          param.append('status', this.$store.state.status);
          this.$axios({
            url: '/logon',
            method: 'post',
            data: param,
          }).then((res) => {
            this.$message({
              message: res.data,
              type: res.data === '注册成功' ? 'success' : 'error',
              duration: 1500,
              center: true,
            });
            if (res.data === '账号已存在，请重新输入') {
              // 清空账号框
              this.ruleForm.name1 = '';
            } else if (res.data === '用户名已存在，请重新输入') {
              // 清空用户名
              this.ruleForm.name4 = '';
            } else {
              // 注册，并跳转到登录界面
              this.$router.push('/login');
            }
          });
        } else {
          // 提示错误信息
          if (!this.ruleForm.status) {
            this.$message({
              message: '请选择身份',
              type: 'error',
              duration: 1500,
              center: true,
            });
            return false;
          }
          if (!this.ruleForm.name4) {
            this.$message({
              message: '请输入用户名',
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
    resetForm(formName) {
      // 重置表单信息
      this.$refs[formName].resetFields();
    },
    goLogin() {
      // 前往登录界面
      this.$router.push('/login');
    },
    // 监听键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.submitForm('ruleForm');
      }
    },
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
