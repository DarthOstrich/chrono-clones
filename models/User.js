const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({});

// After all that stuff, don't forget to export it!
module.exports = mongoose.model('User', userSchema);