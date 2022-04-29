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
        <!-- 头部 -->
        <el-header><elHeader /></el-header>
        <el-main>
          <el-page-header @click.native="goBack" />
          <el-container>
            <!-- 左侧图标 -->
            <el-image style="width: 480px; height: 370px; top: 25px;" :src="bgUrl" />
            <!-- 右侧表单 -->
            <el-aside width="350px">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item :label="item.name" prop="name1">
                  <el-input
                    v-model="ruleForm.name1"
                    ref="name1"
                    maxlength="10"
                    clearable
                    autofocus
                  />
                </el-form-item>
                <el-form-item :label="item.iphone" prop="name4">
                  <el-input v-model="ruleForm.name4" ref="name4" maxlength="11" clearable />
                </el-form-item>
                <el-form-item :label="item.official" prop="name5">
                  <el-input v-model="ruleForm.name5" ref="name5" maxlength="4" clearable />
                </el-form-item>
                <el-form-item :label="item.state" prop="name2">
                  <el-select v-model="ruleForm.name2" placeholder="">
                    <el-option
                      v-for="i in item.states"
                      :key="i.id"
                      :label="i.text"
                      :value="i.text"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="item.industry" prop="name3">
                  <el-select v-model="ruleForm.name3" placeholder="">
                    <el-option
                      v-for="i in item.industrys"
                      :key="i.id"
                      :label="i.text"
                      :value="i.text"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">
                    {{ item.login }}
                  </el-button>
                  <el-button @click="resetForm('ruleForm')">{{ item.reset }}</el-button>
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
.business {
  height: 100%;
  .el-container {
    margin-bottom: 40px;
    .el-main {
      margin: -20px auto -64px;
      text-align: center;
      position: relative;
      overflow: visible;
      .el-page-header {
        position: absolute;
        top: -5px;
        color: #666;
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
import Footer from '../components/Footer.vue';
import elHeader from '../components/myHeader.vue';

export default {
  name: 'BSubmit',
  data() {
    return {
      loading: true,
      // eslint-disable-next-line global-require
      bgUrl: require('../assets/img/配送.jpeg'),
      item: {
        name: '店铺名',
        state: '所在地区',
        industry: '所属行业',
        iphone: '手机号',
        official: '负责人',
        login: '提交',
        reset: '重置',
        industrys: [],
        states: [],
      },
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
      },
      rules: {
        name1: [
          {
            required: true,
            message: '请输入店铺名',
            trigger: 'change',
          },
        ],
        name2: [
          {
            required: true,
            message: '请选择所在地区',
            trigger: 'change',
          },
        ],
        name3: [
          {
            required: true,
            message: '请选择所属行业',
          },
        ],
        name4: [
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
        name5: [
          {
            required: true,
            message: '请输入负责人',
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
          // 向后端发送数据，验证身份信息
          const param = new URLSearchParams();
          param.append('businessName', this.ruleForm.name1);
          param.append('year', new Date().getFullYear());
          param.append('state', this.ruleForm.name2);
          param.append('industry', this.ruleForm.name3);
          param.append('iphoneMd', this.$md5(this.ruleForm.name4));
          param.append('iphone', this.ruleForm.name4);
          param.append('username', this.$cookie.get('username'));
          param.append('official', this.ruleForm.name5);
          this.$axios({
            method: 'post',
            url: '/business/logon',
            data: param,
          }).then((res) => {
            this.$message({
              message: res.data,
              type: res.data === '提交成功' ? 'success' : 'error',
              duration: 1500,
              center: true,
            });
            if (res.data === '手机号重复，请重新输入') {
              this.ruleForm.name4 = '';
            } else if (res.data === '店铺名重复，请重新输入') {
              this.ruleForm.name1 = '';
            } else if (res.data === '一个账户最多注册十个店铺') {
              setTimeout(() => {
                this.$router.push('/business/setting');
              }, 1500);
            } else if (res.data === '一个手机号最多注册五个店铺') {
              this.ruleForm.name4 = '';
            } else {
              this.$router.push('/business/setting');
            }
          });
        } else {
          // 错误提示信息
          if (
            !this.ruleForm.name1
            || !this.ruleForm.name2
            || !this.ruleForm.name3
            || !this.ruleForm.name4
            || !this.ruleForm.name5
          ) {
            this.$message({
              message: '请输入完整的信息',
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
    // 监听键盘事件
    handleKeyDown(e) {
      if (e.key === 'Enter') {
        this.submitForm('ruleForm');
      }
    },
    // 回到商家页
    goBack() {
      if (this.$route.meta.index) {
        this.$route.meta.index = false;
        this.$router.push('/business');
      } else if (this.$route.meta.setting) {
        this.$route.meta.setting = false;
        this.$router.push('/business/setting');
      }
    },
  },
  components: {
    Footer,
    elHeader,
  },
  created() {
    if (this.$route.meta.flag) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
      // 加入键盘事件
      document.addEventListener('keydown', this.handleKeyDown);
      // 获取商家的所在地区及所属行业
      this.$axios({
        method: 'get',
        url: '/business/submit',
      }).then((res) => {
        res.data.state.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.text = arr.state;
          this.item.states.push(obj);
        });
        res.data.industry.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.text = arr.industry;
          this.item.industrys.push(obj);
        });
      });
    } else {
      this.$router.replace('/login');
    }
  },
  // 在销毁组件前移除
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>
