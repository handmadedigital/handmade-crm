<script>
  import AuthService from '../services/auth'
  import Calls from './Calls.vue'

  export default {
    name: "Dashboard",

    components: {
      Calls
    },


    route: {
      // Check the users auth status before
      // allowing navigation to the route
      canActivate() {
        return AuthService.user.authenticated
      }
    }

  }
</script>

<template>
  <div class="row">
    <div class="medium-12 columns">
      <h2>Dashboard</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>

    <calls></calls>
  </div>
</template>
