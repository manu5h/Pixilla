const modeIcon = document.getElementById('mode-icon');
const orangeIcon = document.getElementById('orange-icon');
const h2s = document.querySelectorAll('.goty-descreption h2');
const gotyDiv = document.querySelector('.game-of-the-year');
const navFont = document.querySelector('nav ul li a');
const navHover = document.querySelector('nav a:hover');
const body = document.querySelector('body');


// light & dark mode
modeIcon.onclick = function () {
    body.classList.toggle('dark-theme');

    if (this.innerText == "light_mode") {
        modeIcon.classList.add("material-symbols-rounded");
        modeIcon.innerText = "dark_mode";
    } else {
        modeIcon.innerText = "light_mode";
        modeIcon.classList.add("material-symbols-rounded");
    }

    if (body.classList.contains('dark-theme')) {
        h2s.forEach(h2 => {
            h2.style.color = 'black';
        });
    } else {
        h2s.forEach(h2 => {
            h2.style.color = '#208c8c';
        });
    }
}

// orange theme
orangeIcon.onclick = function () {
    body.classList.toggle('orange-theme');

    if (body.classList.contains('orange-theme')) {
        h2s.forEach(h2 => {
            h2.style.color = '#ff521d';
        });
    } else {
        h2s.forEach(h2 => {
            h2.style.color = '#208c8c';
        });
    }
}