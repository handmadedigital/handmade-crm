<script>
import AuthService from '../services/auth'

  export default {
    name: "Login",

    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {
      submit() {
        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        AuthService.login(this, credentials, '/dashboard')

        this.credentials.email = ''
        this.credentials.password = ''
      }
    }
  }

</script>

<template>
  <div class="small-4 small-centered column">
    <h2>Log In</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">Login</button>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  .quote-wrapper{
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.14);
    padding: 2em;
    border: solid 1px $grey2;
    margin-top: 1em;
  }

</style>
