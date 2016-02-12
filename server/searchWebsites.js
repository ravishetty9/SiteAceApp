SearchSource.defineSource('Websites', function(searchText, options) {
  var options = {sort: {upvotes: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or:[{title: regExp}, {description: regExp}]};
    return Websites.find(selector, options).fetch();
  } else {
    return Websites.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}

Meteor.methods({callSite: function (url) {
  check(url, String);
  try {
    var result = HTTP.call("GET", url);                           
    var content= result.content;
    var description="";
    var title="";

    //Find the title
    var titleMeta="<title>";
    var titleStartIndex=content.search(titleMeta);
    if(titleStartIndex!==-1){
      var titleEndIndex=content.search('</title>');
      title= content.substring(titleStartIndex+titleMeta.length, titleEndIndex);
      console.log(title);  
    }
    //Find the description
    var descriptionMeta='<meta name="description" content="';
    var descStartIndex=content.search(descriptionMeta);
    
    if(descStartIndex!==-1){
      // var descEndIndex=content.search('"/>');
      var descriptionTillEndString= content.substring(descStartIndex+descriptionMeta.length);
      var descriptionTillEndStringSplit=descriptionTillEndString.split("\">");
      description=descriptionTillEndStringSplit[0];  
      console.log(description);  
    }

    return {title: title, description: description};
  } catch (e) {
    console.log(e);
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
}});