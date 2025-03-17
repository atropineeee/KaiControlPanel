const m_tglButton = document.querySelector('.m-tgl-btn');
const m_tglButtonIcon = document.querySelector('.m-tgl-btn i');
const m_drpdwnpnl = document.querySelector('.m-drp-dwn-pnl');
const m_drpdwnbtns = document.querySelectorAll('.m-drp-dwn-pnl a');

let timeoutCD;

window.addEventListener('scroll', removeDropdownOnScroll);

m_tglButton.onclick = function() {
    m_drpdwnpnl.classList.toggle('open');
    const isOpen = m_drpdwnpnl.classList.contains('open');
    m_tglButtonIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    if (isOpen) {
        clearTimeout(timeoutCD);
        timeoutCD = setTimeout(() => {
            if (m_drpdwnpnl.classList.contains('open')) {
                m_drpdwnpnl.classList.remove('open');
                m_tglButtonIcon.className = 'fa-solid fa-bars';
            }
        }, 3000);
    }
}

m_drpdwnbtns.forEach(button => {
    button.addEventListener('mouseover', () => {
        clearTimeout(timeoutCD);
        timeoutCD = setTimeout(() => {
            if (m_drpdwnpnl.classList.contains('open')) {
                m_drpdwnpnl.classList.remove('open');
                m_tglButtonIcon.className = 'fa-solid fa-bars';
            }
        }, 3000);
    });
});

function removeDropdownOnScroll() {
    m_drpdwnpnl.classList.remove('open');
    m_tglButtonIcon.className = 'fa-solid fa-bars';
    window.removeEventListener('scroll', removeDropdownOnScroll);
}