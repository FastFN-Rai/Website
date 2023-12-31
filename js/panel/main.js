import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    document.getElementById("email_new").value = user.email;
  } else {
    location.href = "/auth/signin.html";
  }
});
