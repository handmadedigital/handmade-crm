export default {
  getClients(ctx){
    var baseURL = 'https://hmd-crm.firebaseio.com/';
    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

    var projects = new Firebase(baseURL + 'clients');

    var clients = [];

    projects.on('child_added', function (snapshot) {
      var item = snapshot.val();
      item.id = snapshot.key();
      clients.push(item);
    });

    return {
      clients: clients
    }

  }

}


