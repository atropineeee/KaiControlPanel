import { db, auth, collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut} from "../../firebase/cli.mjs";
import { SendErrorMain } from "../../usefull/m_errhandler.js";
import { ToggleMessages } from "../m_fltnstt.js";
import { RefreshMessages } from "../m_msgr/m_sndmsg.js";

export async function RefreshStaffList() {
    ResetStaffList();

    try { 
        const emlref = document.querySelector('.m-side-pnl-ttl').id;
        const container = document.querySelector('.m-stf-scrl-cnt');
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(collectionRef);

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const userDiv = document.createElement('div');
            userDiv.className = 'm-stf-usr-idx';
            userDiv.id = data.email;

            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-user';

            const userName = document.createElement('p');
            userName.className = 'm-stf-urs-ttl';
            userName.textContent = data.firstname + " " + data.lastname;

            userDiv.appendChild(icon);
            userDiv.appendChild(userName);

            userDiv.addEventListener('click', ()=> {
                if (emlref !== data.email) {
                    ToggleMessages();
                    const msgID = document.querySelector('.m-msg-top-usr-msg');
                    msgID.id = data.email;
                    msgID.textContent = data.firstname + " " + data.lastname;

                    RefreshMessages();
                }
            });
            container.appendChild(userDiv);
        });   
    } catch (error) {
        SendErrorMain("Error Occured!", error);
    }
}

function ResetStaffList() {
    const cm = document.querySelector('.m-stf-scrl-cnt').innerHTML = '';
}