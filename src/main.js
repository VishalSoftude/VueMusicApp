import { createApp } from 'vue';
import { createPinia } from 'pinia';

//import { Vue as Vuee } from 'vue';
import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';
import './includes/firebase';
import { auth } from './includes/firebase';
import messageService from './includes/messageService';
import apiService from './includes/apiService';
import VueLazyload from 'vue-lazyload';
import icon from './directives/icon';

import './assets/base.css';
import './assets/main.css';

import axios from 'axios';

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(VueLazyload, {
      preLoad: 1.3,
      error: 'dist/error.png',
      loading: 'dist/loading.gif',
      attempt: 1
    });
    app.provide('messageService', messageService);
    app.provide('apiService', apiService);
    app.config.globalProperties.$http = axios;

    app.directive('icon', icon);
    app.mount('#app');
  }
});
