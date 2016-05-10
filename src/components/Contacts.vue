<script>
  import ContactsService from '../services/contacts'

  export default {
    name: "Contacts",

    data: function(){
      return {
        contacts: [],
        newContact: {
            name: '',
            company: '',
            phone: '',
            email: '',
            isExpanded: false
        },
        activeContact: {
        	name: '',
            company: '',
            phone: '',
            email: ''
        },
        showNewContactForm: false,
        showContactInfo: false,
        showSelectUser: true
      }
    },

    ready: function() {

		var contacts  = ContactsService.getContacts(this).contacts
		this.$set('contacts', contacts);

    },

    methods: {

	    createContact: function() {

	        var newContact = {
	          	name: this.newContact.name,
	          	company: this.newContact.company,
	          	phone: this.newContact.phone,
	          	email: this.newContact.email
	          
	        }
	        // We need to pass the component's this context
	        // to properly make use of http in the auth service
	        ContactsService.createContact(this, newContact)


	        this.newContact.email = ''
	        this.newContact.name = ''
	        this.newContact.phone = ''
	        this.newContact.company = ''

		},
		showUserInfo: function(contact) {

					
	        console.log(contact.name);
	        

	        this.activeContact.email = contact.email
	        this.activeContact.name = contact.name
	        this.activeContact.phone = contact.phone
	        this.activeContact.company = contact.company
	        this.showSelectUser = false
			this.showNewContactForm = false
	        this.showContactInfo = true
		},
		showForm: function() {
			this.showContactInfo = false
			this.showSelectUser = false
			this.showNewContactForm = true
		}	   
    }
  }
</script>

<template>
    <div class="row">
		<div class="medium-12 columns">
			<div class="contacts-wrapper">
				<div class="contacts-list-wrapper">
					<div class="contacts-search-wrapper">
						<div class="contacts-search">
							<i class="fa fa-search"></i>
							<input type="text">
						</div>
					</div>
					<div class="contacts-list">
						<div v-for="contact in contacts" class="contact-info-wrapper">
							<div  class="contact-info"  @click="showUserInfo(contact)">
								<div class="contact-avatar">
									<img src="http://img.photo-forum.net/authors/tintirimintiri123_gxiq7833.gif" />
								</div>
								<div class="contact-header">
									<div class="contact-name"> {{contact.name}}</div>
									<div class="date-time">12-24</div>  
								</div>
								<div class="contact-description">
									{{contact.phone}}
								</div>
								<div class="clearfix"></div>
							</div>
						</div>
					</div>
					<div class="add-contact-button">
						<button @click="showForm"><i class="fa fa-user-plus fa-circle"></i></button>
					</div>
					
				</div>
				<div class="contact-info-area-wrapper">
					<div class="contact-info-area-header">
						
						<div class="header-text">
							Contact Info
						</div>
					</div>
					<div class="contact-info-area">
						<div v-if="showSelectUser " class="get-started-box-wrapper">
							<div class="get-started-box">
								<i class="fa fa-user"></i>
								<div class="header-text">
									Select Contact
								</div>
								<div class="description-text">
									To see a contact, select a one on the left in the list or use search box
								</div>
							</div>
						</div>
						<div v-if="showContactInfo" class="contact-info-box-wrapper">
							<div class="contact-info-box">
								<i class="fa fa-user"></i>
								<div class="header-text">
									{{activeContact.name}}
								</div>
								<div class="description-text">
									To see a contact, select a one on the left in the list or use search box
								</div>
							</div>
						</div>
						<div v-if="showNewContactForm" class="create-contact-box-wrapper">
							<div class="create-contact-box">
								<div class="create-contact-form">
									<i class="fa fa-user-plus"></i>
									<div class="header-text">
										New Contact
									</div>
									<div class="description-text">
										To add a contact, fill out form below and click submit
									</div>
									<div class="alert alert-danger" v-if="error">
								      <p>{{ error }}</p>
								    </div>
								    <div class="form-group">
								      <input 
								        type="text" 
								        class="form-control"
								        placeholder="Enter your name"
								        v-model="newContact.name"
								      >
								    </div>
								    <div class="form-group">
								      <input
								        type="text"
								        class="form-control"
								        placeholder="Enter your company name"
								        v-model="newContact.company"
								      >
								    </div>
								    <div class="form-group">
								      <input
								        type="tel"
								        class="form-control"
								        placeholder="Enter your phone number"
								        v-model="newContact.phone"
								      >
								    </div>
								    <div class="form-group">
								      <input 
								        type="text" 
								        class="form-control"
								        placeholder="Enter your email"
								        v-model="newContact.email"
								      >
								    </div>
								    <button class="btn btn-primary" @click="createContact">Create Contact</button>
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
