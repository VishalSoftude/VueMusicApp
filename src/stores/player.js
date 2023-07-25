import { defineStore } from 'pinia';
import { Howl } from 'howler';
export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    isShowImage: false
  }),
  actions: {
    async newSong(song) {
      this.current_song = song;
      console.log(song.url);
      this.sound = new Howl({
        src: [song.url],
        html5: true
      });
      this.sound.play();
      this.isShowImage = true;
    }
  }
});
