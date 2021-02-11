import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// Vue这个框架分为很多种，其中有两个：完整版和运行时版。运行时版相对于完整版少了编译器，所以体积小了30%。
// 如果使用render函数来渲染页面，就不需要编译器。如果使用el或者template渲染页面，那么需要编译器。

// 页面渲染的优先级：render函数 > template选项 > el选项。
// 需要注意的是：template标签的优先级高于render函数

new Vue({
  // template: '<p>haah deng is a p</p>',
  render: h => h(App),
}).$mount('#app')
