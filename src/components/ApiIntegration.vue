<template>
  <div>
    <ul>
      <li v-for="item in responseData" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
  <SwaggerUI :spec-url="swaggerSpecUrl" />
</template>

<script>
// import axios from 'axios';
// import useUserStore from '../stores/user';
// import SwaggerUI from 'swagger-ui-dist/swagger-ui-es-bundle'; // Import the Swagger UI ES bundle
// import 'swagger-ui-dist/swagger-ui.css';
// export default {
//   name: 'ApiIntegration',
//   beforeRouteEnter(to, from, next) {
//     var userStore = useUserStore();
//     if (userStore.userLoggedIn) {
//       next();
//     } else {
//       next({ name: 'home' });
//     }
//   },
//   data() {
//     return {
//       responseData: null,
//       swaggerSpecUrl: 'https://localhost:7021/swagger/v1/swagger.json'
//     };
//   },
//   components: {
//     SwaggerUI
//   },
//   methods: {
//     fetchData() {
//       var userStore = useUserStore();
//       console.log('userStore.userLoggedIn', userStore.authToken);
//       axios
//         .get('https://localhost:7021/api/cms/product/list/1')
//         .then((response) => {
//           this.responseData = response;
//           console.log(response);
//         })
//         .catch((error) => {
//           console.error('Error', error);
//         });
//     }
//   },
//   mounted() {
//     this.fetchData();
//   }
// };
</script>

<style lang="less" scoped></style>
