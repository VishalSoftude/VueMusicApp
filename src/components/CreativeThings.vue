<template>
  <!-- <div>
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

  <hr />
  <div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :style="`background-color: ${backgroundColor}`"
      @click="changeBackgroundColor"
    >
      Click me!
    </button>
  </div>
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
</template>

<script>
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
</script>

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
