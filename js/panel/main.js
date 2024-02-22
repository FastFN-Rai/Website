import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDD_ASZ-ShngYPtumrVKM3YH67rEI6bbRc",
    authDomain: "auth.uplauncher.xyz",
    projectId: "e-mediator-401323",
    storageBucket: "e-mediator-401323.appspot.com",
    messagingSenderId: "237760903684"
  };

var app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    document.getElementById("email_new").value = user.email;
  } else {
    location.href = "/auth/signin.html";
  }
});
