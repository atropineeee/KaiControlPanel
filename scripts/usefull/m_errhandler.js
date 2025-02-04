const m_PopupPNL = document.querySelector('.m-err-popup-pnl-main');
const m_PopupCNT = document.querySelector('.m-popup-cnts');
const m_errname = m_PopupPNL.querySelector(".m-popup-cnt-ttl");

export function SendErrorMain(erstring) {
    m_errname.textContent = (erstring);

    m_PopupPNL.classList.add("open");
    m_PopupCNT.classList.add("open");

    setTimeout(() => {
        m_PopupCNT.classList.remove("open");
        m_PopupCNT.classList.add("close");
        setTimeout(() => {
            m_PopupPNL.classList.remove("open");
            m_PopupCNT.classList.remove("close");
        }, 500);
    }, 3000);
}