var DateFormats = {
       short: "DD MMMM - YYYY",
       long: "dddd DD.MM.YYYY HH:mm"
};

// Use UI.registerHelper..
UI.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});

Meteor.methods({checkTwitter: function (userId) {
  check(userId, String);
  this.unblock();
  try {
    var result = HTTP.call("GET", "http://api.twitter.com/xyz",
                           {params: {user: userId}});
    return true;
  } catch (e) {
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
}});






