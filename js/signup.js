import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

var signup = document.getElementById("signup");

var email = document.getElementById("email");
var password = document.getElementById("password");

const firebaseConfig = {
  apiKey: "AIzaSyDD_ASZ-ShngYPtumrVKM3YH67rEI6bbRc",
  authDomain: "auth.uplauncher.xyz",
  projectId: "e-mediator-401323",
  storageBucket: "e-mediator-401323.appspot.com",
  messagingSenderId: "237760903684",
};

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    location.href = "/auth/panel.html";
  }
});

window.onloadTurnstileCallback = function () {
  turnstile.render("#turnstile", {
    sitekey: "0x4AAAAAAACYWAGYl5B5l4E9",
    callback: function (token) {
      signup.removeAttribute("disabled");
    },
  });
};

turnstile.ready(onloadTurnstileCallback);

signup.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.localStorage.setItem("email", user.email);
      window.location.href = "/auth/panel.html?email-verify=1";
    })
    .catch((error) => {
      const errorcode = error.code;
      let errormessage = error.message;

      errormessage = errormessage.replace("Firebase: Error ", "")

      if (errorcode == "auth/email-already-in-use") {
        document.getElementById("error-mess").textContent =
          "ユーザーがすでに存在します。";
      } else {
        document.getElementById("error-mess").textContent =
          "エラー: " + errormessage;
      }
    });
});
