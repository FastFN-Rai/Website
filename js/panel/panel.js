import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

var removeP = document.getElementById("rempass");
var removeC = document.getElementById("check");
var removeM = document.getElementById("error-rem");
var removeB = document.getElementById("removeA");

onAuthStateChanged(auth, (user) => {+

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
});
