import scss from './app.scss'

import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';
import Base64 from 'base64url';

import App from './components/App.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Quote from './components/Quote.vue';
import Projects from './components/Projects.vue';
import Emails from './components/Emails.vue';
import Contacts from './components/Contacts.vue';
import Dashboard from './components/Dashboard.vue';
import AuthService from './services/auth';

// Install plugins
Vue.use(Router);
Vue.use(Resource);

// Set up a new router
var router = new Router();

// Check the users auth status when the app starts
AuthService.checkAuth();

Vue.filter('name', function (value, name) {
  return value.filter(function(item) {
    return item.name == name;

  });
});

Vue.filter('active', function (value) {
  return value.filter(function(item) {
    return item.id == active;
  });
});

Vue.filter('label', function (value, label) {
  console.log(value);
  var self = this;
  return value.filter(function(item) {
    console.log('item length');
    console.log(item.labelIds[0].length);

    var i;
    for (i = 0; i < item.labelIds[0].length; i++) {
      var labels = item.labelIds[0];

      console.log('loop in action');
      console.log(labels[i]);

      if (labels[i] == label) {
        console.log('UNREAD Baby');
        return labels[i] == label;
      }
    }

  });

});

Vue.filter('from', function (value) {

  var res = value.substring(0, value.indexOf('<'));
  res = res.replace(/\"/g, '');

  if(!res) {
    var res = value.substring(value.lastIndexOf("<")+1,value.lastIndexOf(">"));
  }

  if(!res) {
    var res = value;
  }

  if(res.length > 18) {
    var res = res.substring(0, 18)+"...";
  }

  var res = res.toLowerCase();

  return res;

});

Vue.filter('date', function (value) {

  var today = new Date().getTime();
  var date = new Date(value).getTime();

  var seconds = (today - date)/1000;

  console.log(seconds);

  if (seconds < 60) {
    var res = 'just now';
  }

  if (60 < seconds < 3600 ) {
    var minutes = Math.round((seconds)/60);
    var res = minutes + ' min ago';
  }

  if (3600 < seconds < 86400 ) {
    var minutes = Math.round((seconds)/60);
    var hours = Math.round((minutes)/60);
    var res = hours + ' hrs ago';
  }

  if (86400 < seconds) {
    var fullDate = new Date(value).toString().split(' ');
    var res = fullDate[1] + " " + fullDate[2];
  }

  return res;

});

Vue.filter('shorten', function (value) {

  var res = value.substring(0, 24)+"...";

  return res;

});



Vue.filter('base64', function (value, email) {
  // Decode the String
  var encodedSource = value;

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\-/g, '+');
  encodedSource = encodedSource.replace(/\_/g, '/');
  encodedSource = encodedSource.replace(/\=/g, '');

  var decodedSource = window.atob(encodedSource);


  decodedSource = decodedSource.replace(/\Ã±/g, '&#x00f1;');
  decodedSource = decodedSource.replace(/\Ã¡/g, '&#225;');
  decodedSource = decodedSource.replace(/\Ã³/g, '&#243;');

  decodedSource = decodedSource.replace(/\Â/g, '');
  decodedSource = decodedSource.replace(/\â/g, '');

//  <img border="0" width="122" height="68" id="Picture_x0020_1" src="cid:image001.png@01D185F4.CC822250" alt="Logo">
//  <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />


  // Replace grab between src='cid: and @
  // match with img name, if matched log file type return base64 link format ( "data:image/ + " IMAGE TYPE + ";base64," + encodedImg )
  for (var i = 0; i < email.attachments.length; i++) {
    var fileName = this.email.attachments[i].fileName;
    var fileId = this.email.attachments[i].id;
    var emailId = this.email.id;
    var bareName = fileName.substring(0, fileName.lastIndexOf("."));
    var fileData = this.email.attachments[i].data;
    var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
    var indexOfCid = decodedSource.indexOf('src="cid:' + bareName);
    var srcToReplace = decodedSource.slice(indexOfCid).split(" ");
    var base64ImgTag = 'src="data:image/' + fileType + ';base64, '+ fileData + '" ';
    var decodedSource = decodedSource.replace(srcToReplace[0], base64ImgTag);
    var self = this;

    console.log('Boom babby' + fileName + fileData );

    var test = {
      test2: function(encodedSource) {
        var fileName = self.email.attachments[i].fileName;
        var fileId = self.email.attachments[i].id;
        var emailId = self.email.id;
        var bareName = fileName.substring(0, fileName.lastIndexOf("."));
        var fileData = encodedSource;
        var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
        var indexOfCid = decodedSource.indexOf('src="cid:' + bareName);
        var srcToReplace = decodedSource.slice(indexOfCid).split(" ");
        var base64ImgTag = 'src="data:image/' + fileType + ';base64, '+ fileData + '"';
        var decodedSource = decodedSource.replace(srcToReplace[0], base64ImgTag);

        console.log('boom babby'+ fileName);
      }
    }
  }



  return decodedSource;

});

Vue.filter('mimeType', function (value, type) {


  return value.filter(function(item) {
    return item.mimeType == type;

  });

});

Vue.filter('data', function (value, type) {

});



// Route config
router.map({
  '/home':{
    name: 'home',
    component: Home
  },
  '/login':{
    name: 'login',
    component: Login
  },
  '/signup':{
    name: 'signup',
    component: Signup
  },
  '/quote':{
    name: 'quote',
    component: Quote
  },
  '/dashboard':{
    name: 'dashboard',
    component: Dashboard
  },
  '/contacts':{
    name: 'contacts',
    component: Contacts
  },
  '/emails':{
    name: 'emails',
    component: Emails
  },
  '/projects':{
    name: 'projects',
    component: Projects
  },
  '/emails':{
    name: 'emails',
    component: Emails
  }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
});

// If no route is matched redirect home
router.redirect({
  '*': '/home'
});

// Start up our app
router.start(App, '#app');
