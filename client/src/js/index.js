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
import { initData, getData, addData, delData } from "./database";

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
