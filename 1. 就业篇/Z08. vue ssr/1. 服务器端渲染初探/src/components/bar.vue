<template>
  <div class="bar">
      <div>{{msg}}</div>
      <input type="text" v-model="msg">
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello bar'
        }
    }
}
</script>

<style>

</style>