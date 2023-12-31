import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  updateEmail,
  deleteUser,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
const auth = getAuth();

let email = "";

const email_password = document.getElementById("email_password");
const email_new = document.getElementById("email_new");
const email_info = document.getElementById("email_info");
const email_submit = document.getElementById("email_submit");

const password_current = document.getElementById("password_current");
const password_new = document.getElementById("password_new");
const password_info = document.getElementById("password_info");
const password_submit = document.getElementById("password_submit");

const remove_password = document.getElementById("remove_password");
const remove_info = document.getElementById("remove_info");
const remove_submit = document.getElementById("remove_submit");

onAuthStateChanged(auth, (user) => {
  email = user.email;
  console.log(user.email);

  email_password.addEventListener("change", () => {
    if ((!email_password.value == "") & (!email_new.value == "")) {
      email_submit.removeAttribute("disabled");
    } else {
      email_submit.setAttribute("disabled", true);
    }
  });
  email_new.addEventListener("change", () => {
    if ((!email_password.value == "") & (!email_new.value == "")) {
      email_submit.removeAttribute("disabled");
    } else {
      email_submit.setAttribute("disabled", true);
    }
  });
  email_submit.addEventListener("click", async () => {
    const userCredential = EmailAuthProvider.credential(
      user.email,
      email_password
    );
    reauthenticateWithCredential(user, userCredential)
      .then(() => {
        updateEmail(user, email_new.value)
          .then(() => {
            email_info.textContent = "メールアドレスを変更しました。";
          })
          .catch((error) => {
            email_info.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        email_info.textContent = "エラー: パスワードが違います。";
        return;
      });
  });
  password_submit.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(user.email, passP.value);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, passN.value)
          .then(() => {
            password_info.textContent = "パスワードが変更されました。";
          })
          .catch((error) => {
            password_info.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        password_info.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  password_new.addEventListener("change", () => {
    if ((!password_new.value == "") & (!password_current.value == "")) {
      password_submit.removeAttribute("disabled");
    } else {
      password_submit.setAttribute("disabled", true);
    }
  });
  password_current.addEventListener("change", () => {
    if ((!password_new.value == "") & (!password_current.value == "")) {
      password_submit.removeAttribute("disabled");
    } else {
      password_submit.setAttribute("disabled", true);
    }
  });

  remove_password.addEventListener("change", () => {
    if (!remove_password.value == "") {
      remove_submit.removeAttribute("disabled");
    } else {
      remove_submit.setAttribute("disabled", true);
    }
  });
  remove_submit.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(email, remove_password.value);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        deleteUser(user)
          .then(() => {
            location.href = "/auth/signin.html";
          })
          .catch((error) => {
            remove_info.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        console.log("Error: " + error.message)
        remove_info.textContent = "エラー: パスワードが違います。";
        return;
      });
  });
});
