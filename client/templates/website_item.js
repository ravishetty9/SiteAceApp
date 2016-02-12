Template.website_item.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
	
		console.log("Up voting website with id "+website_id);
		
		//There should be a better way to do this. I need to sort websites based on up count.
		//So I am creating another column upVotesCount to keep track of the count of upVotesArray.
		Websites.update(
			{_id:website_id},
			{$addToSet:{upVotesArray: Meteor.user()._id}}
		);

		var upVotesCountArray=Websites.findOne({_id: website_id}).upVotesArray;
		var upVotesCount=0;

		if(upVotesCountArray!==undefined)
		{
			upVotesCount=upVotesCountArray.length;
		}

		console.log(upVotesCount);

		//This keeps track of the updated votes
		Websites.update(
			{_id:website_id},
			{$set:{upvotes:upVotesCount}});

		return false;// prevent the button from reloading the page
	}, 

	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);

		Websites.update(
			{_id:website_id},
			{$addToSet:{downVotesArray: Meteor.user()._id}}
		);

		return false;// prevent the button from reloading the page
	}
});

Template.website_item.helpers({
	upVoteCount: function(){
		var website_id = this._id;
		if(website_id){
			var upVotes=Websites.findOne({_id:website_id}).upVotesArray;
			if(upVotes===undefined)
				return 0;
			return upVotes.length;	
		}
	},
	downVoteCount: function(){
		var website_id = this._id;
		if(website_id){
			var downVotes=Websites.findOne({_id:website_id}).downVotesArray;
			if(downVotes==undefined)
				return 0;
			return downVotes.length;
		}
	}
});