import { rtdb, auth, getDatabase, query, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { SendErrorMain } from "../../usefull/m_errhandler.js";

const m_sndbtn = document.querySelector('.m-snd-msg-btn');

const m_msgcontainer = document.querySelector('.m-msgr-scrl-cnt');
m_sndbtn.addEventListener('click', SendMessage);

let youid, tomsgid;

export async function RefreshMessages() {
    youid = document.querySelector('.m-side-pnl-ttl').id;
    tomsgid = document.querySelector('.m-msg-top-usr-msg').id;
    
    youid = youid.replace(/[^a-zA-Z0-9]/g, '');
    tomsgid = tomsgid.replace(/[^a-zA-Z0-9]/g, '');

    const messageRef1 = ref(rtdb, "chats/" + youid + "/" + tomsgid + "/messages");

    try {
        const snapshot1 = await get(messageRef1);

        let allMessages = [];

        if (snapshot1.exists()) { 
            snapshot1.forEach(childSnapshot => {
                allMessages.push(childSnapshot.val());
            });
        }

        allMessages.sort((a, b) => a.time - b.time);

        m_msgcontainer.innerHTML = '';

        allMessages.forEach(message => {
            const msgDiv = document.createElement('div');
            const msgText = document.createElement('p');

            if (message.sender === youid) {
                msgDiv.className = 'm-msg-usr-idx';
                msgText.className = 'm-msg-usr-ppx';
            } else {
                msgDiv.className = 'm-msg-otx-idx';
                msgText.className = 'm-msg-otx-ppx';
            }

            msgText.textContent = message.content;
            msgDiv.appendChild(msgText);
            m_msgcontainer.appendChild(msgDiv);
        });

        m_msgcontainer.scrollTop = m_msgcontainer.scrollHeight;
    } catch (error) {
        SendErrorMain("Error Occurred!", error);
    }
}

async function SendMessage() {
    let msg = document.getElementById('messagebox').value;
    youid = document.querySelector('.m-side-pnl-ttl').id;
    tomsgid = document.querySelector('.m-msg-top-usr-msg').id;
    youid = youid.replace(/[^a-zA-Z0-9]/g, '');
    tomsgid = tomsgid.replace(/[^a-zA-Z0-9]/g, '');
    
    if (msg == "") { return; }
    const messageRef1 = ref(rtdb, "chats/" + youid + "/" + tomsgid + "/messages");
    const messageRef2 = ref(rtdb, "chats/" + tomsgid + "/" + youid + "/messages");
    const newMessageRef1 = push(messageRef1);
    const newMessageRef2 = push(messageRef2);

    //const messageid = newMessageRef1.key;

    const newMessageData = {
        time: Date.now(),
        content: msg,
        sender: youid
    };

    try {
        await set(newMessageRef1, newMessageData);
        await set(newMessageRef2, newMessageData);

        const msgUsrDiv= document.createElement('div');
        msgUsrDiv.className = 'm-msg-usr-idx';

        const msgCnnts = document.createElement('p');
        msgCnnts.className = 'm-msg-usr-ppx'; 
        msgCnnts.textContent = msg;

        msgUsrDiv.appendChild(msgCnnts);
        m_msgcontainer.appendChild(msgUsrDiv)
        m_msgcontainer.scrollTop = m_msgcontainer.scrollHeight;

        document.getElementById('messagebox').value = "";
    } catch(error) {
        SendErrorMain("Error Occured!", error);
    }
}

youid = document.querySelector('.m-side-pnl-ttl').id;
tomsgid = document.querySelector('.m-msg-top-usr-msg').id;

const senderRef = ref(rtdb, "chats/" + youid + "/" + tomsgid + "/");

let i = 0;
onValue(senderRef, (snapshot) => {
    i++;
    if (i == 2) {
        i = 0;
        setTimeout(() => {
            SyncMessage();
        }, 500);
    }
});

async function SyncMessage() {
    youid = document.querySelector('.m-side-pnl-ttl').id;
    tomsgid = document.querySelector('.m-msg-top-usr-msg').id;

    youid = youid.replace(/[^a-zA-Z0-9]/g, '');
    tomsgid = tomsgid.replace(/[^a-zA-Z0-9]/g, '');

    const messageRef1 = ref(rtdb, "chats/" + youid + "/" + tomsgid + "/messages");
    const latestMessageRef = query(messageRef1, orderByChild('time'), limitToLast(1));
    const snapshot1 = await get(latestMessageRef);

    if (snapshot1.exists()) { 
        const lastestMsg = snapshot1.val();
        const message = Object.values(lastestMsg)[0];

        if (message.sender === youid) { return; }
        
        const msgUsrDiv= document.createElement('div');
        msgUsrDiv.className = 'm-msg-otx-idx';

        const msgCnnts = document.createElement('p');
        msgCnnts.className = 'm-msg-otx-ppx'; 
        msgCnnts.textContent = message.content;

        msgUsrDiv.appendChild(msgCnnts);
        m_msgcontainer.appendChild(msgUsrDiv)
        m_msgcontainer.scrollTop = m_msgcontainer.scrollHeight;
    }
}