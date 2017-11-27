//Save new poll

var Poll = require('../frontend/src/models/poll');
var User = require('../frontend/src/models/user');

module.exports = function(username,poll,callback) {
  var newPoll = new Poll();
  newPoll.question = poll.question;
  newPoll.options = poll.options
  newPoll.votes = poll.votes
  console.log(newPoll.votes)
  newPoll.save(function(err, results){
    if (err) return callback(err);
    else {
      //add poll ID to user's db
      User.findOne({ 'username' :  username }, function(err, user) {
        if (err) return callback({
            success: false,
            message: err,
            id: null
          });
        if (!user) {
          return callback({
            success: false,
            message: "Something went wrong. Are you logged in?",
            id: null
          })
        }
        else {
          user.polls.push(results._id)
          user.save()
          return callback({
            success: true,
            message: "Poll has been saved",
            id: results._id
          })
        }
      })
    }
  })

}

