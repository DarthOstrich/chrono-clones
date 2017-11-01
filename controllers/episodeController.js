const mongoose = require('mongoose');
const Progress = mongoose.model('Progress');
const allEpisodes = require('./../data/episodes.json');

// For the API Calls
exports.getProgress = async (req, res) => {
  const progress = await Progress.findOne({ 'userID': req.user._id });
  res.json(progress);
}
exports.updateProgress = async (req, res) => {
  // setup the variables for the update
  let userID   = req.user._id,
      epID = req.query.q,
      toggle = {xor: 1},
      update      = {};
  update["progress." + epID + ".watched"] = toggle;

  // update the item in the database
  const progress = await Progress.findOneAndUpdate({ 'userID': req.user._id },
  {
    $bit:
      update
  }, 
  { 
    new: true, //return the new version
    runValidators: true
  }).exec();
  // res.json(req.user);
  res.json(progress);
}
// For rendering the page
exports.getEpisodes = async (req, res) => {
  // Pull the progress entry from the Progress Collection in the DB
  const progress = await Progress.findOne({ 'userID': req.user._id });
  let watched = progress.progress;  

  // Progress.findOne({ 'userID': req.user._id }, 'progress', function (err, progress) {
  //   if (err) return handleError(err);
  //   let watched = progress.progress;
  // });
  

  // combine the two json files
  let episodes = [];
  allEpisodes.forEach(function(i, index) {
    let result = Object.assign(allEpisodes[index], watched[index]);
    episodes.push(result);
  });

  res.render('episodes', {
    episodes,
    user : req.user // get the user out of session and pass to template
  });
}