var Poll = require('../frontend/src/models/poll');

module.exports = function(poll_id,callback) {
	Poll.findOne({ '_id': poll_id}, function(err,poll) {
    	if (err) return callback(err);
    	if (!poll) {
      		return callback({
            success: false,
            message: "Poll not found",
            poll: null 
          })
    	}
      else {
        //return poll to frontend
        return callback({
            success: true,
            message: "Poll found",
            poll: poll
          })  
      }
    })
}