<template>
  <div class="loading">
    <div>
      <img :src="loadingImageUrl" :alt="imageNotFound" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingImageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921',
      imageNotFound: 'Image Not Found'
    };
  }
};
</script>

<style></style>
