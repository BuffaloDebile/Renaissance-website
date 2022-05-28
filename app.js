let controller;
let slideScene;

gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll(".slide");
const nav = document.querySelector(".nav-header");
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");


slides.forEach((slide, index, slides) => {
  const img = slide.querySelector("img");
  const imgReveal = slide.querySelector(".reveal-img");
  const textReaveal = slide.querySelector(".reveal-text");

  const tl = new gsap.timeline({
    defaults: {
      duration: 1,
      ease: "power2.inOut",
    },
    scrollTrigger: {
      trigger: slide,
      start: "top center",

      toggleActions: "play none none none",
    },
  });
  
  tl.fromTo(img, { scale: 2 }, { scale: 1 })
    .fromTo(imgReveal, { x: "0%" }, { x: "100%" }, "-=1")
    .fromTo(textReaveal, { x: "0%" }, { x: "100%" }, "-=0.75")
    .fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

// Animation slide
  const pageTl = gsap.timeline()
    //Create scene
    // pageTl:fromTo({slide, opacity:1, scale:1}, {opacity:0, scale:0});
    
});




gsap.utils.toArray(".slide").forEach((slide, i) => {
  ScrollTrigger.create({
    trigger: slide,
    start: "top top", 
    pin: true, 
    pinSpacing: false,
    autoAlpha: 1,
    ease: "expo.out",
    scrub: true,
  });
});


ScrollTrigger.create({
  snap: {
    snapTo: 1 / 2,
    duration: 1
  }
});

//  gsap.to(slides, {
//    scrollTrigger: ".slides",
//    duration: 1,
//    opacity:0,
//    scale:0,

// });

// CURSOR

function cursor(e) {
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
};

function activeCursor(e) {
  const item = e.target;
  if (item.id === 'logo' || item.classList.contains("burger")) {
    mouse.classList.add('nav-active');
  } else {
    mouse.classList.remove('nav-active');
  }

  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, {y:'0%'});
    mouseTxt.innerText = 'tap'
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, {y:'100%'});
    mouseTxt.innerText = ''
  }
}


function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}



// BARBA PAGE TRANSITIONS

const logo = document.querySelector('#logo');

barba.init({
   views: [
     {
       namespace: 'home',
       beforeEnter(){
         animateSlides();
         logo.href = 'index.html';
       },
       beforeLeave(){
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
        slide.destroy();
       },
     },
     {
       namespace: 'fashion',
       beforeEnter(){
        logo.href = '../index.html';
       }
     },
   ],
   transitions: [
     {
    leave({current, next}){
      let done = this.async();
      window.scrollTo(0, 0);
      // Animation
      const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
      tl.fromTo(current.container, 1, {opacity: 1}, {opacity:0});
      tl.fromTo('.swipe', 0.75, {x: '-100%'}, {x:'0%', onComplete: done}, '-=0.5');
    },
    enter({current, next}){
      let done = this.async();
        // Animation
        const tl = gsap.timeline({defaults: {ease: 'power2.inOut'}});
        tl.fromTo('.swipe', 0.75, {x: '-100%'}, {x:'0%', onComplete: done}, '-=0.5');
        tl.fromTo(next.container, 1, {opacity: 0},);
    },
  }
      ]
});


// EVENT LISTENERS 

burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);


