
<template>
  <div>
    xxx
    {{ msg }}
    <p>我是app 组件的 p元素</p>
    <base-son />
  </div>
</template>

<script>
// 一个vue文件就是一个组件。
// 我们使用组件就是为了复用组件里面的结构、样式、行为，即html、css、js。
// 一般将html代码放在<template>内，将js代码放在<script>内，将css放在<style>内。


import baseSon from './Son';  // 导入其他vue文件(即组件)，导入的结果在局部组件中使用。然后可以在html部分使用导入的组件。
export default {
  components: {
    baseSon
  },
  data () {
    return {
      msg: 'hello world',
    }
  },
}
</script>

<style>
div {
  background-color: red;
}
</style>