Template.comments_form.events({
	"submit .js-add-comments-form": function(event){
		var comment_text= event.target.comment_text.value;
		var website_id= event.target.website_id.value;

		if(Meteor.user()){
			var comments=Websites.findOne({_id:website_id}).comments;

			Websites.update(
				{_id:website_id},
				{$push:{comments:{ text: comment_text, commentedBy: Meteor.user().emails[0].address }}}
			);

			event.target.comment_text.value="";
		}		
	
		return false;
	}
});
