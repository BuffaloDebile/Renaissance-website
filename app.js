let controller;
let slideScene;

const slides = document.querySelectorAll(".slide");
const nav = document.querySelector(".nav-header");

slides.forEach((slide) => {
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
      markers: true,
      toggleActions: "play none none none",
    },
  });
  
  tl.fromTo(img, { scale: 2 }, { scale: 1 })
    .fromTo(imgReveal, { x: "0%" }, { x: "100%" }, "-=1")
    .fromTo(textReaveal, { x: "0%" }, { x: "100%" }, "-=0.75")
    .fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    //Create scene
    


});


