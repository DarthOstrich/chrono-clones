import '../sass/style.scss';

import episodeUpdate from './modules/episodeUpdate.js';

// listen for button clicks and fire updater if necessary
document.addEventListener("click", function(e){
  let idChunk = e.target.id.split("-"),
      idPre = idChunk[0],
      idNum = idChunk[1],
      tagType = e.target.nodeName;

  // run some logic to see if it was a button
  if ( tagType == "BUTTON") {
    // check to make sure it was a update button
    if (idPre == "watch" || idPre == "progress" ) {
      // disable the button until updating is complete
      e.target.disabled = true;
      // run the episodeUpdate function, passing along the event
      episodeUpdate(e);
    }
    else {
      console.log('something else was clicked');
      return;
    }
  } else {
    return;
  }
});