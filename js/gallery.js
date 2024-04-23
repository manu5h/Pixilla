const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const indicatorParents = document.querySelector('.controls ul');
const html = document.querySelector('html');

var sectionIndex = 0;

// gallery item script starts here

function get_id(clicked_id) {
    clicked_id = parseInt(clicked_id);
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[clicked_id].classList.add('selected');
    slider.style.transform = 'translate(' + clicked_id * -6.25 + '%)';

}

// image slider script starts here

document.querySelectorAll('.controls li').forEach(function (indicator, index) {
    indicator.addEventListener('click', function () {
        sectionIndex = index;
        document.querySelector('.controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + sectionIndex * -6.25 + '%)';
    });
});

rightArrow.addEventListener('click', function () {
    if (sectionIndex < 15) {
        sectionIndex += 1;
    } else {
        sectionIndex = 0;
    }
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + sectionIndex * -6.25 + '%)';
});

leftArrow.addEventListener('click', function () {
    if (sectionIndex > 0) {
        sectionIndex -= 1;
    } else {
        sectionIndex = 15;
    }
    document.querySelector('.controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + sectionIndex * -6.25 + '%)';
});

// font-size changing buttons script 

function increaseFontSize() {
    html.classList.remove('font-size-decreased-by-50');
    html.classList.remove('font-size-default');
    html.classList.add('font-size-increased-by-50');
}
function decreseFontSize() {
    html.classList.remove('font-size-default');
    html.classList.remove('font-size-increased-by-50');
    html.classList.add('font-size-decreased-by-50');
}
function normalFontSize() {
    html.classList.remove('font-size-increased-by-50');
    html.classList.remove('font-size-decreased-by-50');
    html.classList.add('font-size-default');
}

let buttons = document.querySelector('.font-buttons');
let btn = buttons.querySelectorAll('.btn');

document.querySelectorAll('.font-buttons .btn').forEach(function (indicator) {
    indicator.addEventListener('click', function () {
        document.querySelector('.font-buttons .active').classList.remove('active');
        indicator.classList.add('active');
    });
});

// scroll to top button script

const backToTop = document.querySelector('.scrollTop i');
window.addEventListener('scroll', checkHeight);

function checkHeight() {
    if (window.scrollY > 1600) {
        backToTop.style.opacity = "1";
    } else {
        backToTop.style.opacity = "0";
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}