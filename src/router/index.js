import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Manage from '../components/AppManage.vue';
import Creative from '../components/CreativeThings.vue';
import TestingComponent from '../components/Testing.vue';
import ApiIntegration from '../components/ApiIntegration.vue';
import SongView from '../views/SongView.vue';
import UseUserStore from '../stores/user';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
    meta: {
      reqiresAuth: true
    }
  },
  {
    name: 'creative',
    path: '/creative',
    component: Creative,
    beforeEnter: (to, from, next) => {
      console.log('Manage Creative Route Guard');
      next();
    }
  },
  {
    name: 'song',
    path: '/song/:id',
    //redirect: { name: 'song' },
    component: SongView
  },
  {
    name: 'testing',
    path: '/testing',
    component: TestingComponent,
    beforeEnter: (to, from, next) => {
      console.log('Manage Creative Route Guard');
      next();
    }
  },
  {
    name: 'apiIntegration',
    path: '/apiIntegration',
    component: ApiIntegration,
    beforeEnter: (to, from, next) => {
      console.log('Manage Creative Route Guard');
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
  if (!to.meta.reqiresAuth) {
    next();
    return;
  }
  const userStore = UseUserStore();
  if (userStore.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
  // console.log('Global Guard')
  // console.log(to, from)
  // next()
});
export default router;
