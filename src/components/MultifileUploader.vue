<template>
  <div class="uploadFile">
    <input type="file" @change="uploadFile" multiple />
    <button
      type="button"
      @click="uploadFilesInStorage()"
      class=""
      style="background-color: #cdd400; color: black; border: 10px"
    >
      Upload File
    </button>
    <div class="file-list">
      <div class="file" v-for="file in uploadedFiles" :key="file.name">
        <img :src="file.url" :alt="file.name" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import uploadFile from '../stores/uploadfile';
export default {
  name: 'MultiFileUploads',
  data() {
    return {
      filesToUpload: [],
      uploadedFiles: []
    };
  },
  methods: {
    ...mapActions(uploadFile, ['uploadFiles']),
    uploadFile(event) {
      this.files = event.target.files;
      for (let i = 0; i < this.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filesToUpload.push({
            name: this.files[i].name,
            url: e.target.result
          });
        };
        reader.readAsDataURL(this.files[i]);
      }
    },
    uploadFilesInStorage() {
      if (this.filesToUpload.length > 0) {
        console.log(typeof this.filesToUpload);
        console.log(this.filesToUpload);
        //var filesData = [];

        let result = this.uploadFiles(this.filesToUpload);
        console.log(result);
      } else {
        alert('Please select atleast one file to upload');
      }
    }
  }
};
</script>

<style>
.uploadFile {
  text-align: center;
  margin-top: 100px;
}
</style>
