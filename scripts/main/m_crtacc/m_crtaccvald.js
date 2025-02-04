import { db, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut} from "../../firebase/cli.mjs";
import { SendErrorMain } from "../../usefull/m_errhandler.js";

const xfni = document.getElementById('first-name');
const xlni = document.getElementById('last-name');
const xmni = document.getElementById('middle-name');
const xemi = document.getElementById('email');
const xpwi = document.getElementById('password');
const xsri = document.getElementById('select-role');
const xsgi = document.getElementById('select-gender');

const wrtp = document.querySelector('.m-crt-acc-wrn');
const crtbtn = document.querySelector('.m-crt-acc-crt-btn');

xfni.addEventListener('input', ckfni);
xlni.addEventListener('input', cklni);
xmni.addEventListener('input', ckmni);
xemi.addEventListener('input', ckemi);
xpwi.addEventListener('input', ckpwi);
xsri.addEventListener('change', cksri);
xsgi.addEventListener('change', cksgi);

xfni.addEventListener('input', CheckForValid);
xlni.addEventListener('input', CheckForValid);
xmni.addEventListener('input', CheckForValid);
xemi.addEventListener('input', CheckForValid);
xpwi.addEventListener('input', CheckForValid);
xsri.addEventListener('change', CheckForValid);
xsgi.addEventListener('change', CheckForValid);

let XFN, XMN, XLN, XEM, XPW;
let XFNC, XMNC, XLNC, XEMC, XPWC, XSRC, XSGC;
const MPLT = 8;
const MPFT = 3;

function isn() {
    XFN = document.getElementById('first-name').value;
    XLN = document.getElementById('last-name').value;
    XMN = document.getElementById('middle-name').value;
    XEM = document.getElementById('email').value;
    XPW = document.getElementById('password').value;
}

function ckfni() {
    isn();

    if (containsNumbersOrSymbols(XFN)) {
        wrtp.textContent = "First Name cannot contain any Number or Symbols";
        XFNC = false;
        return;
    } else if (XFN.length < MPFT) {
        wrtp.textContent = "First Name is too Short!";
        XFNC = false;
        return;
    } else if (XFN == "") {
        wrtp.textContent = "First Name cannot be Empty";
        XFNC = false;
        return;
    }

    wrtp.textContent = "‎";
    XFNC = true;
}

function cklni() {
    isn();

    if (containsNumbersOrSymbols(XLN)) {
        wrtp.textContent = "Last Name cannot contain any Number or Symbols!";
        XLNC = false;
        return;
    } else if (XLN.length < MPFT) {
        wrtp.textContent = "Last Name is too Short!";
        XLNC = false;
        return;
    } else if (XLN == "") {
        wrtp.textContent = "Last Name cannot be Empty!";
        XLNC = false;
        return;
    }

    wrtp.textContent = "‎";
    XLNC = true;
}

function ckmni() {
    isn();

    if (containsNumbersOrSymbols(XMN)) {
        wrtp.textContent = "Middle Name cannot contain any Number or Symbols!";
        XMNC = false;
        return;
    } else if (XMN.length < MPFT) {
        wrtp.textContent = "Middle Name is too Short!";
        XMNC = false;
        return;
    } else if (XMN == "") {
        wrtp.textContent = "Middle Name cannot be Empty!";
        XMNC = false;
        return;
    }

    wrtp.textContent = "‎";
    XMNC = true;
}

function ckemi() {
    isn();

    if (containsSymbols(XEM)) {
        wrtp.textContent = "Email cannot contain any Symbols!";
        XEMC = false;
        return;
    } else if (XFN == "") {
        wrtp.textContent = "Email cannot be Empty!";
        XEMC = false;
        return;
    }

    wrtp.textContent = "‎";
    XEMC = true;
}

function cksri() {
    isn();

    if (xsri.value != "") {
        wrtp.textContent = "‎";
        XSRC = true;
        return;
    }

    wrtp.textContent = "Select a Role";
    XSRC = false;
}

function cksgi() {
    isn();

    if (xsgi.value != "") {
        wrtp.textContent = "‎";
        XSGC = true;
        return;
    }

    wrtp.textContent = "Select a Role";
    XSGC = false;
}
 
function ckpwi() {
    isn();

    if (XPW.length < MPLT) {
        wrtp.textContent = "Password is too Short!";
        XPWC = false;
        return;
    } else if (XPW == "") {
        wrtp.textContent = "Password cannot be Empty!";
        XPWC = false;
        return;
    }

    wrtp.textContent = "‎";
    XPWC = true;
}

export function ResetAll() {
    XFNC = XMNC = XLNC = XEMC = XPWC = XSRC = XSGC = false;
    XFN = XMN = XLN = XEM = XPW = "";

    xsri.selectedIndex = 0;
    xsgi.selectedIndex = 0;
    CheckForValid();
}

function CheckForValid() {
    if (XFNC && XLNC && XMNC && XEMC && XPWC && XSRC && XSGC) {
        crtbtn.classList.remove('hidden');
    } else {
        crtbtn.classList.add('hidden');
    }
}

function containsNumbersOrSymbols(str) 
{
    const regex = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?~`\\|/]/;
    return regex.test(str);
}

function containsSymbols(str) {
    const symbolRegex = /[^a-zA-Z0-9]/;
    return symbolRegex.test(str);
}
