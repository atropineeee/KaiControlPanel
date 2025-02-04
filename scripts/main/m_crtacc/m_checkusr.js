import { db, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut} from "../../firebase/cli.mjs";
import { SendErrorMain } from "../../usefull/m_errhandler.js";

const userTxt = document.querySelector('.m-side-pnl-ttl');

window.onload = function() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const hiddenEmail = maskEmail(user.email);
            userTxt.textContent = hiddenEmail;
            userTxt.id = user.email;
        }
        else {
            window.location.href = "login.html"
            signOut(auth).then(() => {});
        }
    });
};

function maskEmail(email) {
    const [localPart, domainPart] = email.split('@');
    const visiblePart = localPart.substring(0, 5);
    const maskedPart = '*'.repeat(localPart.length - 5);
    return `${visiblePart}${maskedPart}@${domainPart}`;
}