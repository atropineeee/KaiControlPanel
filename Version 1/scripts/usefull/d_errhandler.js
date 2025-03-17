const d_PopupPNL = document.querySelector('.d-err-popup-pnl-main');
const d_PopupCNT = document.querySelector('.d-popup-cnts');
const d_errname = d_PopupPNL.querySelector(".d-popup-cnt-ttl");

export function SendErrorLog(erstring) {
    d_errname.textContent = (erstring);

    d_PopupPNL.classList.add("open");
    d_PopupCNT.classList.add("open");

    setTimeout(() => {
        d_PopupCNT.classList.remove("open");
        d_PopupCNT.classList.add("close");
        setTimeout(() => {
            d_PopupPNL.classList.remove("open");
            d_PopupCNT.classList.remove("close");
        }, 500);
    }, 3000);
}