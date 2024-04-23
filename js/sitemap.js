// scroll to top button script

const backToTop = document.querySelector('.scrollTop i');
window.addEventListener('scroll', checkHeight);

function checkHeight() {
    if (window.scrollY > 355) {
        backToTop.style.opacity = "1";
    } else {
        backToTop.style.opacity = "0";
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}