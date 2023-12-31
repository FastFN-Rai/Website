import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  PhoneAuthProvider,
  updateEmail,
  deleteUser,
  sendEmailVerification,
  PhoneMultiFactorGenerator,
  multiFactor,
  RecaptchaVerifier,
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

const tfa_password = document.getElementById("2fa_password");
const tfa_phonenumber = document.getElementById("2fa_phonenumber");
const tfa_info = document.getElementById("2fa_info");
const tfa_sendcode = document.getElementById("2fa_sendcode");
let tfa_user = "";
let tfa_verificationid = "";
const tfa_verificationcode = document.getElementById("2fa_verificationcode");
const tfa_submit = document.getElementById("2fa_submit");

const remove_password = document.getElementById("remove_password");
const remove_info = document.getElementById("remove_info");
const remove_submit = document.getElementById("remove_submit");

onAuthStateChanged(auth, (user) => {
  const urlParams = new URLSearchParams(window.location.search);

  console.log("User Details:\nEmail: ", user.email, "\nEmail Verified: ", user.emailVerified, "\n2FA Enabled: ", window.localStorage.getItem("tfa_enabled"))
  
  if (window.localStorage.getItem("tfa_enabled") == "true") {
    document.getElementById("2fa_enable").setAttribute("disabled", true)
    document.getElementById("2fa_enable").textContent = "2段階認証を無効にする"
  } else {
    document.getElementById("2fa_enable").addEventListener("click", document.getElementById('2fa_dialog').showModal())
  }

  if (urlParams.get("email-verify") == 1) {
    sendEmailVerification(auth.currentUser).then(() => {
      document.querySelector("article").style.display = "";
    });
  }

  email = user.email;
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
    const credential = EmailAuthProvider.credential(
      email,
      remove_password.value
    );
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
        console.log("Error: " + error.message);
        remove_info.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha_container",
    {
      size: "normal",
      callback: function (response) {
        console.log(response);
        tfa_sendcode.removeAttribute("disabled");
      },
      "expired-callback": function () {},
    },
    auth
  );

  tfa_sendcode.addEventListener("click", () => {
    const credential = EmailAuthProvider.credential(email, tfa_password.value);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        multiFactor(user)
          .getSession()
          .then(function (multiFactorSession) {
            const phoneInfoOptions = {
              phoneNumber: tfa_phonenumber.value,
              session: multiFactorSession,
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);
            phoneAuthProvider
              .verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
              .then(function (verificationId) {
                tfa_verificationid = verificationId;
                tfa_user = user;
                tfa_password.setAttribute("disabled", true);
                tfa_phonenumber.setAttribute("disabled", true);
                tfa_sendcode.setAttribute("disabled", true);
                tfa_verificationcode.removeAttribute("disabled");
                tfa_submit.removeAttribute("disabled");
              });
          });
      })
      .catch((error) => {
        console.log("Error: " + error.message);
        remove_info.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  tfa_submit.addEventListener("click", () => {
    window.localStorage.setItem("tfa_enabled", true)
    const cred = PhoneAuthProvider.credential(
      tfa_verificationid,
      tfa_verificationcode.value
    );
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
    multiFactor(tfa_user).enroll(multiFactorAssertion, "電話番号");

    tfa_info.textContent = "2段階認証を有効にしました！";
  });
});
