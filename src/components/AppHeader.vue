<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'about' }">About</RouterLink>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'manage' }">Manage</RouterLink>
            </li>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'creative' }"
                >Creative Section</RouterLink
              >
            </li>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'testing' }"
                >Tesing Section</RouterLink
              >
            </li>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'apiIntegration' }"
                >Api Integration</RouterLink
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click="signOut()">LogOut</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import useModalStore from '../stores/modal';
import useUserStore from '../stores/user';

export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
      console.log(this.modalStore.isOpen);
      //console.log(this.useUserStore.userLoggedIn)
    },
    signOut() {
      this.userStore.signOut();
      if (this.$route.meta.reqiresAuth) {
        this.$router.push({ name: 'home' });
      }
    }
  }
};
</script>
