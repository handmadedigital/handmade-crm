<script>
import AuthService from '../services/auth'

  export default {
    name: "Navbar",

    data() {
      return {
        user: AuthService.user
      }
    },
    methods: {
      logout() {
        AuthService.logout()
      }
    }
  }

</script>

<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li v-link="{name: 'home'}" class="menu-text logo">Handmade Digital</li>
        <li><i class="fa fa-bars"></i></li>
        <li><i class="fa fa-search"></i></li>
        <li><a v-link="{name: 'dashboard'}" v-if="user.authenticated">Dashboard</a></li>
      </ul>
    </div>
    <div class="top-bar-right">
      <ul class="menu">
        <li><i class="fa fa-bell"></i></li>
        <li><a v-link="{name: 'login'}" v-if="!user.authenticated"><i class="fa fa-power-off"></i> Log In</a></li>
        <li><a v-link="{name: 'signup'}" v-if="!user.authenticated">Sign Up</a></li>
        <li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Logout</a></li>
      </ul>
    </div>
  </div>
</template>
