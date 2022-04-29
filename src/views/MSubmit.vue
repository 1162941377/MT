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
        <!-- 头部 -->
        <el-header><elHeader /></el-header>
        <el-main>
          <el-image :src="url" @click.native="goBack" />
          <el-container>
            <!-- 表单 -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <div class="asideLeft">
                <el-form-item :label="item.name" prop="name1">
                  <el-input
                    v-model="ruleForm.name1"
                    ref="name1"
                    maxlength="10"
                    clearable
                    autofocus
                  />
                </el-form-item>
                <el-form-item :label="item.duration" prop="name2">
                  <el-input v-model="ruleForm.name2" ref="name2" maxlength="3" clearable />
                </el-form-item>
                <el-form-item :label="item.director" prop="name4">
                  <el-input v-model="ruleForm.name4" maxlength="9" ref="name4" clearable />
                </el-form-item>
                <el-form-item :label="item.role" prop="name5">
                  <el-input v-model="ruleForm.name5" maxlength="14" ref="name5" clearable />
                </el-form-item>
              </div>
              <div class="asideRight">
                <el-form-item :label="item.state" prop="name3">
                  <el-select v-model="ruleForm.name3" placeholder="">
                    <el-option
                      v-for="i in item.states"
                      :key="i.id"
                      :label="i.text"
                      :value="i.text"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="item.type" prop="type">
                  <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox v-for="i in item.types" :key="i.id" :label="i.text" name="type" />
                  </el-checkbox-group>
                </el-form-item>
              </div>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                  {{ item.login }}
                </el-button>
                <el-button @click="resetForm('ruleForm')">{{ item.reset }}</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-main>
        <!-- 尾部 -->
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
    .el-main {
      margin: -20px auto -64px;
      text-align: center;
      position: relative;
      overflow: visible;
      .el-image {
        position: absolute;
        top: -25px;
        left: -180px;
        width: 50px;
        cursor: pointer;
      }
      .el-form {
        width: 300px;
        position: relative;
        margin-bottom: 22px;
        .asideLeft {
          transform: translateX(-200px);
        }
        .asideRight {
          width: 500px;
          position: absolute;
          top: 0;
          left: 150px;
          .el-form-item:first-child {
            margin-top: 41.5px;
          }
          .el-select {
            margin-left: -200px;
          }
          .el-checkbox-group {
            display: inline-flex;
            flex-wrap: wrap;
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
  name: 'MSubmit',
  methods: {
    // 验证表单信息
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (this.ruleForm.type.length > 4) {
          this.$message({
            message: '最多只能选择四种类型',
            type: 'error',
            duration: 1500,
            center: true,
          });
          return false;
        }
        if (valid) {
          if (Number(this.ruleForm.name2) < 80) {
            this.$message({
              message: '放映时长不得小于80min',
              type: 'error',
              duration: 1500,
              center: true,
            });
            this.ruleForm.name2 = '';
            return false;
          }
          if (Number(this.ruleForm.name2) > 180) {
            this.$message({
              message: '放映时长不得大于180min',
              type: 'error',
              duration: 1500,
              center: true,
            });
            this.ruleForm.name2 = '';
            return false;
          }
          this.ruleForm.type.forEach((arr) => {
            this.item.checkType += `${arr} `;
          });
          // 获取日期，并转换为数据库中需要的格式
          const date = new Date();
          // 向后端发送数据，验证身份信息
          const param = new URLSearchParams();
          param.append('username', this.$cookie.get('username'));
          param.append('movieName', this.ruleForm.name1);
          // 约束年份格式为：yyyy-MM-dd（xxxx-年-xx-月-xx日）
          param.append(
            'year',
            `${date.getFullYear()}-${
              date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
            }-${date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}`,
          );
          param.append('duration', this.ruleForm.name2);
          param.append('director', this.ruleForm.name4.trimEnd());
          param.append('role', this.ruleForm.name5.trimEnd());
          param.append('state', this.ruleForm.name3);
          param.append('type', this.item.checkType.trimEnd());
          this.$axios({
            method: 'post',
            url: '/movie/submit',
            data: param,
          }).then((res) => {
            // 电影名重复
            if (res.data !== '提交成功') {
              this.$message({
                message: res.data,
                type: 'error',
                duration: 1500,
                center: true,
              });
              // 清空影片名
              this.ruleForm.name1 = '';
              // 清空选中的类型
              this.item.checkType = '';
            } else {
              this.$router.push('/business');
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
            || !this.ruleForm.type.length
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
      this.$router.push('/business');
    },
  },
  data() {
    return {
      loading: true,
      // eslint-disable-next-line global-require
      bgUrl: require('../assets/img/movie.jpeg'),
      // eslint-disable-next-line global-require
      url: require('../assets/img/返回.svg'),
      item: {
        name: '电影名称',
        duration: '放映时长',
        state: '出版地区',
        director: '担任导演',
        role: '领衔主演',
        type: '影片类型',
        login: '提交',
        reset: '重置',
        types: [],
        states: [],
        checkType: '', // 选定的类型
        inpDirector: '', // 输入的导演
        inpRole: '', // 输入的主演
      },
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        type: [],
      },
      rules: {
        name1: [
          {
            required: true,
            message: '请输入电影名称',
            trigger: 'change',
          },
          {
            pattern: /^[\u4E00-\u9FA5]+[\u4E00-\u9FA5，：·\d]*$/,
            message: '格式不正确，含非法字符',
            trigger: 'change',
          },
        ],
        name2: [
          {
            required: true,
            message: '请输入放映时长',
            trigger: 'change',
          },
          {
            pattern: /^[0-9]+$/,
            message: '格式不正确，必须是纯数字',
            trigger: 'change',
          },
        ],
        name3: [
          {
            required: true,
            message: '请选择出版地区',
          },
        ],
        name4: [
          {
            required: true,
            message: '请输入担任导演',
            trigger: 'change',
          },
          {
            pattern: /^[\u4E00-\u9FA5]+\s{1,1}[\u4E00-\u9FA5]*$/,
            message: '格式不正确，必须是纯中文（一到两位）',
            trigger: 'change',
          },
        ],
        name5: [
          {
            required: true,
            message: '请输入领衔主演',
            trigger: 'change',
          },
          {
            pattern: /^[\u4E00-\u9FA5]+\s{1,1}[\u4E00-\u9FA5]*$/,
            message: '格式不正确，必须是纯中文（一到两位）',
            trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请选择影片类型',
            trigger: 'change',
          },
        ],
      },
    };
  },
  created() {
    if (this.$route.meta.flag) {
      setTimeout(() => {
        this.loading = false;
      }, 1500);
      // 加入键盘事件
      document.addEventListener('keydown', this.handleKeyDown);
      this.$axios({
        method: 'get',
        url: '/movie/get',
      }).then((res) => {
        // 获取出版地区
        res.data.area.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.text = arr.area;
          this.item.states.push(obj);
        });
        // 获取影片类型
        res.data.type.forEach((arr) => {
          const obj = {};
          obj.id = arr.id;
          obj.text = arr.type;
          this.item.types.push(obj);
        });
      });
    } else {
      this.$router.replace('/login');
    }
  },
  components: {
    Footer,
    elHeader,
  },
  // 在销毁组件前移除
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>
