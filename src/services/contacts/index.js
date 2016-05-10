export default {

  createContact(context, newContact){
    // Here you would make a request to your server

    // return ctx.$http.get('http://yourserver.com/api', function (data, status, request) {
    //       return data;
    //   }).error(function (data, status, request) {
    //       return data;
    var baseURL = 'https://hmd-crm.firebaseio.com/';
    var ref = new Firebase(baseURL);
    var contactsRef = ref.child("contacts");
    
    contactsRef.push({
        name: newContact.name,
        company: newContact.company,
        phone: newContact.phone,
        email: newContact.email,
        isExpanded: false
    });

  },
  getContacts(){
    // Here you would make a request to your server

    // return ctx.$http.get('http://yourserver.com/api', function (data, status, request) {
    //       return data;
    //   }).error(function (data, status, request) {
    //       return data;
    var baseURL = 'https://hmd-crm.firebaseio.com/';
    var ref = new Firebase(baseURL);
    var allContacts = new Firebase(baseURL+'contacts');
    var contacts = [];
    

    // Attach an asynchronous callback to read the data at our posts reference
    allContacts.on("child_added", function(snapshot) {
      var item = snapshot.val();
      item.id = snapshot.key();
      contacts.push(item);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


    return {
      contacts: contacts
    }
  }

}


