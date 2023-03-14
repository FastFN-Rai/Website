//Firebase を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

//Firebase の設定
const firebaseConfig = {
    apiKey: "AIzaSyADTVKgmIzCG96lLcE9Oi_pGk9Xu16RU1s",
    authDomain: "raisansite.firebaseapp.com",
    projectId: "raisansite",
    storageBucket: "raisansite.appspot.com",
    messagingSenderId: "783367233419",
    appId: "1:783367233419:web:59b36177080fdd18b6198e",
    measurementId: "G-X9FVTH9NQH"
  };

//Firebase を初期化する
initializeApp(firebaseConfig);