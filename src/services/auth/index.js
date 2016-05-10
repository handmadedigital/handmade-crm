// src/auth/index.js
import {router} from '../../main'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    var ref = new Firebase("https://hmd-crm.firebaseio.com/");
    var self = this;
    ref.authWithPassword({ 
      email    : creds.email,
      password : creds.password
    }, 
    function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {

        localStorage.setItem('id_token', authData.token)

        self.user.authenticated = true

        if(redirect) {
          router.go('/dashboard')  
        }
      }
    }, 
    {
      remember: "sessionOnly"
    });
  },

  signup(context, creds, redirect) {
    var ref = new Firebase("https://hmd-crm.firebaseio.com/");
    var self = this;
    ref.createUser({
      email    : creds.credentials.email,
      password : creds.credentials.password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {

        self.user.authenticated = true

        var usersRef = ref.child("users");
        usersRef.push({
          name: creds.name,
          company: creds.company,
          phone: creds.phone,
          uid: userData.uid,
          role: 'default'
        });
      }
    });
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var userInSession = localStorage.getItem('id_token')
    if(userInSession) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}