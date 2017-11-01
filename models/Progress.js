const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// const md5 = require('md5');
const validator = require('validator');
const mongoddbErrorHandler = require('mongoose-mongodb-errors'); // gives better errors for MongoDB
// const passportLocalMongoose = require('passport-local-mongoose');
const progress = require('../data/sample-watched.json'); // starting data

// Setup the schema for the User. 
const progressSchema = new Schema({
  userID : {
    type: Schema.Types.ObjectId
  },
  progress: {
    type: Schema.Types.Mixed,
    default: 
      progress
  }
});

// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
progressSchema.plugin(mongoddbErrorHandler); // converts from ugly errors to user-friendly errors

// After all that stuff, don't forget to export it!
module.exports = mongoose.model('Progress', progressSchema);