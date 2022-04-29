import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    iphone: '', // 手机号
    pwd: '', // 密码
    status: '', // 身份
    username: '', // 用户名
    movieId: '', // 电影编号
  },
  mutations: {
    // 改变身份
    changeStatus(state, value) {
      if (value === '普通用户') {
        state.status = 'regularUser';
      } else if (value === '商家用户') {
        state.status = 'merchantUser';
      } else {
        state.status = 'administrator';
      }
    },
    // 改变手机号
    changeIphone(state, value) {
      state.iphone = value;
    },
    // 改变密码
    changePwd(state, value) {
      state.pwd = value;
    },
    // 改变用户名
    changeUsername(state, value) {
      state.username = value;
    },
    // 改变电影编号
    changeMovieId(state, value) {
      state.movieId = value;
    },
  },
  // actions: {},
  // modules: {},
});
