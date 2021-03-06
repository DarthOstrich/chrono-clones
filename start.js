console.log('loading start.js');
// console.log(process.versions);


// require('./db-connection');
const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections

// Updated version of mongoose connect as of 4.11.0 
// Using `mongoose.connect`...
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import models
console.log('importing models');
require('./models/User');
require('./models/Progress');

// Start our app!
console.log('running the app');
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}. Check it out: http://localhost:${server.address().port}`);
});

