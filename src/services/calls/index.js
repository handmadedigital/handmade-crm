export default {

	getCalls(accountId, pageNumber) {

		
		var self = this;
		var authToken = '';
		var callsData = {
          	calls:[],
			page:'',
			total_entries: '',
			total_pages: '',
			pages: [],
			per_page: '',
			next_page:'',
			previous_page:''
        };     

		$.post("https://api.calltrackingmetrics.com/api/v1/authentication", {  
		  	"token":"a60724d5714e4cd6b5cafe37177ff53f7daa0d1",
		  	"secret":"83acc7ad257332586d2918a1a90b2ca35630" 
		},
		function( data ) {

			var authToken = data.token;

			$.get("https://api.calltrackingmetrics.com/api/v1/accounts/"+accountId+"/calls.json?auth_token="+authToken+"&page="+pageNumber, {  

			},
		    function(response) {

		    	var totalCalls = response.calls.length;

		    	callsData.page = response.page
				callsData.total_entries = response.total_entries
				callsData.total_pages = response.total_pages
				callsData.per_page = response.per_page
				callsData.next_page = response.next_page
				callsData.previous_page = response.previous_page

	            for ( var i = 0; i < response.calls.length; i++ ) {
				  // Do something with a[i]
				  callsData.calls.push(response.calls[i])
				}
				
				for ( var i = 1; i <= response.total_pages; i++ ) {

					if (response.page === i) {
						callsData.pages.push(
					  	{
							id: i,
							active: true
						})
					} else {
						callsData.pages.push(
					  	{
							id: i,
							active: false
						})
					}
				  	
				}

			},"JSON");

		},"JSON");

		console.log('authToken:'+authToken);

		

		

		return {
	    	callsData: callsData
	    }
    
	}

}

