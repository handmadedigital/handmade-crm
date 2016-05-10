<script>
  import QuoteService from '../services/quote'
  import ClientsService from '../services/clients'

  export default {
    name: "Quote",

    data: function(){
      return {
        userInfo: [],
        clients: [],
        newClient: {
            name: '',
            company: '',
            phone: '',
            email: '',
            isExpanded: false
        },
        clientFormShowing: false,
        userIsLoggedIn: false
      }
    },

    ready: function() {

      var clients  = ClientsService.getClients(this).clients
      this.$set('clients', clients);
      console.log( ClientsService.getClients(this).clients);
      
    },

    methods: {

      userLogin: function() {
        var userInfo  = QuoteService.getQuote(this).userInfo
        this.$set('userInfo', userInfo);
        console.log(userInfo.id);
        

      },
      createUser: function() {
        var ref = new Firebase("https://hmd-crm.firebaseio.com/");
        ref.createUser({
          email    : "bobto2ny@firebase.com",
          password : "correcthorsebatterystaple",
          name : "John Doe"
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });
      },
      loginUser: function() {
        var ref = new Firebase("https://hmd-crm.firebaseio.com/");
        ref.authWithPassword({
          email    : "bobtony@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            localStorage.setItem('id_token', authData.id_token)
          }
        });
      }

    }
  }
</script>

<template>
  <div class="row">
    <div class="quote-wrapper">
      <h2>Random Quote</h2>
      <p>
        <div class="list-group">
          <div v-for="client in clients">
              <div class="list-group-item">
                  <div class="row-picture">
                      <i class="material-icons company-icon">{{ client.company | firstLetter}}</i>
                  </div>
                  <div class="row-content">
                      <h4 class="list-group-item-heading">{{ client.company }} - <em>{{ client.name }}</em></h4>
                      <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus.</p>
                  </div>
              </div>
              <div class="list-group-separator"></div>
          </div>
        </div>
      </p>
    </div>
    <button @click="userLogin">Login With Google</button>
    <button @click="createUser">Sign Up</button>
    <button @click="loginUser">Log In</button>

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
