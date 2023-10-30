import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

var googleSigninButton = document.getElementById("googleSignin");
var githubSigninButton = document.getElementById("githubSignin");
var microsoftSigninButton = document.getElementById("microsoftSignin");

var signin = document.getElementById("signin");
var errorMessage = document.getElementById("errorMessage");

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

githubSigninButton.onclick = () => {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorContent = error.message;

      errorMessage.textContent = `エラー: ${errorContent}`;
    });
};

microsoftSigninButton.onclick = () => {
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
      const errorContent = error.message;

      errorMessage.textContent = `エラー: ${errorContent}`;
    });
};

googleSigninButton.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      signInWithRedirect(auth, provider);
    })
    .catch((error) => {
      const errorContent = error.message;

      errorMessage.textContent = `エラー: ${errorContent}`;
    });
})

signin.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      console.log("Logined as " + userCredential.displayName + "!");
      window.location.href = "/auth/panel.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorContent = error.message;

      if (errorCode == "auth/user-not-found") {
        console.error("No user found!");
        errorMessage.textContent = "ユーザーが見つかりませんでした。";
      } else if (errorCode == "auth/wrong-password") {
        console.error("wrong password!");
        errorMessage.textContent = "パスワードが間違っています。";
      } else {
        console.error("other error: " + errorContent);
        errorMessage.textContent = `エラー: ${errorContent}`;
      }
    });
};
