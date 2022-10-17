//js
import { toggleForm, clearForm } from "./form";

//images
import Logo from "../images/Charlie.png";
import Bear from "../images/bear.png";
import Dog from "../images/dog.png";

//css
import "../css/index.css";
//bootstrap  & popper
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Database
import { initData, getData, addData, delData, editData } from "./database";

//UserExperience
import { fetchCards } from "./cards.js";

window.addEventListener("load", function () {
  initData();
  fetchCards();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener("click", (event) => {
  toggleForm();
});

form.addEventListener("submit", (event) => {
  // Handle data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    addData(name, email, phone, profile);
  } else {
    // Obtains values passed into the form element
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let profile = document.querySelector('input[type="radio"]:checked').value;
    // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
    editData(profileId, name, email, phone, profile);
    fetchCards();
    // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }

  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
  let id = parseInt(e.id);

  delData(id);

  fetchCards();
};

window.editCard = (e) => {
  profileId = parseInt(e.dataset.id);

  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;

  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;

  form.style.display = "block";

  //toggles button to update instead of Post
  submitBtnToUpdate = true;
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
