<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>

// 使用第三方库，写js过渡效果
export default {
  data () {
    return {
      show: true,
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0;
    },
    enter (el, done) {
      Velocity(el, { opacity: 1}, { duration: 500});      // 参数：设置的元素  设置的样式  过渡效果的配置
      Velocity(el, { rotateZ: 10 }, { duration: 300 });
      Velocity(el, { rotateZ: -10 }, { duration: 300 });
      Velocity(el, { rotateZ: 0 }, { duration: 300, complete: done });
    },
    beforeLeave (el) {
      el.style.transformOrigin = 'left';
    },
    leave (el, done) {
      Velocity(el, { translateX: '45px', rotateZ: '50deg'}, { duration: 600});
      Velocity(el, { translateY: '450px', rotateZ: '-50deg'}, { duration: 600});
      Velocity(el, { rotateZ: '0deg'}, { duration: 600});
      Velocity(el, { rotateZ: '45deg', translateY: '30px', translateX: '30px', opacity: 0}, { duration: 600,complete: done});
    },
  }
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

.box {
  width: 200px;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid red;
  color: red;
}


</style>