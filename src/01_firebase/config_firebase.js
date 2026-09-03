// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCc6PytCz67DzhIsfwsDr6cfzVVmjYa18",
  authDomain: "expedia-clone-se3290.firebaseapp.com",
  projectId: "expedia-clone-se3290",
  storageBucket: "expedia-clone-se3290.firebasestorage.app",
  messagingSenderId: "147617209223",
  appId: "1:147617209223:web:a70e4c2b3b2d25dbfc9122"
};


// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app