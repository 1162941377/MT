<template>
  <el-footer>
    <nav class="footer">
      <ul v-for="i in item.info" :key="i.id">
        <li @click="handleInfo(i.id)">{{ i.text }}</li>
      </ul>
    </nav>
    <div class="copyright">{{ item.copyText }}</div>
  </el-footer>
</template>

<style lang="less" scoped>
.el-footer {
  font-size: 12px;
  color: #999;
  margin: auto;
  .footer {
    width: fit-content;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 12px 0;
    ul {
      display: inline-flex;
      li {
        margin: 0 30px;
        &:hover {
          cursor: pointer;
          transform: scale(1.2);
          transition: transform 1s linear;
        }
      }
    }
  }
  .copyright {
    margin-top: 10px;
    text-align: center;
  }
}
</style>

<script>
/* eslint-disable no-restricted-globals */
export default {
  data() {
    return {
      item: {
        info: [
          { id: 1, text: '关于' },
          { id: 2, text: '加入我们' },
          { id: 3, text: '商家入驻' },
          { id: 4, text: '帮助中心' },
          { id: 5, text: '手机版' },
        ],
        copyText: '©2022 订单来电 ddld.com 京ICP证31931号 京公网安备3030193153号',
      },
    };
  },
  methods: {
    // 处理对应的按钮
    handleInfo(id) {
      if (id === 1) {
        location.href = 'https://rules-center.meituan.com/rules-detail/4';
      } else if (id === 2) {
        location.href = 'https://zhaopin.meituan.com/';
      } else if (id === 3) {
        location.href = 'https://ecom.meituan.com/emis/settle/merchantsSettle';
      } else if (id === 4) {
        location.href = 'https://www.meituan.com/help/faq';
      } else {
        location.href = 'http://i.meituan.com/mobile/down/meituan';
      }
    },
  },
};
</script>
