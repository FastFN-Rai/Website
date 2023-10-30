//Firebase を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

//Firebase の設定
const firebaseConfig = {
    apiKey: "AIzaSyCkMWRtQsVjqe4XYDrvd37cFYGsXOgQ5sc",
    authDomain: "auth.uplauncher.xyz",
    projectId: "e-mediator-401323",
    storageBucket: "e-mediator-401323.appspot.com",
    messagingSenderId: "237760903684"
  };

//Firebase を初期化する
initializeApp(firebaseConfig);