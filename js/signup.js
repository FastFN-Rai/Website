import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  GithubAuthProvider,
  OAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var signup = document.getElementById("signup");

var googleSigninButton = document.getElementById("googleSignin");
var githubSigninButton = document.getElementById("githubSignin");
var microsoftSigninButton = document.getElementById("microsoftSignin");

var email = document.getElementById("email");
var pass = document.getElementById("pass");

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user !== null) {
        location.href = "/auth/panel.html";
    }
})

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

signup.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.localStorage.setItem("email", user.email);
      window.location.href = "/auth/panel.html";
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
