Template.website_form.events({
	
	"click .js-toggle-website-form":function(event){
		// var searchUrl="https://moz.com/learn/seo/meta-description";
		var searchUrl= $('.websiteURL').val();
		$('#title').val('');
   		$('#description').val('');
      	$('#url').val(searchUrl);
      	console.log(searchUrl);

		if(searchUrl!==""){
			var titleDescription=Meteor.call('callSite',searchUrl, function(error, result){
   			if(error){
      			//do nothing
   			}
   			else{
      			$('#title').val(result.title);
      			$('#description').val(result.description);
      		}

      		$("#add_website_form").modal('show');	
   		});	
		}

		$("#add_website_form").modal('show');	
   		
	}, 

	"submit .js-add-website":function(event){

		// here is an example of how to get the url out of the form:
		//  put your website saving code in here!	
		var website_url, website_title, website_description;

	    website_url = event.target.url.value;
	    website_title = event.target.title.value;
	    website_description = event.target.description.value;

		
	    if (Meteor.user()){
	      Websites.insert({
	        url:website_url, 
	        title:website_title, 
	        description:website_description,
	        createdOn:new Date(),
	        upvotes:0,
	        downvotes:0,
	        createdBy:Meteor.user()._id
	      });
	  	}

	  	$('.websiteURL').val('');
	    $("#add_website_form").modal('hide');
	    
	    Session.set("isSearching",false);

		return false;// stop the form submit from reloading the page

	}
});
