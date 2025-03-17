import { db, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut} from "../../firebase/cli.mjs";
import { SendErrorMain } from "../../usefull/m_errhandler.js";
import { ResetAll } from "../m_crtacc/m_crtaccvald.js";

const m_CrtAccBtn = document.querySelector('.m-crt-acc-crt-btn');
const m_PopupPNL = document.querySelector('.m-err-popup-pnl-main');
const m_PopupCNT = document.querySelector('.m-popup-cnts');

m_CrtAccBtn.addEventListener('click', CreateUserAccount);

let XFN, XMN, XLN, XEM, XPW, XSR, XSG;

async function CreateUserAccount() {
    XFN = document.getElementById('first-name').value;
    XLN = document.getElementById('last-name').value;
    XMN = document.getElementById('middle-name').value;
    XEM = document.getElementById('email').value;
    XPW = document.getElementById('password').value;
    XSR = document.getElementById('select-role').value;
    XSG = document.getElementById('select-gender').value;

    try { 
        CheckFromDatabase();
    } catch (err) {
        SendErrorMain("Error Occured", err)
    }
}

async function CheckFromDatabase() {
    const NEMX = XEM + "@yahoo.com";

    try {
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(collectionRef);

        let emx = false;

        querySnapshot.forEach((doc) => {
            const data = doc.data(); 
            if (NEMX == data.email) { 
                SendErrorMain("Email already Exists");
                emx = true;
                return;
            } 
        });

        if (!emx) {
            AddToDB();
            return;
        }

    } catch(err) {
        SendErrorMain("System Error!");
    }
}

function AddToDB() {

    const NEMX = XEM + "@yahoo.com";

    const ToAadd = {
        firstname: XFN,
        lastname: XLN,
        middlename: XMN,
        email: NEMX,
        password: XPW,
        role: XSR,
        gender: XSG,
        createdAt: new Date()
    }

    const UsersCollection = collection(db, "users");

    addDoc(UsersCollection, ToAadd) 
        .then(() => {
            createUserWithEmailAndPassword(auth, NEMX, XPW)
            .then((user) => {
                SendErrorMain("User Created!", user);
                ResetTextBoxes();
                ResetAll();
            })       
            .catch((error) => {
                SendErrorMain("Error Creating User ", error);
            });
        })
        .catch((error) => {
            SendErrorMain("Error Creating User ", error);
        });
}


function ResetTextBoxes() {
    const inputs = document.querySelectorAll('.m-acc-input:not(#fixed-email)');

    inputs.forEach(input => {
        input.value = '';
    });
}