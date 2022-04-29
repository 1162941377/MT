<template>
  <div class="my-header">
    <!-- logo展示 -->
    <img :src="logoUrl" />
    <span>{{ content }}</span>
  </div>
</template>

<style lang="less" scoped>
.my-header {
  margin: 50px auto;
  span {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>

<script>
export default {
  data() {
    return {
      // eslint-disable-next-line global-require
      logoUrl: require('../assets/img/外卖平台直连.svg'),
      content: '订单来电',
    };
  },
};
</script>
