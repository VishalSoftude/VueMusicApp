import { createRouter, createWebHistory } from 'vue-router';
//import Home from '../views/HomeView.vue';
//import About from '../views/AboutView.vue';
//import Manage from '../components/AppManage.vue';
//import Creative from '../components/CreativeThings.vue';
//import TestingComponent from '../components/Testing.vue';
//import ApiIntegration from '../components/ApiIntegration.vue';
//import ProductView from '../components/ProductView.vue';
//import MultiFileUploads from '../components/MultifileUploader.vue';

//import SongView from '../views/SongView.vue';

import UseUserStore from '../stores/user';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../views/AboutView.vue')
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: () => import('../components/AppManage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'creative',
    path: '/creative',
    component: () => import('../components/CreativeThings.vue')
  },
  {
    name: 'product',
    path: '/product',
    component: () => import('../components/ProductView.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Manage Product Route Guard');
      next();
    }
  },
  {
    name: 'upload',
    path: '/upload',
    component: () => import('../components/MultifileUploader.vue'),
    beforeEnter: (to, from, next) => {
      console.log('MultiFileUploads');
      next();
    }
  },
  {
    name: 'song',
    path: '/song/:id',
    //redirect: { name: 'song' },
    component: () => import('../views/SongView.vue')
  },
  {
    name: 'testing',
    path: '/testing',
    component: () => import('../components/Testing.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Manage Creative Route Guard');
      next();
    }
  },
  {
    name: 'apiIntegration',
    path: '/apiIntegration',
    component: () => import('../components/ApiIntegration.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Manage Creative Route Guard');
      next();
    }
  },
  {
    name: 'lazyLoad',
    path: '/lazy-load',
    component: () => import('../components/LazyLoading.vue'),
    beforeEnter: (to, from, next) => {
      console.log('Manage Lazy load Component');
      next();
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth == undefined) {
    next();
    return;
  } else {
    const userStore = UseUserStore();
    if (userStore.userLoggedIn) {
      next();
    } else {
      next({ name: 'home' });
    }
  }

  // console.log('Global Guard')
  // console.log(to, from)
  // next()
});
export default router;
