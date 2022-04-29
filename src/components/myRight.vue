<template>
  <div class="my-right">
    <!-- 上面的个人信息 -->
    <div class="topArea">
      <el-avatar :size="size" :src="imgUrl" />
      <div class="nickName">
        {{ nickName }}
        <el-badge :value="grade" class="item" type="primary" />
      </div>
      <i class="el-icon-setting" @click="toSetting" />
      <ul class="fn-row">
        <li v-for="fn in fns" :key="fn.id">
          <img class="img" :src="fn.ico" @click="handle(fn.text)" />
          {{ fn.text }}
        </li>
      </ul>
    </div>
    <!-- 下面的扫码下载 -->
    <div class="bottomArea">
      <img class="img" :src="download" />
      <p class="txt-p">{{ txtP }}</p>
      <p class="txt-s">
        <span v-for="t in txtS" :key="t.id" :class="t.id === 1 ? 'red' : ''">{{ t.text }}</span>
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.my-right {
  position: relative;
  margin-left: 20px;
  text-align: center;
  .topArea,
  .bottomArea {
    width: 230px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
  }
  .topArea {
    height: 240px;
    .el-avatar {
      margin-top: 30px;
    }
    .nickName {
      margin-top: 5px;
      cursor: default;
      .el-badge {
        margin-top: 3.5px;
      }
    }
    .el-icon-setting {
      font-size: 22.5px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .fn-row {
      padding: 0 30px;
      // 清除浮动带来的影响
      &::after {
        display: block;
        content: '';
        clear: both;
      }
      li {
        font-size: 12px;
        float: left;
        margin-right: 19px;
        cursor: default;
        &:nth-child(3) {
          margin-right: 0;
        }
        &:nth-child(4),
        &:nth-child(5),
        &:last-child {
          margin-top: 10px;
        }
        &:nth-child(4) {
          margin-left: 10px;
        }
        &:nth-child(5) {
          margin-left: 25.5px;
        }
        &:last-child {
          margin-right: 0px;
          margin-left: 19.5px;
        }
        .img {
          display: block;
          margin: 5px auto;
          width: 22.5px;
          cursor: pointer;
        }
      }
    }
  }
  .bottomArea {
    height: 163px;
    margin-top: 15.5px;
    .img {
      width: 95px;
      margin-top: 10px;
    }
    .txt-p {
      color: #222;
      font-size: 14px;
    }
    .txt-s {
      font-size: 12px;
      margin-top: 2px;
      span {
        margin-right: 5px;
        color: #3f3f3f;
        &.red {
          color: #ec5330;
        }
      }
    }
  }
}
</style>

<script>
/* eslint-disable global-require */
export default {
  data() {
    return {
      download: require('../assets/img/download.png'),
      txtP: 'APP手机版',
      size: 48,
      txtS: [
        { id: 1, text: '1元起' },
        { id: 2, text: '吃喝玩乐' },
      ],
      imgUrl: require('../assets/img/avatar.jpg'),
      nickName: decodeURIComponent(this.$cookie.get('username')),
      grade: 'v8',
      fns: [
        { id: 1, text: '我的订单', ico: require('../assets/img/订单.svg') },
        { id: 2, text: '我的收藏', ico: require('../assets/img/收藏.svg') },
        { id: 3, text: '抵用券', ico: require('../assets/img/抵用券.svg') },
        { id: 4, text: '余额', ico: require('../assets/img/支付-余额.svg') },
        { id: 5, text: '更多', ico: require('../assets/img/更多.svg') },
        { id: 6, text: '退出', ico: require('../assets/img/退出.svg') },
      ],
    };
  },
  methods: {
    toSetting() {
      this.$message({
        type: 'info',
        duration: 1500,
        message: '即将进入账户设置',
        center: true,
      });
      this.$router.push('/setting');
    },
    handle(msg) {
      if (msg === '退出') {
        this.$message({
          center: true,
          message: '退出成功',
          type: 'success',
          duration: 1500,
        });
        this.$router.replace('/login');
      }
    },
  },
};
</script>
