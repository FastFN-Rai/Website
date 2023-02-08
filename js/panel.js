import {
  getAuth,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();
const user = auth.currentUser;

var emailT = document.getElementById("email");
var emailP = document.getElementById("cpass");
var emailC = document.getElementById("changemail");

var passN = document.getElementById("npass");
var passP = document.getElementById("cpass2");
var passB = document.getElementById("changepass");

var removeP = document.getElementById("rempass");
var removeC = document.getElementById("check");
var removeM = document.getElementById("error-rem");
var removeB = document.getElementById("removeA");

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    emailT.value = email;
  } else {
    location.href = "/auth/signin.html";
  }

  removeP.addEventListener("change", () => {
    if ((!removeP.value == "") & (removeC.value == "delete")) {
      removeB.removeAttribute("disabled");
    } else {
      removeB.setAttribute("disabled", true);
    }
  });

  removeC.addEventListener("change", () => {
    if ((removeC.value == "delete") & (!removeP.value == "")) {
      removeB.removeAttribute("disabled");
    } else {
      removeB.setAttribute("disabled", true);
    }
  });

  removeB.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(
      emailT.value,
      removeP.value
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        deleteUser(user)
        .then(() => {
          location.href = "/auth/signin.html";
        })
        .catch((error) => {
          removeM.textContent = "エラー: " + error;
        });
      })
      .catch((error) => {
        removeM.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  emailP.addEventListener("change", () => {
    if (!emailP.value == "" & !emailT.value == "") {
      emailC.removeAttribute("disabled");
    } else {
      emailC.setAttribute("disabled", true);
    }
  });

  emailT.addEventListener("change", () => {
    if (!emailP.value == "" & !emailT.value == "") {
      emailC.removeAttribute("disabled");
    } else {
      emailC.setAttribute("disabled", true);
    }
  });

  passB.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(user.email, passP.value);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, passN.value)
          .then(() => {
            document.getElementById("error-pass").textContent =
              "パスワードが変更されました。";
          })
          .catch((error) => {
            document.getElementById("error-pass").textContent =
              "エラー: " + error;
          });
      })
      .catch((error) => {
        removeM.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  passN.addEventListener("change", () => {
    if (!passN.value == "" & !passP.value == "") {
      passB.removeAttribute("disabled");
    } else {
      passB.setAttribute("disabled", true);
    }
  });

  
  passP.addEventListener("change", () => {
    if (!passN.value == "" & !passP.value == "") {
      passB.removeAttribute("disabled");
    } else {
      passB.setAttribute("disabled", true);
    }
  });

  emailC.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(emailT.value, emailP.value);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updateEmail(user, emailT.value)
          .then(() => {
            document.getElementById("error-mail").textContent =
              'メールアドレスが、"' + emailT.value + '" に変更されました。  ';
          })
          .catch((error) => {
            document.getElementById("error-mail").textContent =
              "エラー: " + error;
          });
      })
      .catch((error) => {
        removeM.textContent = "エラー: パスワードが違います。";
        return;
      });
  });
});
