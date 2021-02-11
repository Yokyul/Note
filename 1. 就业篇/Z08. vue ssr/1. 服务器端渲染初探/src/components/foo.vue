<template>
  <div class="foo">
      <div @click="clickme"></div>
  </div>
</template>

<script>
export default {
    methods: {
        clickme() {
            alert('hello Foo')
        }
    }
}
</script>

<style scoped>
    .foo > div {
        width: 100px;
        height: 100px;
        background: #fac;
    }
</style>