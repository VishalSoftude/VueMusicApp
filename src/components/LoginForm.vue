<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p-4 rounder mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form @submit="login" :validation-schema="loginSchema">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
        name="email"
        v-model="email_Field"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        name="password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <a @click="forgotPassword" class="text-blue-600 cursor-pointer mt-2 mb-2 block"
      >Forgot Password?</a
    >
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="login_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia';
import useUserStore from '../stores/user';
export default {
  name: 'LoginForm',
  inject: ['messageService'],
  data() {
    return {
      loginSchema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100'
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! we are loggin you in.',
      email_Field: ''
    };
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate', 'sendPasswordResetEmail']),
    async login(loginFormValues) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! we are loggin you in.';

      try {
        await this.authenticate(loginFormValues);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Invalid Login Details..';
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Success! You are logged in';
      window.location.reload();
      console.log(loginFormValues);
    },
    async forgotPassword() {
      if (this.email_Field != '') {
        this.login_show_alert = true;
        this.login_alert_variant = 'bg-blue-500';
        this.login_alert_msg = 'Please wait! Sending password reset email...';

        try {
          await this.sendPasswordResetEmail(this.email_Field); // Call the new action
          this.login_alert_variant = 'bg-green-500';
          this.login_alert_msg = 'Password reset email sent. Check your inbox.';
        } catch (error) {
          this.login_alert_variant = 'bg-red-500';
          this.login_alert_msg = 'Error sending password reset email.';
          console.error(error);
        }
      } else {
        this.login_show_alert = true;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Please Enter Email';
        setTimeout(() => {
          this.login_show_alert = false;
        }, 2000);
      }
    }
  },
  created() {
    console.log(this.messageService.getMessage());
  }
};
</script>
