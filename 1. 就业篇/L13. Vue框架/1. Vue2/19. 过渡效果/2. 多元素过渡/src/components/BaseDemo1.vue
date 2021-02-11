<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition>
      <div v-if="show" key="world">hello world</div>
      <div v-else key="shanshan">hello shanshan</div>
    </transition>
  </div>
</template>

<script>

// 当元素标签相同时，可以给每一个元素设置不同的key值来切换展示的元素
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all .3s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}


</style>