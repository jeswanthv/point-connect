import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAZTVZiBaTs17wIEdtdzB7imq-7b0IkQs",

  authDomain: "point-connect.firebaseapp.com",

  projectId: "point-connect",

  storageBucket: "point-connect.firebasestorage.app",

  messagingSenderId: "902025845124",

  appId: "1:902025845124:web:5717c2b724facbd35525d1",

  measurementId: "G-73P3Q78WWR",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, auth, provider };
