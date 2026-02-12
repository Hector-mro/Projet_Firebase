import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration 
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional 

const firebaseConfig = { 
    apiKey: "AIzaSyAH4aeG3TEpjwzCWvTETCwiBwW5Y3nGFpI", 
    authDomain: "inf6-4db19.firebaseapp.com", 
    projectId: "inf6-4db19", 
    storageBucket: "inf6-4db19.firebasestorage.app", 
    messagingSenderId: "782015273736", 
    appId: "1:782015273736:web:1ffc01e8e8d93578b26abd", 
    measurementId: "G-BFXHFYMN4G", 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");

const authSection = document.getElementById("auth-section");
const userSection = document.getElementById("user-section");
const publicationSection = document.getElementById("publication-section");
const userEmail = document.getElementById("user-email");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Utilisateur créé :", userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Utilisateur connecté :", userCredential.user);
    })
    .catch((error) => {
      alert(error.message);
    });
});

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .catch((error) => {
      alert(error.message);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Utilisateur connecté
    authSection.style.display = "none";
    userSection.style.display = "block";
    publicationSection.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    // Utilisateur non connecté
    authSection.style.display = "block";
    userSection.style.display = "none";
    publicationSection.style.display = "none";
    userEmail.textContent = "";
  }
});
