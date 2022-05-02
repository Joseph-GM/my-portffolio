'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;
const upButton = document.querySelector('.upButton');

document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    // console.log(`navbarHeight: ${navbarHeight} `);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark')
    }
    
    //Change home item opacit with scroll
    if (window.scrollY < homeHeight) {
        // console.log(`scrollY: ${window.scrollY}, homeHeight:${homeHeight}`);
        const homeOpacity = 1.0 - (window.scrollY / homeHeight);
        // console.log(`opacity value: ${homeOpacity}`);
        homeContainer.style.opacity = homeOpacity;
    }

    //Show upbutton with scroll down
    if (window.scrollY > homeHeight/2) {
        upButton.classList.add('visible');
    } else {
        upButton.classList.remove('visible');
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

// Action for upButton
upButton.addEventListener('click', () => {
    scrollToTarget('home');
})

//Project Button action
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (event)=>{
    const dataset = event.target.dataset;
    const filter = dataset.filter;
    if (filter == null) {
        return
    }
    console.log(filter);
})

// Funntion for scroll to target by sector
function scrollToTarget(seletor) {
    const elem = document.getElementById(seletor);
    elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}