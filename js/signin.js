import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var gbutton = document.getElementById("google-signin");
var signin = document.getElementById("signin");

var email = document.getElementById("email");
var pass = document.getElementById("pass");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        location.href = "/auth/panel.html";
    }
})

signin.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      location.href = "/auth/panel.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/user-not-found") {
        document.getElementById("error-mess").textContent =
          "ユーザーが見つかりませんでした。";
      } else if ((errorCode = "auth/wrong-password")) {
        document.getElementById("error-mess").textContent =
          "パスワードが間違っています。";
      } else {
        document.getElementById("error-mess").textContent =
          "エラー: " + errorMessage;
      }
    });
};
