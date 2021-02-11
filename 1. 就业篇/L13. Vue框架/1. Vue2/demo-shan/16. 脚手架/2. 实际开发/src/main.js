import Vue from 'vue'
import App from './App.vue'

// 控制生产环境下，是否显示错误或警告
Vue.config.productionTip = false

new Vue({
  // 渲染页面以App.vue文件为主
  render: h => h(App),
}).$mount('#app')
