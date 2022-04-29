<template>
  <div class="my-main">
    <div class="carousel">
      <!-- 轮播图 -->
      <el-carousel
        :interval="4000"
        height="240px"
        autoplay
        indicator-position="none"
        @change="handle"
      >
        <el-carousel-item v-for="u in urls" :key="u.id">
          <img class="img" :src="u.url" />
        </el-carousel-item>
      </el-carousel>
      <!-- 指示器 -->
      <div class="group">
        <i
          class="group-i"
          v-for="num in urls"
          :key="num.id"
          :class="[num.id === id ? 'active' : '']"
        />
      </div>
    </div>
    <el-image class="live" :src="live" />
    <el-image class="hotel" :src="hotel" />
    <el-image class="guitar" :src="guitar" />
    <el-image class="me" :src="me" />
  </div>
</template>

<style lang="less" scoped>
.my-main {
  width: 710px;
  position: relative;
  .carousel {
    position: relative;
    width: 550px;
    margin-left: 10px;
    margin-top: 1px;
    .el-carousel {
      .img {
        width: 550px;
        height: 240px;
      }
    }
    .group {
      left: 36.5%;
      z-index: 5;
      margin-top: -30px;
      position: absolute;
      i {
        width: 10px;
        height: 10px;
        display: inline-block;
        margin: 0 10px;
        background-color: #ccc;
        border-radius: 50%;
        &.active {
          background-color: #fff;
        }
      }
    }
  }
  .live {
    width: 150px;
    height: 240px;
    position: absolute;
    top: 1px;
    right: -10px;
  }
  .hotel,
  .guitar,
  .me {
    width: 270px;
    position: absolute;
    height: 165px;
    left: 10px;
    bottom: 0px;
  }
  .guitar {
    left: 290px;
  }
  .me {
    width: 150px;
    height: 165px;
    left: 570px;
  }
}
</style>

<script>
/* eslint-disable global-require */
export default {
  data() {
    return {
      urls: [
        { id: 0, url: require('../assets/img/1.jpg') },
        { id: 1, url: require('../assets/img/2.jpg') },
        { id: 2, url: require('../assets/img/3.jpg') },
        { id: 3, url: require('../assets/img/4.jpg') },
        { id: 4, url: require('../assets/img/5.jpg') },
      ],
      id: 0,
      live: require('../assets/img/live.jpg'),
      hotel: require('../assets/img/hotel.png'),
      guitar: require('../assets/img/guitar.jpg'),
      me: require('../assets/img/me.jpg'),
    };
  },
  methods: {
    handle(id) {
      this.id = id;
    },
  },
};
</script>
