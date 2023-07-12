<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @drapleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="upload($event)"
        >
          <h5>Drop your files here</h5>
        </div>
        <input type="file" multiple @change="upload($event)" />
        <hr class="my-6" />
        <!-- Progess Bars -->
        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <!-- File Name -->
          <div class="font-bold text-sm">{{ upload.name }}</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              :class="'bg-blue-400'"
              :style="{ width: upload.current_progress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '../includes/firebase'
export default {
  name: 'AppUpload',
  data() {
    return {
      is_dragover: false,
      uploads: []
    }
  },
  setup() {
    return {}
  },
  methods: {
    checkDragEvent(drapEvent) {
      console.log(drapEvent)
    },
    upload($event) {
      this.is_dragover = false
      console.log($event)
      var files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]
      files.forEach((file) => {
        console.log('files', file)
        if (file.type != 'audio/mpeg') {
          return
        }
        const storageRef = storage.ref()
        const songsRef = storageRef.child(`songs/${file.name}`)
        const task = songsRef.put(file)
        const uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name
          }) - 1

        task.on(
          'state_changed',
          (stateChanged) => {
            const progress = (stateChanged.bytesTransferred / stateChanged.totalBytes) * 100
            this.uploads[uploadIndex].current_progress = progress
            console.log(progress)
          },
          (error) => {
            console.log(error)
          },
          async () => {
            console.log('auth.currentUser.displayName', auth.currentUser.displayName)
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0
            }
            song.url = await task.snapshot.ref.getDownloadURL()
            await songsCollection.add(song)
          }
        )
      })
    }
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel()
    })
  }
}
</script>

<style lang="scss" scoped></style>
