<template>
  <AppHeader />

  <RouterView></RouterView>
  <AppPlayer />
  <AppAuth />
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppAuth from './components/AppAuth.vue';
import AppPlayer from './components/AppPlayer.vue';

import { mapWritableState } from 'pinia';
import useUserStore from './stores/user';
import { auth } from './includes/firebase';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    //this life cycle hook is called when the component is created.
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  }
};
</script>
