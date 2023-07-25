import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidatePlugin from './includes/validation';
import './includes/firebase';
import { auth } from './includes/firebase';

import './assets/base.css';
import './assets/main.css';

// import Vue from 'vue'
import axios from 'axios';

// Vue.prototype.$http = axios
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.config.globalProperties.$http = axios;
    app.mount('#app');
  }
});
