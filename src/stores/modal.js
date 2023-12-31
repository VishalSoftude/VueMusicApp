import { defineStore } from 'pinia';
import { songsCollection } from '../includes/firebase';
export default defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : '';
    }
  },
  actions: {
    async updateSong(docId, formValues) {
      try {
        await songsCollection.doc(docId).update(formValues);
        return true;
      } catch (error) {
        return false;
      }
    },
    async deleteSong(docId) {
      console.log('docId', docId);
      const result = await songsCollection
        .doc(docId)
        .delete()
        .then(() => {
          console.log('song deleted');
        });
      console.log(result);
    },
    async addComment(docId, formValues) {
      const result = await songsCollection.doc(docId).update(formValues);
      console.log(result);
    }
  }
});
