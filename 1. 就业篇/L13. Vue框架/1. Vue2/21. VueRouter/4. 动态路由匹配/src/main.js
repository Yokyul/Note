import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from './http';
import "./assets/reset.css";

Vue.config.productionTip = false

// 需要注意，直接在 main.js 引入 axios 库的话，是不能在组件使用axios的。但是在每一个组件都引入axios，又显得冗余。
// 所以我们可以在vue的原型上添加 $axios 方法。然后每个组件都可以通过 this.$axios来使用这个库了。
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
