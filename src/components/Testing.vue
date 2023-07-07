<template>
  <div>
    <transition-group name="float">
      <div v-for="(item, index) in items" :key="index" class="float-element">
        {{ item }}
      </div>
    </transition-group>
    <button @click="addItem">Add Item</button>
  </div>
  <!-- <div>
    <div>
      <button @click="toggleAnimation">Toggle Animation</button>
      <div :class="{ animated: isAnimating, bounce: isAnimating }">Animated Content</div>
    </div>
  </div>

  <div>
    <transition name="fade">
      <p v-if="show">Hello, Vue.js!</p>
    </transition>
    <button @click="toggle">Toggle</button>
  </div>

  <div>
    <transition name="slide">
      <p v-if="show">Welcome to Vue.js!</p>
    </transition>
    <button @click="toggle">Toggle</button>
  </div>

  <div>
    <transition name="bounce">
      <p v-if="show">Vue.js is awesome!</p>
    </transition>
    <button @click="toggle">Toggle</button>
  </div> -->
</template>

<script>
import useUserStore from '../stores/user'
export default {
  name: 'TestingComponent',
  beforeRouteEnter(to, from, next) {
    var userStore = useUserStore()
    if (userStore.userLoggedIn) {
      next()
    } else {
      next({ name: 'home' })
    }
  },
  data() {
    return {
      isAnimating: false,
      show: false,
      items: []
    }
  },
  methods: {
    toggleAnimation() {
      this.isAnimating = !this.isAnimating
    },
    toggle() {
      this.show = !this.show
    },
    addItem() {
      this.items.push('Item ' + (this.items.length + 1))
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.animated {
  animation-duration: 1s;
}

.animated {
  animation-duration: 1s;
}

.bounce {
  animation-name: bounce;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.bounce-enter-active,
.bounce-leave-active {
  animation: bounce 0.5s;
}
.bounce-enter,
.bounce-leave-to {
  transform: scale(0);
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.float-enter-active,
.float-leave-active {
  transition: transform 0.5s;
}
.float-enter,
.float-leave-to {
  transform: translateX(200%);
}
.float-element {
  background-color: #e0e0e0;
  padding: 10px;
  margin: 5px;
  display: inline-block;
}
</style>
