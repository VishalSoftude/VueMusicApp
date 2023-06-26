import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDpSj5wtlMYqjxIxv2VJFrs38DKteEy9YA',
  authDomain: 'musicapp-3d9c5.firebaseapp.com',
  projectId: 'musicapp-3d9c5',
  storageBucket: 'musicapp-3d9c5.appspot.com',
  //messagingSenderId: '92101047963',
  appId: '1:92101047963:web:399028e1a5324104c4f83e'
}

export default firebase.initializeApp(firebaseConfig)
