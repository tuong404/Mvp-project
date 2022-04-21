const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user.model')

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

passport.use('local.signin' ,new LocalStrategy({
    username: 'username',
    password: 'password',
},function(req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, {message: 'User not found'}); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
      var newUser = new User()
      newUser.username = username;
      newUser.password = password;
    });
  }
));