<template>
  <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div
      class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"
    ></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
        <p class="w-full md:w-8/12 mx-auto">
          {{ $t('home.description') }}
        </p>
      </div>
    </div>

    <img
      class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="/assets/img/introduction-music.png"
    />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon.yellow.right="'headphones'"
      >
        <!-- Icon -->
        <!-- <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i> -->
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SongItem v-for="song in songs" :key="song.docID" :song="song"> </SongItem>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import { songsCollection } from '../includes/firebase';
import SongItem from '../components/SongItem.vue';
export default {
  name: 'AppHome',
  data() {
    return {
      songs: []
    };
  },
  components: {
    SongItem
  },
  async created() {
    this.getSongs();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnMount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
      //console.log(bottomOfWindow);
      if (bottomOfWindow) {
        //console.log('bottomOfWindow');
      }
    },
    async getSongs() {
      const snapshots = await songsCollection.get();
      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data()
        });
      });
    }
  }
};
</script>
