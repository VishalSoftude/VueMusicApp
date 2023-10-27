import { defineStore } from 'pinia';
import { storage } from '../includes/firebase';

export default defineStore('upload', {
  actions: {
    uploadFiles(files) {
      console.log('files', files);
      //var uploadPromises = [];
      //const firebaseStore = storage().ref();
      for (const file of files) {
        console.log(file);
        console.log(file.name);
        const path = 'images/profiles/user123/avatar.jpg';
        const fileRef = storage.ref().child(path);
        fileRef
          .put(file)
          .then((snapshot) => {
            console.log('File uploaded successfully:', snapshot);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
          });
        //const fileRef = firebaseStore.child(file.name);
        // uploadPromises.push(
        //   fileRef.put(file).then((snapshot) => {
        //     return {
        //       name: snapshot.metadata.name,
        //       url: snapshot.metadata.fullPath
        //     };
        //   })
        // );
      }
      // var uploadedFiles = [];
      // for (const file of files) {
      //   console.log('file', file);
      //   console.log('file.name', file.name);
      //   const fileRef = firebaseStore.child(file.name);
      //   fileRef.put(file).then((snapshot) => {
      //     uploadedFiles.push({
      //       name: snapshot.metadata.name,
      //       url: snapshot.metadata.fullPath
      //     });
      //   });
      // }
      // const uploadedFiles = await Promise.all(uploadPromises);
      // return uploadedFiles;
    }
  }
});
