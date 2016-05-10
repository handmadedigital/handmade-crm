export default {

  getQuote(ctx){
    // Here you would make a request to your server

    // return ctx.$http.get('http://yourserver.com/api', function (data, status, request) {
    //       return data;
    //   }).error(function (data, status, request) {
    //       return data;
    var baseURL = 'https://hmd-crm.firebaseio.com/';
    var ref = new Firebase(baseURL);
    var userInfo = [];

    ref.authWithOAuthPopup("google", function(error, authData, email) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData.google);
        console.log("Authenticated successfully with people:", email);
        var item = authData.google;
        userInfo.push(item);
      }
    }, {
      remember: "sessionOnly",
      scope: "email"
    }

    );


    return {
      userInfo: userInfo
    }
  }

}


