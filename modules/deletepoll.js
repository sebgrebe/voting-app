//Save new poll

var Poll = require('../frontend/src/models/poll');
var User = require('../frontend/src/models/user');

module.exports = function(poll_id,user_id,callback) {
  Poll.remove({ '_id' : poll_id }, function(err) {
        if (err) {
          return callback({
            success: false,
            message: err,
          });
        }
        else {
          User.findOne({ '_id': user_id}, function(err,user){
            if (err) return callback({
              success: false,
              message: err,
            });
            else if (!user) return callback({
              success: false,
              message: "Something went wrong.",
            })
            else {
              user.polls.splice(user.polls.indexOf(poll_id),1)
              user.save()
              return callback({
                success: true,
                message: "Poll has been removed"
              })
            }
          })
        }
      })
}

