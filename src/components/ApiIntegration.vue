<template>
  <div>
    <ul>
      <li v-for="item in responseData" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import useUserStore from '../stores/user'
export default {
  name: 'ApiIntegration',
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
      responseData: null
    }
  },

  methods: {
    fetchData() {
      axios
        .get(
          'https://orsoapi.com/?command=products&sort=created_at&posted=Y&created_at=2022-07-07&token=B64A6D78FD67F55D147C81DEAA7C3F3AF8AC9A75'
        )
        .then((response) => {
          this.responseData = response
          console.log(response)
        })
        .catch((error) => {
          console.error('Error', error)
        })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped></style>
