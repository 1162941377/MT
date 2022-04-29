<template>
  <div
    class="forage"
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
            <el-image style="width: 480px; height: 370px" :src="bgUrl" />
            <el-aside width="350px">
              <el-image style="width: 100px; height: 100px" :src="url" />
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item :label="item.iphone" prop="name1">
                  <el-input v-model="ruleForm.name1" clearable autofocus />
                </el-form-item>
                <el-form-item :label="item.pwd" prop="name2">
                  <el-input v-model="ruleForm.name2" show-password />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">
                    {{ item.change }}
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">{{ item.reset }}</el-button>
                  <el-button @click="goLogin" :plain="true">{{ item.login }}</el-button>
                </el-form-item>
              </el-form>
            </el-aside>
          </el-container>
        </el-main>
        <!-- 尾部 -->
        <Footer />
      </el-container>
    </template>
  </div>
</template>

<style lang="less" scoped>
.forage {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-main {
      margin: 0 auto;
      text-align: center;
      margin-bottom: 38px;
      // 清除浮动带来的影响
      &::after {
        display: block;
        content: '';
        clear: both;
      }
      .el-aside {
        float: right;
        margin-left: 10%;
      }
    }
  }
}
</style>

<script>
/* eslint-disable global-require */

import elHeader from '../components/myHeader.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Forage',
  data() {
    return {
      bgUrl: require('../assets/img/wait.jpg'),
      url: require('../assets/img/shopping.svg'),
      loading: true,
      item: {
        iphone: '账号',
        pwd: '密码',
        change: '修改',
        reset: '重置',
        login: '登录',
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
        if (valid) {
          // 向后端发送数据，修改账号的密码
          const param = new URLSearchParams();
          param.append('account', this.$md5(this.ruleForm.name1));
          param.append('pwd', this.$md5(this.ruleForm.name2));
          this.$axios({
            url: '/change',
            method: 'patch',
            data: param,
          }).then((res) => {
            // // 登录成功信息
            this.$message({
              message: res.data,
              type: res.data === '修改成功' ? 'success' : 'error',
              duration: 1500,
              center: true,
            });
            if (res.data === '账号不存在, 请重新输入') {
              this.ruleForm.name1 = '';
            } else if (res.data === '密码与之前的一致，请重新输入') {
              this.ruleForm.name2 = '';
            } else {
              this.$router.push('/login');
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
      this.$refs[formName].resetFields();
    },
    // 前往登录界面
    goLogin() {
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
  components: {
    elHeader,
    Footer,
  },
};
</script>
