var Poll = require('../frontend/src/models/poll');

module.exports = function(poll_id,user_id,callback) {
	Poll.findOne({ '_id': poll_id}, function(err,poll) {
    	if (err) return callback(err);
    	if (!poll) {
      		return callback("Poll not found")
    	}
    })
  	.then((poll) => {
      var voters = poll.voters
      for (var i=0;i<voters.length;i++) {
        if (voters[i] == user_id) {
          console.log("has voted")
          return callback({voted: true})
        }
      }
      return callback({voted: false})  
	   })  
}