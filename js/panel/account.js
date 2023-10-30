//Firebase Auth を読み込む
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  updateEmail,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

//認証するために必要
const auth = getAuth();

//メール変更 (変数)
var emailPassword = document.getElementById("EmailPassword");
var emailNew = document.getElementById("NewEmail");
var emailButton = document.getElementById("ChangeEmail");
var emailInfo = document.getElementById("InfoEmail");

//パスワード変更 (変数)
var currentPassword = document.getElementById("currentPassword");
var newPassword = document.getElementById("NewPassword");
var passwordInfo = document.getElementById("InfoPassword");
var changePassword = document.getElementById("ChangePassword");

//アカウント削除
var removePassword = document.getElementById("removePassword");
var removeInfo = document.getElementById("InfoRemove");
var removeAccount = document.getElementById("removeButton");

//認証サーバーに接続出来たら
onAuthStateChanged(auth, (user) => {
  //メールアドレス関係
  //パスワードを入力したときにボタンを有効にする
  emailPassword.addEventListener("change", () => {
    if ((!emailPassword.value == "") & (!emailNew.value == "")) {
      //ボタンを有効にする
      emailButton.removeAttribute("disabled");
    } else {
      //ボタンを無効にする
      emailButton.setAttribute("disabled", true);
    }
  });

  //メールアドレスを入力したときにボタンを有効にする
  emailNew.addEventListener("change", () => {
    if ((!emailPassword.value == "") & (!emailNew.value == "")) {
      //ボタンを有効にする
      emailButton.removeAttribute("disabled");
    } else {
      //ボタンを無効にする
      emailButton.setAttribute("disabled", true);
    }
  });

  //メールアドレス変更ボタンを押したとき
  emailButton.addEventListener("click", async () => {
    //資格情報を作成
    var userCredential = EmailAuthProvider.credential(
      user.email,
      emailPassword
    );

    //ユーザーを資格情報で再認証
    reauthenticateWithCredential(user, userCredential)
      .then(() => {
        //メールアドレスを更新する
        updateEmail(user, emailNew.value)
          .then(() => {
            //メールアドレスの変更に成功した時
            emailInfo.textContent =
              'メールアドレスが、"' + emailNew.value + '" に変更されました。  ';
          })
          .catch((error) => {
            //メールアドレスの変更に失敗した時
            emailInfo.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        //資格情報が間違っているときなど
        emailInfo.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  //パスワード関係
  //パスワード変更ボタンを押したとき
  changePassword.addEventListener("click", () => {
    //資格情報を作成
    const credential = EmailAuthProvider.credential(user.email, passP.value);

    //ユーザーを資格情報で再認証
    reauthenticateWithCredential(user, credential)
      .then(() => {
        //パスワードを更新する
        updatePassword(user, passN.value)
          .then(() => {
            //パスワードの変更に成功した時
            passwordInfo.textContent = "パスワードが変更されました。";
          })
          .catch((error) => {
            //パスワードの変更に失敗した時
            passwordInfo.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        //資格情報が間違っているときなど
        passwordInfo.textContent = "エラー: パスワードが違います。";
        return;
      });
  });

  //新しいパスワードを入力したときにボタンを有効にする
  newPassword.addEventListener("change", () => {
    if ((!newPassword.value == "") & (!currentPassword.value == "")) {
      //ボタンを有効にする
      changePassword.removeAttribute("disabled");
    } else {
      //ボタンを無効にする
      changePassword.setAttribute("disabled", true);
    }
  });

  //現在のパスワードを入力したときにボタンを有効にする
  currentPassword.addEventListener("change", () => {
    if ((!newPassword.value == "") & (!currentPassword.value == "")) {
      //ボタンを有効にする
      changePassword.removeAttribute("disabled");
    } else {
      //ボタンを無効にする
      changePassword.setAttribute("disabled", true);
    }
  });

  //アカウント削除関係
  //パスワードを入力したときにボタンを有効にする
  removePassword.addEventListener("change", () => {
    if (!removePassword.value == "") {
      //ボタンを有効にする
      removeAccount.removeAttribute("disabled");
    } else {
      //ボタンを無効にする
      removeAccount.setAttribute("disabled", true);
    }
  });

  removeAccount.addEventListener("click", () => {
    //資格情報を作成
    const credential = EmailAuthProvider.credential(email, removePassword);

    //ユーザーを資格情報で再認証
    reauthenticateWithCredential(user, credential)
      .then(() => {
        //アカウントを削除する
        deleteUser(user)
          .then(() => {
            //アカウントの削除に成功した時
            location.href = "/auth/signin.html";
          })
          .catch((error) => {
            //アカウントの削除に失敗した時
            removeInfo.textContent = "エラー: " + error;
          });
      })
      .catch((error) => {
        //資格情報が間違っているときなど
        removeInfo.textContent = "エラー: パスワードが違います。";
        return;
      });
  });
});
