<template>
  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      :style="{ 'background-image': 'url(' + background_url + ')' }"
      v-show="isShowImage"
    ></div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        @click.prevent="newSong(song)"
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
      >
        <i class="fas fa-play"></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold" :class="isShowImage ? 'text-white' : 'text-black'">
          {{ song.modified_name }}
        </div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <!-- Comment Count -->
        <span class="card-title">Comments ({{ comments.length }})</span>
        <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <div
          class="text-white text-center font-bold p-4 mb-4"
          v-if="comment_show_alert"
          :class="comment_alert_varient"
        >
          {{ comment_alert_message }}
        </div>
        <vee-form :validation-schema="schema" @submit="SaveComment" v-show="userLoggedIn">
          <vee-field
            as="textarea"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
            placeholder="Your comment here..."
            name="comment"
          ></vee-field>
          <ErrorMessage class="text-red-600" name="comment" />
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600 block"
            :disabled="comment_in_submission"
          >
            Submit
          </button>
        </vee-form>
        <!-- Sort Comments -->
        <select
          class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          v-model="sort"
        >
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto">
    <li
      class="p-6 bg-gray-50 border border-gray-200"
      v-for="comment in sortedComments"
      :key="comment.docID"
    >
      <!-- Comment Author -->
      <div class="mb-5">
        <div class="font-bold">{{ comment.userName }}</div>
        <time>{{ comment.datePosted }}</time>
      </div>

      <p>
        {{ comment.content }}
      </p>
    </li>
  </ul>
</template>

<script>
import { songsCollection, commentsCollection, auth } from '../includes/firebase';
import { mapState, mapActions } from 'pinia';
import userStore from '../stores/user';
import useplayerStore from '../stores/player';
export default {
  name: 'SongView',
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3'
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_varient: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is submitted',
      comments: [],
      sort: '1',
      background_url: '/assets/img/song-header.png'
    };
  },
  computed: {
    ...mapState(userStore, ['userLoggedIn']),
    ...mapState(useplayerStore, ['isShowImage']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  async created() {
    const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
    if (!docSnapshot.exists) {
      this.$router.push({ name: 'home' });
      return;
    }
    const { sort } = this.$route.query;
    this.sort = sort === '1' || sort === '2' ? sort : '1';
    this.song = docSnapshot.data();
    this.getComments();

    //this.sortedComments()
  },
  methods: {
    ...mapActions(useplayerStore, ['newSong']),
    async SaveComment(formValues, { resetForm }) {
      (this.comment_in_submission = true),
        (this.comment_show_alert = true),
        (this.comment_alert_varient = 'bg-blue-500'),
        (this.comment_alert_message = 'Please wait! Your comment is submitted');

      const comment = {
        content: formValues.comment,
        datePosted: new Date().toString(),
        sid: this.$route.params.id,
        userName: auth.currentUser.displayName,
        userId: auth.currentUser.uid
      };
      try {
        await commentsCollection.add(comment);
        (this.comment_in_submission = false),
          (this.comment_show_alert = true),
          (this.comment_alert_varient = 'bg-green-500'),
          (this.comment_alert_message = 'Success... Your comment is saved');

        this.getComments();
      } catch (error) {
        (this.comment_in_submission = true),
          (this.comment_show_alert = true),
          (this.comment_alert_varient = 'bg-red-500'),
          (this.comment_alert_message = 'Please check the comment entered');
      }
      resetForm();
    },
    async getComments() {
      const snapshot = await commentsCollection.where('sid', '==', this.$route.params.id).get();
      this.comments = [];
      snapshot.forEach((document) => {
        this.comments.push({
          docID: document.id,
          ...document.data()
        });
      });
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.comments.length
      });
      console.log('comments', this.comments);
    }
  },
  watch: {
    sort(newValue) {
      console.log(newValue);
      console.log('this.$route.query.sort ', this.$route.query.sort);
      if (newValue === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newValue
        }
      });
    }
  }
};
</script>
