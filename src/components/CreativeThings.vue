<!-- <template>
   <div>
    <h1>Random Color Palette Generator</h1>
    <button @click="generatePalette">Generate Palette</button>

    <div class="color-palette">
      <div
        v-for="(color, index) in palette"
        :key="index"
        :style="{ background: color }"
        class="color"
      ></div>
    </div>
  </div>

  <div>
    <h1 class="text-center">Gradient Creation</h1>
    <div class="animated-gradient">
      <h1>Animated Gradient Background</h1>
      <div class="gradient"></div>
    </div>
  </div> -->

<!-- <hr />
  <div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :style="`background-color: ${backgroundColor}`"
      @click="changeBackgroundColor"
    >
      Click me!
    </button>
  </div> -->
<!-- <div>
    <h1>Raining Clouds</h1>
    <button
      @click="startRaining"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Start Raining
    </button>

    <div v-if="isRaining" class="cloud-container">
      <div class="cloud"></div>
      <div class="raindrop"></div>
      <div class="raindrop"></div>
      <div class="raindrop"></div>
    </div>
  </div> -->
<!-- </template> -->

<!-- <script>
import useUserStore from '../stores/user'
export default {
  name: 'CreativeThings',
  beforeRouteEnter(to, from, next) {
    var userStore = useUserStore()
    if (userStore.userLoggedIn) {
      next()
    } else {
      next({ name: 'home' })
    }
  },
  mounted() {
    //this.animateGradient()
  },
  data() {
    return {
      palette: [],
      isRaining: false,
      backgroundColor: 'bg-blue-500'
    }
  },
  methods: {
    generatePalette() {
      this.palette = []
      for (let i = 0; i < 5; i++) {
        const color = this.getRandomColor()
        this.palette.push(color)
      }
    },
    changeBackgroundColor() {
      // Generate a random color from an array of colors
      const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-indigo-500']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      this.backgroundColor = randomColor
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      return color
    },
    animateGradient() {
      const gradient = document.querySelector('.gradient')
      let angle = 0

      setInterval(() => {
        angle = (angle + 1) % 360
        gradient.style.background = `linear-gradient(${angle}deg, #ff7f50, #00ffff)`
      }, 10)
    },
    startRaining() {
      this.isRaining = true
    }
  }
}
</script> -->

<!-- <style scoped>
.color-palette {
  display: flex;
}

.color {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.animated-gradient {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 24px;
}

.gradient {
  width: 400px;
  height: 400px;
  background: linear-gradient(0deg, #ff7f50, #00ffff);
  animation: gradientAnimation 5s infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.cloud-container {
  position: relative;
  width: 200px;
  height: 150px;
}

.cloud {
  background: linear-gradient(135deg, #f1f7fa, #c0d7e2);
  border-radius: 50%;
  width: 200px;
  height: 100px;
  animation: cloudMove 5s linear infinite;
  position: relative;
  overflow: hidden;
}

.raindrop {
  position: absolute;
  width: 2px;
  height: 20px;
  background-color: #4299e1;
  bottom: -20px;
  animation: rainFall 0.5s linear infinite;
}

@keyframes cloudMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes rainFall {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100px);
  }
}
</style> -->

<!-- <template>
  <div>
    <h1>Vue.js Creative Todo List</h1>
    <input v-model="newTodo" placeholder="Add a new todo" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.completed }">
        <span @click="toggleCompletion(todo)">{{ todo.text }}</span>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
    <p v-if="completedCount > 0">Completed todos: {{ completedCount }}</p>
    <p v-else>No completed todos</p>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  computed: {
    completedCount() {
      return this.todos.filter((todo) => todo.completed).length
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo !== '') {
        this.todos.push({
          text: this.newTodo,
          completed: false
        })
        this.newTodo = ''
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    toggleCompletion(todo) {
      todo.completed = !todo.completed
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style> -->
<!-- <template>
  <div>
    <h1>Animated List</h1>
    <input v-model="newItem" placeholder="Add a new item" />
    <button @click="addItem">Add</button>
    <transition-group name="fade" tag="ul">
      <li v-for="(item, index) in items" :key="item.id" @click="removeItem(index)">
        {{ item.text }}
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'AnimatedList',
  data() {
    return {
      newItem: '',
      items: [],
      nextItemId: 1
    }
  },
  methods: {
    addItem() {
      if (this.newItem !== '') {
        this.items.push({
          id: this.nextItemId,
          text: this.newItem
        })
        this.newItem = ''
        this.nextItemId++
      }
    },
    removeItem(index) {
      this.items.splice(index, 1)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<!-- <template>
  <div>
    <h1>Interactive Animated Box</h1>
    <button @click="toggleAnimation">Toggle Animation</button>
    <transition name="fade">
      <transition :name="animationType">
        <div
          v-if="showAnimation"
          class="box"
          :style="{ backgroundColor: boxColor }"
          @click="changeAnimationType"
        ></div>
      </transition>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InteractiveAnimatedBox',
  data() {
    return {
      showAnimation: false,
      boxColor: '#ffcc00',
      animationType: 'bounce',
      animationTypes: ['bounce', 'shift']
    }
  },
  methods: {
    toggleAnimation() {
      this.showAnimation = !this.showAnimation
      if (this.showAnimation) {
        this.boxColor = this.getRandomColor()
      }
    },
    changeAnimationType() {
      const currentIndex = this.animationTypes.indexOf(this.animationType)
      const nextIndex = (currentIndex + 1) % this.animationTypes.length
      this.animationType = this.animationTypes[nextIndex]
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s ease-in;
}

.bounce-leave-active {
  animation: bounce-out 0.5s ease-out;
}

.shift-enter-active {
  animation: shift-in 0.5s ease-in;
}

.shift-leave-active {
  animation: shift-out 0.5s ease-out;
}

@keyframes bounce-in {
  0% {
    transform: translateY(100%);
  }
  50% {
    transform: translateY(-30%);
  }
  80% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10%);
  }
  80% {
    transform: translateY(30%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes shift-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes shift-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

.box {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style> -->

<template>
  <div>
    <h1>Interactive Animated Box</h1>
    <button @click="toggleAnimation">Toggle Animation</button>
    <transition name="fade">
      <transition :name="animationType">
        <div
          v-if="showAnimation"
          class="box"
          :style="{ backgroundColor: boxColor }"
          @click="changeAnimationType"
        ></div>
      </transition>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'InteractiveAnimatedBox',
  data() {
    return {
      showAnimation: false,
      boxColor: '#ffcc00',
      animationType: 'bounce',
      animationTypes: [
        'bounce',
        'shift',
        'slide-down',
        'rotate',
        'flip-horizontal',
        'flip-vertical',
        'zoom-in',
        'zoom-out',
        'skew',
        'pulse'
      ]
    };
  },
  methods: {
    toggleAnimation() {
      this.showAnimation = !this.showAnimation;
      if (this.showAnimation) {
        this.boxColor = this.getRandomColor();
      }
    },
    changeAnimationType() {
      const currentIndex = this.animationTypes.indexOf(this.animationType);
      const nextIndex = (currentIndex + 1) % this.animationTypes.length;
      this.animationType = this.animationTypes[nextIndex];
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s ease-in;
}

.bounce-leave-active {
  animation: bounce-out 0.5s ease-out;
}

.shift-enter-active {
  animation: shift-in 0.5s ease-in;
}

.shift-leave-active {
  animation: shift-out 0.5s ease-out;
}

.slide-down-enter-active {
  animation: slide-down-in 0.5s ease-in;
}

.slide-down-leave-active {
  animation: slide-down-out 0.5s ease-out;
}

.rotate-enter-active {
  animation: rotate-in 0.5s ease-in;
}

.rotate-leave-active {
  animation: rotate-out 0.5s ease-out;
}

.flip-horizontal-enter-active {
  animation: flip-horizontal-in 0.5s ease-in;
}

.flip-horizontal-leave-active {
  animation: flip-horizontal-out 0.5s ease-out;
}

.flip-vertical-enter-active {
  animation: flip-vertical-in 0.5s ease-in;
}

.flip-vertical-leave-active {
  animation: flip-vertical-out 0.5s ease-out;
}

.zoom-in-enter-active {
  animation: zoom-in 0.5s ease-in;
}

.zoom-in-leave-active {
  animation: zoom-out 0.5s ease-out;
}

.skew-enter-active {
  animation: skew-in 0.5s ease-in;
}

.skew-leave-active {
  animation: skew-out 0.5s ease-out;
}

.pulse-enter-active {
  animation: pulse-in 0.5s ease-in;
}

.pulse-leave-active {
  animation: pulse-out 0.5s ease-out;
}

@keyframes bounce-in {
  0% {
    transform: translateY(100%);
  }
  50% {
    transform: translateY(-30%);
  }
  80% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10%);
  }
  80% {
    transform: translateY(30%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes shift-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes shift-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes slide-down-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slide-down-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes rotate-in {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-out {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes flip-horizontal-in {
  0% {
    transform: scaleX(-1);
  }
  100% {
    transform: scaleX(1);
  }
}

@keyframes flip-horizontal-out {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(-1);
  }
}

@keyframes flip-vertical-in {
  0% {
    transform: scaleY(-1);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes flip-vertical-out {
  0% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(-1);
  }
}

@keyframes zoom-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes skew-in {
  0% {
    transform: skewX(30deg);
  }
  100% {
    transform: skewX(0);
  }
}

@keyframes skew-out {
  0% {
    transform: skewX(0);
  }
  100% {
    transform: skewX(30deg);
  }
}

@keyframes pulse-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulse-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.box {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
