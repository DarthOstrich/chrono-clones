const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// const md5 = require('md5');
const validator = require('validator');
const mongoddbErrorHandler = require('mongoose-mongodb-errors'); // gives better errors for MongoDB
const passportLocalMongoose = require('passport-local-mongoose');

// Setup the schema for the User. 
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an e-mail address'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date 
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongoddbErrorHandler); // converts from ugly errors to user-friendly errors

// After all that stuff, don't forget to export it!
module.exports = mongoose.model('User', userSchema);