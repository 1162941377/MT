import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logon from '../views/Logon.vue';
import Setting from '../views/Setting.vue';
import Forage from '../views/Forage.vue';
import Manager from '../views/Manager.vue';
import Movie from '../views/Movie.vue';
import BusinessSubmit from '../views/BSubmit.vue';
import BusinessSetting from '../views/BSetting.vue';
import Business from '../views/Business.vue';
import MSubmit from '../views/MSubmit.vue';

Vue.use(VueRouter); // 使用router

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      iphone: '',
      pwd: '',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logon',
    name: 'Logon',
    component: Logon,
  },
  {
    path: '/change',
    name: 'Forage',
    component: Forage,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {
      iphone: '',
      pwd: '',
    },
  },
  {
    path: '/movie',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
    meta: {
      flag: false,
    },
  },
  {
    path: '/business',
    name: 'Business',
    component: Business,
    meta: {
      flag: false,
    },
  },
  {
    path: '/business/setting',
    name: 'BSetting',
    component: BusinessSetting,
    meta: {
      flag: false,
    },
  },
  {
    path: '/business/submit',
    name: 'BSubmit',
    component: BusinessSubmit,
    meta: {
      flag: false,
      setting: false,
      index: false,
    },
  },
  {
    path: '/movie/submit',
    name: 'MSubmit',
    component: MSubmit,
    meta: {
      flag: false,
    },
  },
  {
    // 防止用户输入错误的网址，默认跳转到登录界面
    path: '/*',
    redirect: '/login',
  },
];

// 更改为history模式，取代原有的哈希模式
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Logon') {
    // 进入登录页面时，清空cookie
    const strCookie = document.cookie;
    const arrCookie = strCookie.split('; ');
    for (let i = 0; i < arrCookie.length; i += 1) {
      const arr = arrCookie[i].split('=');
      document.cookie = `${arr[0]}=${arr[1]}; max-age=0`;
    }
  }
  if (
    to.name === 'Home'
    || to.name === 'Setting'
    || to.name === 'Manager'
    || to.name === 'Movie'
    || to.name === 'BSubmit'
    || to.name === 'BSetting'
    || to.name === 'Business'
    || to.name === 'MSubmit'
  ) {
    // 必须登录后才能进入
    if (document.cookie !== '') {
      return next();
    }
    // 不然跳转回登录界面
    return next({ name: 'Login' });
  }
  return next();
});
