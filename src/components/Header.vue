<template>
  <div class="header">
    <el-menu mode="horizontal">
      <el-menu-item index="1" @click="alertMessage">
        {{ item.index1.text }}
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">{{ item.index2.text }}</template>
        <el-menu-item v-for="i in item.index2.slot" :key="i.id" @click="handleMessage(i.id)">
          {{ i.text }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="turnApp">{{ item.index3.text }}</el-menu-item>
      <el-submenu index="4">
        <template slot="title">{{ item.index4.text }}</template>
        <el-menu-item v-for="i in item.index4.slot" :key="i.id" @click="handleMessage(i.id)">
          {{ i.text }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="5" @click="alertMessage">
        {{ item.index5.text }}
      </el-menu-item>
    </el-menu>
    <el-image style="width: 100px; height: 100px" :src="url" />
    <el-row :gutter="14">
      <el-col :span="19">
        <el-input :placeholder="info" v-model="input" clearable />
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search" @click="search(input)">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="title in titles" :key="title" @click.native="handleMsg(title)">
        {{ title }}
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.header {
  position: relative;
  .el-menu {
    margin-bottom: 35px;
  }
  .el-image {
    position: absolute;
    left: -35%;
    top: 40px;
  }
  .el-row:last-child {
    margin-top: 40px;
    margin-left: -70px !important;
    color: #222;
    font-weight: 700;
    cursor: pointer;
    .el-col {
      width: fit-content;
      margin-right: 31.5px;
      &:hover {
        color: #fe8c00;
      }
    }
  }
  .el-button {
    margin-left: 2.5px;
  }
}
.el-menu-item {
  text-align: center;
  &:hover {
    color: #fe8c00 !important;
    transform: scale(0.95);
  }
}
</style>

<script>
/* eslint-disable no-restricted-globals */
import handle from '../assets/handle';

export default {
  data() {
    return {
      item: {
        index1: { id: 1, text: '小z网' },
        index2: {
          id: 2,
          text: '我的信息',
          slot: [
            { id: 2_1, text: '我的订单' },
            { id: 2_2, text: '我的收藏' },
            { id: 2_3, text: '抵用券' },
            { id: 2_4, text: '账户设置' },
          ],
        },
        index3: { id: 3, text: '手机App' },
        index4: {
          id: 4,
          text: '商家中心',
          slot: [
            { id: 4_1, text: '餐饮客户中心' },
            { id: 4_2, text: '登录商家中心' },
            { id: 4_3, text: '智能收银' },
            { id: 4_4, text: '我想合作' },
            { id: 4_5, text: '手机免费开店' },
            { id: 4_6, text: '到店综合业务招募' },
            { id: 4_7, text: '餐饮合作商招募' },
            { id: 4_8, text: '商家申请开票' },
            { id: 4_9, text: '免费合作排队' },
          ],
        },
        index5: { id: 5, text: '网站导航' },
      },
      // eslint-disable-next-line global-require
      url: require('../assets/img/logo.jpg'),
      input: '',
      info: '搜索商家或地点',
      titles: ['小z外卖', '猫眼电影', '小z酒店', '民宿 / 公寓', '商家入驻', '小z公益'],
    };
  },
  methods: {
    alertMessage() {
      this.$message({
        message: '欢迎来到小z网',
        center: true,
        duration: 1500,
      });
    },
    handleMessage(id) {
      if (id === 21) {
        location.href = 'https://www.meituan.com/orders';
      } else if (id === 22) {
        location.href = 'https://www.meituan.com/collections';
      } else if (id === 23) {
        location.href = 'https://www.meituan.com/vouchers';
      } else if (id === 24) {
        location.href = 'https://www.meituan.com/account/settings';
      } else if (id === 41) {
        location.href = 'http://b.meituan.com/canyin/PC';
      } else if (id === 42) {
        location.href = 'https://ecom.meituan.com';
      } else if (id === 43) {
        location.href = 'https://rms.meituan.com';
      } else if (id === 44) {
        location.href = 'https://ecom.meituan.com/emis/settle/merchantsSettle';
      } else if (id === 45) {
        location.href = 'https://e.meituan.com/mobile';
      } else if (id === 46) {
        location.href = 'https://wenjuan.meituan.com';
      } else if (id === 47) {
        location.href = 'https://wenjuan.meituan.com';
      } else if (id === 48) {
        location.href = 'https://pc.meituan.com';
      } else {
        location.href = 'https://paidui.meituan.com';
      }
    },
    turnApp() {
      location.href = 'https://i.meituan.com/mobile/down/meituan';
    },
    search(msg) {
      // 搜索信息，如果为空，不进行发送
      if (!msg) return;
      console.log(msg);
    },
    // 处理点击信息
    handleMsg(msg) {
      if (msg === '猫眼电影') {
        location.href = 'https://www.maoyan.com/?utm_source=meituanweb';
      } else {
        this.$message({
          message: '欢迎来到小z网',
          center: true,
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    handle();
  },
};
</script>
