import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADTVKgmIzCG96lLcE9Oi_pGk9Xu16RU1s",
  authDomain: "raisansite.firebaseapp.com",
  projectId: "raisansite",
  storageBucket: "raisansite.appspot.com",
  messagingSenderId: "783367233419",
  appId: "1:783367233419:web:59b36177080fdd18b6198e",
  measurementId: "G-X9FVTH9NQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var gbutton = document.getElementById("google-signin");
var signup = document.getElementById("signup");

var email = document.getElementById("email");
var pass = document.getElementById("pass");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        location.href = "/auth/panel.html";
    }
})

signup.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.localStorage.setItem("email", user.email);
      location.href = "/auth/panel.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/email-already-in-use") {
        document.getElementById("error-mess").textContent =
          "ユーザーがすでに存在します。";
      } else {
        document.getElementById("error-mess").textContent =
          "エラー: " + errorMessage;
      }
      // ..
    });
};
