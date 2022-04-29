import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import md5 from 'md5';
import jsCookie from 'js-cookie';

import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.baseURL = '/api';
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.$cookie = jsCookie;

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

Vue.use(ElementUI);

// 创建 vue 项目
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
