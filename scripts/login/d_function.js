import { db, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut} from "../firebase/cli.mjs";
import { SendErrorLog } from "../usefull/d_errhandler.js";

const d_logBtn = document.querySelector('.d-login-btn');
const d_usrInp = document.getElementById('email');
const d_usrPsw = document.getElementById('password');
const c_err = document.querySelector('.d-ttl-err');

d_logBtn.addEventListener('click', Attemptlogin);

let timeoutCD;

async function Attemptlogin() {
    const USRX = d_usrInp.value;
    const PSRX = d_usrPsw.value;

    try {
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            if (USRX == data.email && PSRX == data.password) { 
                signInWithEmailAndPassword(auth, USRX, PSRX)
                .then((userCreds) => {
                    window.location.href = "main.html";
                    return;
                });
                return;
            } else if (USRX == data.email && PSRX != data.password) {
                c_err.textContent = "Wrong Password";
                SetErr();
                return;
            } else if (USRX != data.email) {
                c_err.textContent = "Invalid Email";
                SetErr();
                return;
            }
        });

    } catch (err) {
        SendErrorLog("Error fetching documents: ", err)
    }
}

function SetErr() {
    clearTimeout(timeoutCD);

    timeoutCD = setTimeout(() => {
        c_err.textContent = "‎";
    }, 3000);
}