console.log('running authController.js');
const passport = require('passport');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');

console.log('trying to run passport');
// Use passport to authenticate local option (email and password)
exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/episodes',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👍🏿');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next ) => {
  // check if user authenticated via passport
  if(req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops, you must be logged in to do that!');
  res.redirect('/login');
};