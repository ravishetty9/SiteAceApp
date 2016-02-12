/*--------------Search Websites configuration-------*/
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

//These are the fields you want to check against.
var fields = ['title', 'description'];

WebsiteSearch = new SearchSource('Websites', fields, options);

Template.website_list.helpers({
  websites: function() {
    if(Session.get('isSearching')){
      return WebsiteSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, '<searchHighlightedText>$&</searchHighlightedText>')
      },
      sort: {upvotes: -1}
    });  
    }
    else{
      return Websites.find({},{sort:{upvotes: -1}});
    }
    
  },
  
  isLoading: function() {
    return WebsiteSearch.getStatus().loading;
  }
});

Template.website_list.onRendered(function() {
  WebsiteSearch.search('');
});
/*--------------End of Search Websites configuration-------*/

Template.searchTemplate.events({
	"keyup .js-search": _.throttle(function(e) {
    	var text = $(e.target).val().trim();

      //isSearching session variable is used to check if there should be any filter
      if(text==''){
        Session.set("isSearching",false);
      }
      else
      {
        Session.set("isSearching",true);
      }
    	WebsiteSearch.search(text);
  	}, 200)
});