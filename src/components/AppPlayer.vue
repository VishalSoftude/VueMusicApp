<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <!-- import { RouterView } from 'vue-router' -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleSong">
        <i
          class="text-gray-500 text-xl"
          :class="{ 'fa fa-pause': playingSong, 'fa fa-play': !playingSong }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import usePlayerStore from '../stores/player';
export default {
  name: 'AppPlayer',
  methods: {
    ...mapActions(usePlayerStore, ['toggleSong'])
  },
  computed: {
    ...mapState(usePlayerStore, ['playingSong', 'isPlaying', 'seek', 'duration'])
  },
  mounted() {
    console.log('asdfs');
    console.log(this.playingSong);
  }
};
</script>

<style></style>
