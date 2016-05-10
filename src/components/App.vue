<script>
  import Navbar from './Navbar.vue'
  import Sidebar from './Sidebar.vue'
  import Content from './Content.vue'
  import AuthService from '../services/auth'

  export default {
    name: "App",

    data() {
      return {
        user: AuthService.user
      }
    },

    components: {
      Navbar,
      Sidebar,
      Content
    }
  }
</script>

<template>
  <navbar></navbar>
  <sidebar></sidebar>
  <content></content>
</template>
