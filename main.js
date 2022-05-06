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
    const target = event.target
    const key = dataset.key;
    
    if (key == null) {
        return;
    };

    navbarMenu.classList.remove('visible');
    // for (let i = 0; i < navbarMenu.children.length; i++) {
    //     navbarMenu.children[i].classList.remove('active');
    // }
    // event.target.classList.add('active');


    scrollToTarget(key);
    // const elem = document.getElementById(`${key}`)
    // elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

//Navbar toggle button action
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('visible');
})

//Contact Button Action by Joe
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () => {
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
const projects = document.querySelectorAll('.project');//배열로 받ㅏ 오기

workBtnContainer.addEventListener('click', (event)=>{
    //span 부분 클릭했을 때 console.log에 안나타남, 없을 때 parent node에 있는 filter값 가지고 오기
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if (filter == null) {
        return
    }

    //Remove selection from the previous item and select new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    event.target.classList.add('selected');

    projectContainer.classList.add('anim-out');

    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
});

//Set scrolled navbar color to pink by Joe
// const sections = document.querySelectorAll("section");
// const options = {
//     rootMargin: '30px',
//     threshold: 0.7,
//   };

// const navbarArray = document.querySelectorAll('.navbar__menu__item');  
// const observerCallback = (entries, observers) => {
//     const active = document.querySelector('.navbar__menu__item.active');
//     if (active == null) {return}
//     active.classList.remove('active');
//     let selector = '';
//     entries.forEach(entry => {
//         if (entry.isIntersecting || entry.intersectionRatio > 0.5) {
//             console.log(`${entry.target.id}`);
//             selector = entry.target.id;
//         }
//     });
//     navbarArray.forEach(item => {
//         if(selector === item.dataset.key) {
//             item.classList.add('active');
//             console.log(`active added to ${selector}`)
//         }
//     })
// };

// const observer = new IntersectionObserver(observerCallback, options);
// sections.forEach(section => observer.observe(section));

//Ellie instruction for navbar action
const sectionIds = [
    'home',
    'about',
    'skills',
    'work',
    'testimonials',
    'contact'
]

const sections = sectionIds.map(id => document.querySelector(`#${id}`))
const navItems = sectionIds.map(id => document.querySelector(`[data-key="${id}"]`))

let selectedNavItem = navItems[0];
let selectNavIndex;

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(entry.target.id);
            if(entry.boundingClientRect.y < 0) {
                selectNavIndex = index + 1;
            } else {
                selectNavIndex = index - 1;
            }
            selectNavItem(navItems[selectNavIndex]);
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', ()=> {
    // console.log(`scrollY+innerHeight : ${window.scrollY + window.innerHeight}, document.body: ${document.body.clientHeight}`);
    if (window.scrollY === 0 ) {
        selectNavIndex = 0;
        // console.log(`seclectNavIndex : ${selectNavIndex}`);
    } else if (
        Math.abs( (window.scrollY + window.innerHeight) - (document.body.clientHeight)) < 1.0
    ) {
        selectNavIndex = navItems.length - 1;
        // console.log(`seclectNavIndex : ${selectNavIndex}`);
    }
    selectNavItem(navItems[selectNavIndex]);
})

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

// Funntion for scroll to target by sector
function scrollToTarget(seletor) {
    const elem = document.getElementById(seletor);
    elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    selectNavItem(navItems[sectionIds.indexOf(seletor)]);
}