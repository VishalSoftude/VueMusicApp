import { defineStore } from 'pinia';
import { Howl } from 'howler';
import helper from '@/includes/helper';
export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    isShowImage: false,
    isPlaying: false,
    seek: '00:00',
    duration: '00:00'
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true
      });

      this.sound.play();
      this.isShowImage = true;
      this.isPlaying = true;

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleSong() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.isPlaying = false;
        this.sound.pause();
      } else {
        this.isPlaying = true;
        this.sound.play();
      }
    },
    async progress() {
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());
    }
  },
  getters: {
    playingSong: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    }
  }
});
