const express = require('express');
const router = express.Router();
const mergeJSON = require('merge-json');
const passport = require('passport');

// Middleware
const authController = require('./../controllers/authController');
const episodeController = require('./../controllers/episodeController');
const userController = require('./../controllers/userController');
const { catchErrors } = require('./../handlers/errorHandlers');

// Routing for the home page
router.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// Routing for the episodes page
router.get('/episodes', 
  authController.isLoggedIn, 
  episodeController.getEpisodes
);

// User Registration Routes
router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login
);

// Routing for logging in
router.get('/login', userController.loginForm); //Uses the userController middleware
router.post('/login', authController.login); //Uses the authController middleware

// Routing for facebook authentication
router.get('/login/facebook',
  passport.authenticate('facebook')
);

// when it comes back from facebook, it will redirect here
router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // get the User id from this info and link it to the user
    res.redirect('/episodes');
});

// Handle Logouts
router.get('/logout', authController.logout);

/*
API V1.0
*/

router.get('/api/v1/search', authController.isLoggedIn, catchErrors(episodeController.getProgress));
router.get('/api/v1/update', authController.isLoggedIn, catchErrors(episodeController.updateProgress));


module.exports = router;