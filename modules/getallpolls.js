var Poll = require('../frontend/src/models/poll');

module.exports = function(callback) {
  	Poll.find({}, function(err,polls) {
    	if (err) return callback(err);
    	if (polls) {
        return callback(polls)
      }
    })
  }
