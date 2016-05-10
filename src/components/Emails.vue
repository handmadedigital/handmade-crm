<script>
import EmailsService from '../services/emails';

export default {
  name: "Emails",

  data: function() {
    return {
      emails: [],
      threads:[],
      activeUser: {
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
      },
      userIsSelected: false
    }
  },

  ready: function() {

    

    var threads = EmailsService.googleThreads(this).threads;
    this.$set('threads', threads);

    $('.emails-list-wrapper').resizable({
        handles: 'n,w,s,e',minWidth: 200,
        maxWidth: 600
    });

    var emailRaw = 'Hello Kind Sir';
    var res = /Kind/.exec(emailRaw);
    console.log(res);

  },

  methods: {
    showActiveUser: function(email) {
      var userEmail = email.from;
      var res = userEmail.substring(userEmail.lastIndexOf("<") + 1, userEmail.lastIndexOf(">"));

      this.activeUser = '';
      this.activeUser = email;
      this.userIsSelected = true;

    }
  }
}
</script>

<template>
  <div class="row">
    <div class="medium-12 columns">
      <div class="emails-wrapper">
        <div class="emails-menu-wrapper">
          <button class="create-new-email"><i class="fa fa-send"></i> Compose</button>
          <div class="emails-menu">
            <ul>
              <li class="menu-item active"><i class="fa fa-inbox"></i> Inbox</li>
              <li class="menu-item"><i class="fa fa-star"></i> Starred</li>
              <li class="menu-item"><i class="fa fa-sign-out"></i> Sent</li>
              <li class="menu-item"><i class="fa fa-circle"></i> Important</li>
              <li class="menu-item"><i class="fa fa-pencil-square-o"></i>Drafts</li>
              <li class="menu-item"><i class="fa fa-trash-o"></i> Trash</li>
            </ul>

            <ul class="labels">
              <h6>Labels</h6>
              <li class="menu-item"><i class="blue fa fa-circle"></i> Work</li>
              <li class="menu-item"><i class="red fa fa-circle"></i> Print</li>
              <li class="menu-item"><i class="purple fa fa-circle"></i> Follow Up</li>
              <li class="add-label-button">
                <input type="text" placeholder="add new label">
                <button>
                  <i class="fa fa-plus"></i>
                </button>
              </li>

            </ul>
          </div>
        </div>
        <div class="emails-list-wrapper">
          <div class="emails-search-wrapper">
            <div class="emails-search">
              <i class="fa fa-search"></i>
              <input type="text">
            </div>
          </div>

          <div id="emailsList" class="emails-list">
            <div v-for="email in emails | label 'UNREAD' " class="emails-info-wrapper">
              <div class="email-info" @click="showActiveUser(email)">
                <div class="email-avatar">
                  <img src="http://img.photo-forum.net/authors/tintirimintiri123_gxiq7833.gif" />
                </div>

                {{email | data 'text/html'}}
                <div class="email-header">
                  <div class="email-name">
                    {{email.from | from}}
                  </div>
                  <div class="date-time">
                    {{email.date | date}}
                  </div>
                </div>
                <div class="email-description">
                  <p>{{email.subject}}</p>
                  <em>{{email.snippet}}</em>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>

        </div>
        <div class="emails-info-area-wrapper">
          <div class="emails-info-area-header">

            <div class="header-text">
              Contact Info
            </div>
          </div>
          <div class="emails-info-area">
            <div v-if="!userIsSelected" class="get-started-box-wrapper">
              <div class="get-started-box">
                <i class="fa fa-user"></i>
                <div class="header-text">
                  Select Email Contact
                </div>
                <div class="description-text">
                  To see a Email Contact, select a one on the left in the list or use search box
                </div>
              </div>
            </div>
            <div v-if="activeUser" class="emails-info-box-wrapper">
              <div class="emails-body-box">
                <div>
                  <div class="email-info" @click="showActiveUser(email)">
                    <div class="email-avatar">
                      <img src="http://img.photo-forum.net/authors/tintirimintiri123_gxiq7833.gif" />
                    </div>


                    <div class="email-header">
                      <div class="email-name">
                        {{activeUser.from}}
                      </div>
                      <div class="date-time">
                        {{activeUser.date | date}}
                      </div>
                    </div>
                    <div class="email-description">
                      <p>{{activeUser.subject}}</p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div v-if="activeUser.body.html">
                    {{{activeUser.body.html | base64 activeUser}}}
                  </div>
                  <div v-if="!activeUser.body.html">
                    {{{activeUser.body.plain | base64 activeUser}}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>

    </div>
  </div>
</template>
