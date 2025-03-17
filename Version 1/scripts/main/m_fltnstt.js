import { RefreshStaffList } from "../main/m_msgr/m_stflst.js";

const m_fltnbtn = document.querySelector('.m-fltn-closebtn');
const m_fltnbtnI = document.querySelector('.m-fltn-closebtn i');
const m_fltnpnl = document.querySelector('.m-fltn-cnts');

const m_msgbtn = document.querySelector('.m-fltn-msgbtn');
const m_msgpnl = document.querySelector('.m-msgr-pnl-main');
const m_msgcnts = document.querySelector('.m-msgr-cnts');
const m_msgbtncls = document.querySelector('.m-msgr-clsbtn');

const m_stflstbtn = document.querySelector('.m-fltn-frnds');
const m_stflstpnl = document.querySelector('.m-stf-lst-pnl-main');
const m_stflstcnts = document.querySelector('.m-stf-lst-cnts');
const m_stflstbtncls = document.querySelector('.m-stf-lst-clsbtn');

m_fltnbtn.addEventListener('click', ToggleFloatingSettings);
//m_msgbtn.addEventListener('click', ToggleMessages); // Fix this to add list of users
m_stflstbtn.addEventListener('click', ToggleStaffList)


m_msgbtncls.addEventListener('click', CloseMessages);
m_stflstbtncls.addEventListener('click', CloseStaffList);

let timeoutCD;

let SFO, SLO;

function ToggleFloatingSettings() {
    m_fltnpnl.classList.toggle('close');
    m_fltnbtn.classList.toggle('close');

    SFO = !m_msgcnts.classList.contains('close'); // MSGS
    SLO = !m_stflstcnts.classList.contains('close'); // STFL

    if (SFO) { 
        CloseMessages();
        SFO = false;
    }

    if (SLO) { 
        CloseStaffList();
        SLO = false;
    }
}

export function ToggleMessages() {
    ToggleFloatingSettings();
    m_msgcnts.classList.toggle('close');
    m_msgpnl.classList.toggle('hidden');
}

function ToggleStaffList() {
    ToggleFloatingSettings();
    m_stflstcnts.classList.toggle('close');
    m_stflstpnl.classList.toggle('hidden');

    RefreshStaffList();
}

function CloseMessages() {
    m_msgcnts.classList.toggle('close'); 

    clearTimeout(timeoutCD);
    timeoutCD = setTimeout(() => {
        m_msgpnl.classList.toggle('hidden');
    }, 600);
}

function CloseStaffList() {
    m_stflstcnts.classList.toggle('close'); 

    clearTimeout(timeoutCD);
    timeoutCD = setTimeout(() => {
        m_stflstpnl.classList.toggle('hidden');
    }, 600);
}