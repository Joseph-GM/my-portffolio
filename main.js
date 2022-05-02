'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight} `);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
    if (window.scrollY < homeHeight) {
        // console.log(`scrollY: ${window.scrollY}, homeHeight:${homeHeight}`);
        const homeOpacity = 1.0 - (window.scrollY / homeHeight);
        // console.log(`opacity value: ${homeOpacity}`);
        homeContainer.style.opacity = homeOpacity;
    }
})

// NavBar Button Action by Joe
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => onNavBarMenuClick(event));

function onNavBarMenuClick(event) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    
    if (key == null) {
        return;
    };

    for (let i = 0; i < navbarMenu.children.length; i++) {
        navbarMenu.children[i].classList.remove('active');
    }
    event.target.classList.add('active');


    scrollToTarget(key);
    // const elem = document.getElementById(`${key}`)
    // elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

//Contact Button Action by Joe
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () =>{
    console.log('contact button clicked()')
    scrollToTarget('contact');
})

// Funntion for scroll to target by sector
function scrollToTarget(seletor) {
    const elem = document.getElementById(seletor);
    elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}