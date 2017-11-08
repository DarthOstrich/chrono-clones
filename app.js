console.log('running app.js');
const express = require('express'); // Node framework
const path = require('path'); // The path module provides utilities for working with file and directory paths. It's part of Node proper.
const session = require('express-session');
const passport = require('passport'); // used for authentication
const mongoose = require('mongoose'); //handles mongoDB stuff
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash'); // allows flash messages
const morgan = require('morgan'); // renders requests to the server
const cookieParser = require('cookie-parser');
const promisify = require('es6-promisify');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers'); // handles all our errors
const helmet = require('helmet'); // best practice security protocals 
const routes = require('./routes/routes.js'); //bringing in our routes
require('./handlers/passport');

// create our Express app
const app = express();

// lock it DOOOOWWWNNN
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// log every request to the console
app.use(morgan('dev')); 

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }) //used to store sessions in the MongoDB database
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash()); // use connect-flash for flash messages stored in session

// pass variables to our templates + all requests
app.use((req, res, next) => {
  // res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

console.log('running the routes');
// Use the routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;