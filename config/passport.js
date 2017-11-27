var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var User = require('../frontend/src/models/user');

// export this function
module.exports = function(passport) {

    // passport session setup: required for persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //SIGNUP
    passport.use('signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, callback) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return callback(err);

            // check to see if theres already a user with that username
            if (user) {
                return callback(null, false);
            } else {

                // if there is no user with that username create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return callback(null, newUser);
                });
            }
        })
    });
    }));

    //LOGIN
    passport.use('login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

        User.findOne({ 'username' :  username }, function(err, user) {
            if (err)
                return done(err);

            // no user found
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // username exists, but password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // login worked
            return done(null, user);
        });

    }));
}
