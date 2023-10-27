<template>
  <div>No of Image :- {{ images.length }}</div>
  <div v-if="images != null && images.length > 0">
    <div v-for="imageUrl in images" :key="imageUrl" class="image-formating">
      <img
        class="photo"
        v-lazy="{
          src: imageUrl,
          loading: 'https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif',
          error: 'https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif'
        }"
      />
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import VueLazyLoad from 'vue-lazyload';
export default {
  inject: ['apiService'],
  data() {
    return {
      message: 'Lazy Load component is Working',
      images: []
    };
  },
  methods: {
    async getImages() {
      const result = await this.apiService.FetchImages();
      result.data.forEach((element) => {
        console.log(element.links.download);
        this.images.push(element.links.download);
      });
      result.data.forEach((element) => {
        console.log(element.links.download);
        this.images.push(element.links.download);
      });
      result.data.forEach((element) => {
        console.log(element.links.download);
        this.images.push(element.links.download);
      });
      result.data.forEach((element) => {
        console.log(element.links.download);
        this.images.push(element.links.download);
      });
      result.data.forEach((element) => {
        console.log(element.links.download);
        this.images.push(element.links.download);
      });
    }
  },
  mounted() {
    this.getImages();
    // Vue.use(VueLazyLoad, {
    //   preLoad: 1.3,
    //   error: 'path/to/error.png',
    //   loading: 'path/to/error.png',
    //   attempt: 1
    // });
  }
};
</script>

<style>
.image-formating {
  height: 20%;
  text-align: center;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  width: 50%;
}
.image-formating img {
  height: 100%;
  width: 100%;
}
.photo {
  display: block;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
  background: #e8e3e3;
  border: solid 40px #fff4f4;
  transition: opacity 0.35s linear;
}
.photo[data-scroll='in'] {
  opacity: 1;
  transition-duration: 1s;
}
.body {
  background-color: black;
}
</style>
