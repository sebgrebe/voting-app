var mongoose = require('mongoose');
var Poll = require('../frontend/src/models/poll');
var request = require('request')
var User = require('../frontend/src/models/user');
var getMyPolls = require('../modules/getmypolls');
var getAllPolls = require('../modules/getallpolls');
var createPoll = require('../modules/createpoll');
var deletePoll = require('../modules/deletepoll');
var getPoll = require('../modules/getpoll');
var vote = require('../modules/vote');
var checkVote = require('../modules/checkvote');

module.exports = function(app,passport) {

//CHECK AUTHENTICATED
app.get('/api/authenticated', function(req,res,next){
  if (req.isAuthenticated()) {
    res.send({'authenticated': true})
  }
  else {
    res.send({"authenticated": false})
  }
})

//LOGIN
app.post('/api/login',function(req,res,next){
	 passport.authenticate('login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting login
    if (! user) {
      return res.send({ success : false, message : 'login failed' });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.send({ success : true, message : 'login worked', user: user});
    });
  })(req, res, next);
})

//SIGNUP
app.post('/api/signup', function(req, res, next) {
  passport.authenticate('signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    //Username is taken
    if (!user) {
      return res.send({ success : false, message : 'Username is already taken' });
    }
    //Successful signup
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({ success : true, message : 'Signup succeeded' });
    });
  })(req, res, next);
});

//GET SPECIFIC POLL
app.get('/api/polls?', function(req, res) {
  var poll_id = req.query.poll_id
  getPoll(poll_id,function(poll){
    console.log("poll: "+poll)
    res.send(poll)
  })
});

//GET POLLS
app.get('/api/poll-list',function(req,res){
  if (req.query.poll_owner === "user") {
    getMyPolls(req.user._id,function(polls) {
      res.send(polls)  
    })
  }
  else if (req.query.poll_owner === 'all') {
    getAllPolls(function(polls) {
      res.send(polls)
    })
  }  
})

//CREATE POLL
app.post('/api/poll-create',function(req,res){
  var username = req.user.username;
  var poll = req.body;
  createPoll(username,poll,function(response) {
    res.send(response)
  })
  
})

//DELETE POLL
app.post('/api/poll-delete',function(req,res){
  var poll_id = req.body.poll_id;
  var user_id = req.user._id;
  deletePoll(poll_id,user_id,function(response) {
    res.send(response)
  })
  
})

//VOTE
app.post('/api/poll-vote',function(req,res){
  var poll = req.body;
  var user_id = (req.user === undefined) ? req.sessionID : req.user._id.toString();
  console.log(req.user)
  vote(poll,user_id,function(response) {
    res.send(response)
  })
  
})

//CHECK WHETHER USER HAS VOTED
app.get('/api/check-vote',function(req,res){
  var poll_id = req.query.poll_id;
  var user_id = (req.user === undefined) ? req.sessionID : req.user._id.toString();
  checkVote(poll_id,user_id,function(response){
    res.send(response)
  })
})

//LOGOUT
app.get('/api/logout', function(req, res) {
    req.logout();
    res.send({message: 'logged out'});
});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
