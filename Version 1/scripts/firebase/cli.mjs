import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, query, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getFirestore, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJ-aHa4UDbxM4Va4kUl2geXGBEuTtd6Kc",
    authDomain: "professional-web-8d912.firebaseapp.com",
    databaseURL: "https://professional-web-8d912-default-rtdb.asia-southeast1.firebasedatabase.app",  // Updated URL
    projectId: "professional-web-8d912",
    storageBucket: "professional-web-8d912.firebasestorage.app",
    messagingSenderId: "545845819975",
    appId: "1:545845819975:web:6645c7c0a278d0ee37cf62"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);

export { app, db, rtdb, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut, getDatabase, query, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast };