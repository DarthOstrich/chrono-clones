const mongoose = require('mongoose');
const User = mongoose.model('User');
const Progress = mongoose.model('Progress');
const promisify = require('es6-promisify');
// const progress = require('../data/sample-watched.json'); // starting data

exports.loginForm = (req, res) => {
  res.render('login');
}

exports.registerForm = (req, res) => {
  res.render('register');
};

exports.validateRegister = (req, res, next) => {
  // sanitize the user input
  // req.sanitizeBody('name');
  // req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if(errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop fn from running
  }
  next(); // there were no errors
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const userProgress = new Progress({ userID: user._id });
  // console.log(userProgress);
  
  // register method comes from passportLocalMongoose, this is wrapped within a promisify because the register method is old and requires a callback
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  // insert a new progress list
  await Progress.create({ userID: user._id });
  next(); // pass to AuthController.login
}