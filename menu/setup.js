import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var i = 0;

$(function () {
  $.ajaxSetup({ cache: false });
  $("header").load("/menu/header.html");

  $(document).ajaxComplete(function () {
    i++;
    if (i == 1) {
      $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
      });
    }
  });

  $("footer").load("/menu/footer.html");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      document.getElementById("signup").classList.add("is-hidden");
      document.getElementById("signin").classList.add("is-hidden");
      document.getElementById("panel").classList.remove("is-hidden");
      document.getElementById("logout").classList.remove("is-hidden");

      document.getElementById("logout").addEventListener("click", () => {
        auth.signOut();
      });
    }
  });
});
