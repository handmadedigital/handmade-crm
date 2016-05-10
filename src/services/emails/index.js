export default {

  googleAuth(){
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '818327217697-6jha5gc2gnqj368219q9r3it4hj2tfpd.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

    var emails = [
    ];

    var emailsData = [
      {
        body: {
          html: '',
          plain: ''
        },
        from:'',
        to: '',
        date: '',
        subject: ''
      }
    ];

    console.log("whats up bitch");


    gapi.auth.authorize({

      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false

    }, function(authResult) {
      console.log(authResult);
      if (authResult && !authResult.error) {
        console.log(authResult);

        gapi.client.load('gmail', 'v1', function(){
          var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'format': 'full',
            'labelIds': 'INBOX'
          });

          request.execute(function(resp) {
            var labels = resp.messages;

            if (labels && labels.length > 0) {
              for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                var email = gapi.client.gmail.users.messages.get({
                  'userId': 'me',
                  'id': label.threadId,
                  'format': 'full'
                });

                email.execute(function(resp) {
                  var email = {
                    body: {
                      html: '',
                      plain: ''
                    },
                    labelIds: [],
                    attachments: [],
                    attData: [],
                    id: '',
                    threadId: '',
                    from:'',
                    to: '',
                    date: '',
                    subject: '',
                    snippet:''
                  }

                  email.snippet = resp.snippet;
                  email.id = resp.id;
                  email.threadId = resp.threadId;
                  email.labelIds.push(resp.labelIds);

                  console.log(resp);


                  for (var i = 0; i < resp.payload.headers.length; i++) {

                    var headerType = resp.payload.headers[i].name;
                    var headerData = resp.payload.headers[i].value;

                    if (headerType == 'Date') {
                      console.log('alternative plain ' + emailType);
                      email.date = headerData;
                    }

                    if (headerType == 'To') {
                      console.log('alternative plain ' + emailType);
                      email.to = headerData;
                    }

                    if (headerType == 'From') {
                      email.from = headerData;
                    }

                    if (headerType == 'Subject') {
                      email.subject = headerData;
                    }

                  }


                  if (resp.payload.mimeType == 'multipart/alternative'){
                    console.log('multipart/alternative ' + resp.payload.mimeType);

                    for (var i = 0; i < resp.payload.parts.length; i++) {

                      var emailType = resp.payload.parts[i].mimeType;
                      var emailBody = resp.payload.parts[i].body.data;

                      if (emailType == 'text/plain') {
                        console.log('alternative plain ' + emailType);
                        email.body.plain = emailBody;
                      } else if (emailType == 'text/html') {
                        console.log('alternative html ' + emailType);
                        email.body.html = emailBody;
                      }
                    }
                  };

                  if (resp.payload.mimeType == 'multipart/mixed'){

                    for (var i = 0; i < resp.payload.parts.length; i++) {
                      var mimeType = resp.payload.parts[i].mimeType;
                      var emailTypes = resp.payload.parts[i].parts;
                      var parts = resp.payload.parts[i];

                      console.log(parts.length);
                      if (mimeType == 'multipart/alternative') {
                        for (var i = 0; i < emailTypes.length; i++) {
                          var emailType = emailTypes[i].mimeType;
                          var emailBody = emailTypes[i].body.data;

                          if (emailType == 'text/plain') {
                            console.log('mixed plain ' + emailType);
                            email.body.plain = emailBody;

                          } else if (emailType == 'text/html') {
                            console.log('mixed html ' + emailType);
                            email.body.html = emailBody;
                          }
                        }
                      }
                    }
                  };

                  if (resp.payload.mimeType == 'multipart/related'){
                    console.log(resp.payload.parts.length);
                    for (var i = 0; i < resp.payload.parts.length; i++) {
                      var mimeType = resp.payload.parts[i].mimeType;
                      var emailTypes = resp.payload.parts[i].parts;
                      var parts = resp.payload.parts[i];
                      var fileData = '';
                      var fileName = resp.payload.parts[i].filename;
                      var attachmentId = resp.payload.parts[i].body.attachmentId;
                      var fileInfo = {
                        fileName: '',
                        id: '',
                        data: ''
                      };


                      if (mimeType == 'multipart/alternative') {
                        for (var n = 0; n < emailTypes.length; n++) {
                          var emailType = emailTypes[n].mimeType;
                          var emailBody = emailTypes[n].body.data;

                          if (emailType == 'text/plain') {
                            email.body.plain = emailBody;
                          } else if (emailType == 'text/html') {
                            email.body.html = emailBody;
                          }
                        }
                      }

                      if (fileName) {

                        fileInfo.id = attachmentId;
                        fileInfo.fileName = fileName;

                        var getAttachment = gapi.client.gmail.users.messages.attachments.get({
                          'id': resp.payload.parts[i].body.attachmentId,
                          'messageId': email.id,
                          'userId': 'me'
                        });

                        console.log('We got one Parts ID Outside ' + parts.filename);
                        getAttachment.execute(function(resp) {
                          var encodedSource = resp.data;

                          // Replace characters according to base64url specifications
                          encodedSource = encodedSource.replace(/\-/g, '+');
                          encodedSource = encodedSource.replace(/\_/g, '/');
                          encodedSource = encodedSource.replace(/\=/g, '');

                          console.log('here you go bud' + resp);

                          addAttachment(encodedSource, resp);
                        });

                        function addAttachment(encodedSource, resp) {
                            var attInfo = {
                              id: resp,
                              data: encodedSource
                            }

                            fileInfo.data = encodedSource;

                            pushData();

                            email.attData.push(resp);
                        }

                        function pushData() {

                          email.attachments.push(fileInfo);

                          fileInfo = {
                            fileName: '',
                            id: '',
                            data: ''
                          };
                        }

                      }

                    }
                  }

                  if (!resp.payload.parts){
                    console.log('We Got Body Bitches Text/Plain' + resp.payload.mimeType);
                    email.body.plain = resp.payload.body.data;
                  }

                  emails.push(email);
                });

              }
            } else {
              console.log('sorry bud');
            }
          });

        });

      } else {

        console.log('no');

      }

    });

    return {
      emails: emails
    }

  },

  googleThreads(){
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '818327217697-6jha5gc2gnqj368219q9r3it4hj2tfpd.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

    var threads = [
    ];


    gapi.auth.authorize({

      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false

    }, function(authResult) {
      console.log(authResult);
      if (authResult && !authResult.error) {
        console.log(authResult);

        gapi.client.load('gmail', 'v1', function(){
          var request = gapi.client.gmail.users.threads.list({
            'userId': 'me'
          });

          request.execute(function(resp) {
            var labels = resp.threads;


            if (labels && labels.length > 0) {
              for (var i = 0; i < labels.length; i++) {
                var label = labels[i];

                console.log(label);

                var email = gapi.client.gmail.users.threads.get({
                  'userId': 'me',
                  'id': label.id
                });

                email.execute(function(resp) {
                  var thread = {
                    messages: []
                  }

                  console.log(resp);


                  for (var i = 0; i < resp.messages.length; i++) {

                    var message = resp.messages[i];
                    thread.messages.push(message);

                  }

                  threads.push(thread);
                  console.log('threads baby');
                  console.log(thread);


                }, function(thread) {
                  threads.push(thread);
                });

              }
            } else {
              console.log('sorry bud');
            }
          });

        });

      } else {

        console.log('no');

      }

    });

    return {
      threads: threads
    }

  }


}
