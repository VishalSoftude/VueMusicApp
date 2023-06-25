import {defineStore} from 'pinia'
import {auth,usersCollection} from '../includes/firebase'
export default defineStore("user",{
    state:()=>({
      userLoggedIn:false  
    }),
    actions:{
        async register(formValues){
            await auth.createUserWithEmailAndPassword(
                formValues.email,formValues.password
              )  
            await usersCollection.add({
                name:formValues.name,
                email:formValues.email,
                country:formValues.country,
                age:formValues.age
              })
            this.userLoggedIn = true;
        }
    }
})