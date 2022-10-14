//js
import "./form";
import "./submit";
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
import { initData } from "./database";

window.addEventListener("load", function () {
  initData();
  document.getElementById("logo").src = Logo;
  document.getElementById("bearThumbnail").src = Bear;
  document.getElementById("dogThumbnail").src = Dog;
});
