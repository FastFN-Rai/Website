import {
    getAuth,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

$(function(){
    $.ajaxSetup({cache:false});
    $("header").load("/menu/header.html");
    $("footer").load("/menu/footer.html");

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            document.getElementById("signup").classList.add("is-hidden")
            document.getElementById("signin").classList.add("is-hidden")
            document.getElementById("panel").classList.remove("is-hidden")
        }
    })
});

