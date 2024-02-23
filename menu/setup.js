import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

var i = 0;

//includeHeader
const headerRequest = new XMLHttpRequest();
headerRequest.open("GET", "/menu/header.html", true);
headerRequest.onreadystatechange = function () {
  if (headerRequest.readyState === 4 && headerRequest.status === 200) {
    const response = headerRequest.responseText;
    const element = document.querySelector("header");
    element.innerHTML = response;

    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
};
headerRequest.send();

//includeFooter
const footerRequest = new XMLHttpRequest();
footerRequest.open("GET", "/menu/footer.html", true);
footerRequest.onreadystatechange = function () {
  if (footerRequest.readyState === 4 && footerRequest.status === 200) {
    const response = footerRequest.responseText;
    const element = document.querySelector("footer");
    element.innerHTML = response;
  }
};
footerRequest.send();
