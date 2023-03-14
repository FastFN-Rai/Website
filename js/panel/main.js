//Firebase Auth を読み込む
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

//認証するために必要
const auth = getAuth();

//メール変更 (変数)
var emailPassword = document.getElementById("EmailPassword");
var emailNew = document.getElementById("NewEmail");
var emailButton = document.getElementById("ChangeEmail");

var currentPassword = document.getElementById("currentPassword");
var newPassword = document.getElementById("NewPassword");
var changePassword = document.getElementById("ChangePassword");

var removeAccount = document.getElementById("startRemoveAccount");

//認証サーバーに接続出来たら
onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    //ユーザーがサインインしていたら
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    //メールアドレスを読み込む
    emailNew.value = email;

    //メールアドレスとパスワードでサインインしているとき以外メールアドレスの変更などを無効にする
    user.providerData.forEach(async (userinfo) => {
      console.log("使用しているプロバイダー: " + userinfo.providerId);
      if (userinfo.providerId !== "password") {
        //プロバイダーがメールアドレスとパスワードではないときに
        console.log(
          "プロバイダーが " +
            userinfo.providerId +
            " のため、メールアドレスの変更、パスワードの変更とアカウントの削除を無効にしています..."
        );
        //メールアドレスの変更を無効にする
        emailButton.textContent = "プロバイダーが非対応";
        emailButton.setAttribute("disabled", true);
        emailNew.setAttribute("disabled", true);
        emailPassword.setAttribute("disabled", true);

        console.log("メールアドレスを変更できなくしました...");

        //パスワードの変更を無効にする
        changePassword.textContent = "プロバイダーが非対応";
        changePassword.setAttribute("disabled", true);
        newPassword.setAttribute("disabled", true);
        currentPassword.setAttribute("disabled", true);

        console.log("パスワードを変更できなくしました...");

        //アカウントを削除できなくする
        removeAccount.classList.add("is-hidden");

        console.log("メールアドレスの変更、パスワードの変更とアカウントの削除を無効にしました");
      } else {
        document.getElementById("contact").classList.add("is-hidden");
      }
    });
  } else {
    //サインインしていない場合にサインインページに移動
    location.href = "/auth/signin.html";
  }
});
