import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var gbutton = document.getElementById("google-signin");
var ubutton = document.getElementById("github-signin");
var mbutton = document.getElementById("microsoft-signin");

var signin = document.getElementById("signin");

var email = document.getElementById("email");
var pass = document.getElementById("pass");

const provider = new GoogleAuthProvider();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    location.href = "/auth/panel.html";
  }
});

ubutton.onclick = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      document.getElementById("error-mess").textContent =
        "エラー: " + errorMessage;
    });
};

mbutton.onclick = () => {
  const provider = new OAuthProvider("microsoft.com");
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      document.getElementById("error-mess").textContent =
        "エラー: " + errorMessage;
    });
};

gbutton.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      document.getElementById("error-mess").textContent =
        "エラー: " + errorMessage;
    });
};

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
