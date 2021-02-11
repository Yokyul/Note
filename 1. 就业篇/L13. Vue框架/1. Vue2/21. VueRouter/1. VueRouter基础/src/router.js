import Vue from 'vue';

// 1.引入路由
import VueRouter from 'vue-router';

// 3.导入路由的组件
import Home from './views/Home';

// 2.使用路由
Vue.use(VueRouter);

// 4.定义一个路由
const routes = [
  {
    path: '/',
    component: Home,
  },

  // 一开始除了首页，其他都不用展示，所以可以使用异步组件。我们最好将路由组件和普通组件分开。
  {
    path: '/learn',
    component: () => import('./views/Learn'),
  },
  {
    path: '/student',
    component: () => import('./views/Student'),
  },
  {
    path: '/about',
    component: () => import('./views/About'),
  },
  {
    path: '/activity',
    component: () => import('./views/Activity'),
  }
];


// 5.创建 router 实例，导出给 main.js 中的vue实例使用。
export default new VueRouter({
  mode: 'history',
  routes,
});