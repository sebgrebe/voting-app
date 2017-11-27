//Save new poll

var Poll = require('../frontend/src/models/poll');
var checkVote = require('./checkvote')

module.exports = function(poll,user_id,callback) {
  var poll_id = poll.id
  Poll.findOne({ '_id': poll_id}, function(err,poll_db) {
    if (err) return callback({
      success: false,
      message: err+" Your vote was not saved."
    });
    if (!poll_db) {
      return callback({
        success: false,
        message: "Something went wrong, your vote was not saved."
      })
    }
    else {
      checkVote(poll_id,user_id,function(response){
        if (response.voted) {
          return callback({
            success: false,
            message: "You have already voted. You cannot vote twice."
          })  
        }
        else {
          poll_db.options = poll.options;
          poll_db.votes = poll.votes;
          poll_db.voters.push(user_id);
          poll_db.save();
          return callback({
            success: true,
            message: "Thanks, your vote has been saved."
          })
        }
      })
    }
  })
}

