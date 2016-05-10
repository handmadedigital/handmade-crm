<script>
import AuthService from '../services/auth'

  export default {
    name: "Signup",

    data() {
      return {
        userInfo: {
          name: '',
          company: '',
          phone: '',
          role: '',
          credentials: {
            email: '',
            password: ''
          }
        },
        error: ''
      }
    },

    methods: {
      submit() {
        var userInfo = {
          name: this.userInfo.name,
          company: this.userInfo.company,
          phone: this.userInfo.phone,
          credentials: {
            email: this.userInfo.credentials.email,
            password: this.userInfo.credentials.password
          }
          
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        AuthService.signup(this, userInfo)

        this.userInfo.credentials.email = ''
        this.userInfo.credentials.password = ''
        this.userInfo.name = ''
        this.userInfo.phone = ''
        this.userInfo.company = ''
        
      }
    }
  }

</script>

<template>
  <div class="small-4 small-centered column">
    <h2>Sign Up</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter your name"
        v-model="userInfo.name"
      >
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your company name"
        v-model="userInfo.company"
      >
    </div>
    <div class="form-group">
      <input
        type="tel"
        class="form-control"
        placeholder="Enter your phone number"
        v-model="userInfo.phone"
      >
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Enter your email"
        v-model="userInfo.credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="userInfo.credentials.password"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">Sign Up</button>
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
