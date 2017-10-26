const express = require('express');
const router = express.Router();
const allEpisodes = require('./../data/episodes.json');
const watched = require('./../data/sample-watched.json');
const mergeJSON = require('merge-json');
const passport = require('passport');

// Routing for the home page
router.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// Routing for the episodes page
router.get('/episodes', function (req, res) {
  // combine the two json files
  let episodes = [];
  allEpisodes.forEach(function(i, index) {
    let result = Object.assign(allEpisodes[index], watched[index]);
    episodes.push(result);
  });

  // res.json(episodes);
  res.render('episodes', { 
    episodes,
    user : req.user // get the user out of session and pass to template
  });
});

// Routing for the login page
router.get('/login', function (req, res) {
  res.render('login');
})

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

module.exports = router;