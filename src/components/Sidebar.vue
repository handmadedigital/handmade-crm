<script>
import AuthService from '../services/auth'

  export default {
    name: "Sidebar",

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
  <div class="sidebar-wrapper">
    <ul class="vertical dropdown menu">
      <li><a v-link="{name: 'dashboard'}" v-if="user.authenticated">Calls</a></li>
      <li><a v-link="{name: 'contacts'}" v-if="user.authenticated">Contacts</a></li>
      <li><a v-link="{name: 'emails'}" v-if="user.authenticated">Emails</a></li>
      <li><a href="left_item_2">Left item 2</a></li>
      <li><a href="left_item_3">Left item 3</a></li>

    </ul>
  </div>
</template>
