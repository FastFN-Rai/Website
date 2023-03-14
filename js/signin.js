import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var googleSignin = document.getElementById("google-signin");
var githubSignin = document.getElementById("github-signin");
var microsoftSignin = document.getElementById("microsoft-signin");

var signin = document.getElementById("signin");
var errorText = document.getElementById("error-mess");

var email = document.getElementById("email");
var pass = document.getElementById("password");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    location.href = "/auth/panel.html";
  }
});

window.onloadTurnstileCallback = function () {
  turnstile.render("#turnstile", {
    sitekey: "0x4AAAAAAACYWAGYl5B5l4E9",
    callback: function (token) {
      signin.removeAttribute("disabled")
    },
  });
};

turnstile.ready(onloadTurnstileCallback);

githubSignin.onclick = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      errorText.textContent = "エラー: " + errorMessage;
    });
};

microsoftSignin.onclick = () => {
  const provider = new OAuthProvider("microsoft.com");
  signInWithPopup(auth, provider)
    .then((result) => {
      var credential = OAuthProvider.credentialFromResult(result);
      var access_token = credential.accessToken;
      var id_token = credential.idToken;
      window.localStorage.setItem("access_token", access_token);
      window.localStorage.setItem("id_token", id_token);

      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      errorText.textContent = "エラー: " + errorMessage;
    });
};

googleSignin.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorMessage = error.message;

      errorText.textContent = "エラー: " + errorMessage;
    });
};

signin.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      console.log("Logined as " + userCredential.displayName + "!");
      location.href = "/auth/panel.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == "auth/user-not-found") {
        console.log("No user found!");
        errorText.textContent = "ユーザーが見つかりませんでした。";
      } else if ((errorCode = "auth/wrong-password")) {
        console.log("wrong password!");
        errorText.textContent = "パスワードが間違っています。";
      } else {
        console("other error: " + errorMessage);
        errorText.textContent = "エラー: " + errorMessage;
      }
    });
};
