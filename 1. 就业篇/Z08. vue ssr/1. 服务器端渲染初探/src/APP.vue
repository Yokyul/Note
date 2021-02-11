<template>
  <div>
      <h1>我是父级组件</h1>
      <com-foo></com-foo>
      <com-bar></com-bar>
  </div>
</template>

<script>
import comFoo from './components/foo';
import comBar from './components/bar';

export default {
    components: {
        comFoo,
        comBar
    }
}
</script>

<style>

</style>