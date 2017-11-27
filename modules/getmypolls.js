var Poll = require('../frontend/src/models/poll');
var User = require('../frontend/src/models/user');

module.exports = function(user_id,callback) {
  	User.findOne({ '_id': user_id}, function(err,user) {
    	if (err) return callback(err);
    	if (!user) {
      		return callback("user doesn't exist")
    	}
    })
  	.then((user) => {
    	//return user's polls to frontend
	    var poll_ids = user.polls;
	    var polls = [];
	    var i = 0;
	    function findId(poll_id) {
	      	Poll.findOne({ '_id': poll_id }, function(err,poll) { 
	        polls.push(poll);
	        i++
	        if (i === poll_ids.length) {return callback(polls)}
	        else {findId(poll_ids[i])}
      	})
      }
      if (poll_ids.length > 0) {
      	findId(poll_ids[0])
      }
      else {
        return callback(polls)
      }
    })  
}