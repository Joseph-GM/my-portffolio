'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight} `);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
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