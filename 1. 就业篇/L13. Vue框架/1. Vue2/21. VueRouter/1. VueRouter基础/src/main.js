import Vue from 'vue'
import App from './App.vue'

// 导入路由的js文件
import router from './router';
import "./assets/reset.css";

Vue.config.productionTip = false


// 6.创建和挂载根实例
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
