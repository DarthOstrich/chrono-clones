import axios from 'axios';

function episodeUpdate(e) {
  let button = e.target,
      id = e.target.id.split("-")[1];
  // console.log(e);
  
  // subtract one to match DB entries
  let DBepID = id - 1;
  // console.log(DBepID);

  axios
    .get(`/api/v1/update?q=${DBepID}`)
    .then(res =>{
      let parent = document.getElementById(`episode-${id}`);
      parent.classList.toggle('watched');
      parent.classList.toggle('unwatched');

      //reenable the button
      button.disabled = false;

    })
    .catch(err => {
      console.error(err);
    })
  
}

export default episodeUpdate;