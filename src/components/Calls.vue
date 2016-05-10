<script>
import CallsService from '../services/calls'

  export default {
    name: "Calls",

    data() {
		return {
			callsData:{
				calls:[],
				page:'',
				total_entries: '',
				total_pages: '',
				pages: [],
				per_page: '',
				next_page:'',
				previous_page:''
			},
			audioLink: ''

		}
	},

    ready: function() {

    	var callsData  = CallsService.getCalls('60724',1).callsData
		this.$set('callsData', callsData);


    },

    methods: {
      nextPage() {
      	var currentPage = this.callsData.page;
      	var totalPages = this.callsData.total_pages;
      	var nextPage = (currentPage + 1);

      	if (currentPage < totalPages) {
      		var callsData  = CallsService.getCalls('60724',nextPage).callsData
			this.$set('callsData', callsData);

      	} else {

      	}


      },
      prevPage() {
      	var currentPage = this.callsData.page;
      	var prevPage = (currentPage - 1);

      	if (prevPage > 0) {
      		var callsData  = CallsService.getCalls('60724',prevPage).callsData
			this.$set('callsData', callsData);
      	} else {

      	}


      },
      selectedPage(page) {
      	var thisPage = (page.id)
      	var pages = this.callsData.pages;

		for (let value of pages) {
		  value.active = false
		}
		var callsData  = CallsService.getCalls('60724',thisPage).callsData
		this.$set('callsData', callsData);
      }
    }
  }
</script>

<template>

	<div class="medium-12 columns">
		<table class="hover">
			<thead>
				<tr>
					<th>Name/Location</th>
					<th>Caller</th>
					<th>Duration</th>
					<th>Audio</th>
					<th>Time</th>
				</tr>
			</thead>
			<tbody v-for="call in callsData.calls">
				<tr>
					<td>{{ call.name }}</td>
					<td>{{ call.caller_number }}</td>
					<td>{{ call.duration }}</td>
					<td>
						<audio v-if="call.audio" controls>
							<source v-bind:src="call.audio" type="audio/mpeg">
							Your browser does not support the audio element.
						</audio>

						<p v-if="!call.audio"> Recording too short to display </p>
					</td>
					<td>{{ call.called_at }}</td>
				</tr>
			</tbody>
		</table>

		<ul class="pagination text-center" role="navigation" aria-label="Pagination">
			<li class="pagination-previous disabled">Previous</li>
			<li v-for="page in callsData.pages" >
				<a v-on:click.prevent="selectedPage(page)" :class="{'current': page.active}" aria-label="Page {{ page.id }}"> {{ page.id }} </a>

			</li>
			<li class="pagination-next"><a v-on:Click="nextPage()" aria-label="Next page">Next</a></li>
		</ul>
	</div>

	<div v-for="n in callsData.total_pages">{{ n }}</div>

</template>
