<template>
  <div>
    <div class="border border-gray-200 p-3 mb-4 rounded">
      <div v-show="!showForm">
        <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          @click.prevent="deleteAsync"
        >
          <i class="fa fa-times"></i>
        </button>
        <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
          <i class="fa fa-pencil-alt" @click.prevent="showForm = !showForm"></i>
        </button>
      </div>
      <div v-show="showForm">
        <vee-form :validation-schema="schema" @submit="edit" :initial-values="song">
          <div class="mb-3">
            <label class="inline-block mb-2">Song Title</label>
            <vee-field
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
              name="modified_name"
            />
            <ErrorMessage class="text-red-600" name="modified_name" />
          </div>
          <div class="mb-3">
            <label class="inline-block mb-2">Genre</label>
            <vee-field
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Genre"
              name="genre"
            />
            <ErrorMessage class="text-red-600" name="genre" />
          </div>
          <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 mr-2">
            Submit
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            @click.prevent="showForm = !showForm"
          >
            Go Back
          </button>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import modalStore from '../stores/modal';
import { songsCollection, storage } from '../includes/firebase';
export default {
  name: 'CompositionItem',
  props: {
    song: { type: Object, required: true },
    updateSongsList: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      schema: {
        modified_name: 'required|min:3|max:100|alpha_spaces',
        genre: 'required|min:3|max:100'
      },
      showForm: false
    };
  },
  methods: {
    ...mapActions(modalStore, ['updateSong', 'deleteSong']),

    async edit(formValues) {
      try {
        const result = await this.updateSong(this.song.docID, formValues);
        console.log('result', result);
      } catch (error) {
        console.log(error);
      }
      this.updateSongsList(this.index, formValues);
    },
    async deleteAsync() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);
      await songRef.delete();

      await songsCollection.doc(this.song.docID).delete();

      this.removeSong(this.index);
    }
  }
};
</script>
