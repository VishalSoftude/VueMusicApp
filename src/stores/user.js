import { defineStore } from 'pinia';
import { auth, usersCollection } from '../includes/firebase';
export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    authToken: ''
  }),
  actions: {
    async register(formValues) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      );
      await usersCollection.doc(userCredentials.user.uid).set({
        name: formValues.name,
        email: formValues.email,
        country: formValues.country,
        age: formValues.age
      });

      await userCredentials.user.updateProfile({
        displayName: formValues.name
      });
      this.userLoggedIn = true;
    },
    async authenticate(loginFormValues) {
      await auth.signInWithEmailAndPassword(loginFormValues.email, loginFormValues.password);
      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();
      this.userLoggedIn = false;
    },
    setAuthToken(token) {
      this.authToken = token;
    }
  }
});
