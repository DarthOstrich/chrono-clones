function handleSubmit(e){
  e.preventDefault();
  // disable the button
  e.target.elements[1].disabled = true;

  // get the form submittal data
  let check = e.target.elements["watched"];
  let checkValue = check.checked;
  // console.log(checkValue);
  
  // get the parent li information
  console.log(e.target.id);
  let formID = e.target.id;
  let num = formID.split("-")[1];
  let parent = document.getElementById(`episode-${num}`);
  console.log(parent);
  
  // check to see if it was checked or not already
  if (checkValue) {
    check.checked = false;
    parent.className = "episode unwatched";
  } else { 
    check.checked = true 
    parent.className = "episode watched";
  }
  // console.log(checkValue);
  // reenable the button
  e.target.elements[1].disabled = false;
};

// listen for form submittals
document.addEventListener("submit", handleSubmit);