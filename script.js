document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis smooth scrolling
  const initSmoothScrolling = () => {
    const lenis = new Lenis({
      lerp: 1,
      smooth: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);
  };
  initSmoothScrolling();
});

function nav() {
  let lastScrollTop = 0;
  const navbar = document.getElementById("nav");
  const threshold1 = window.innerHeight * 3.2;
  const threshold2 = window.innerHeight * 3.5;
  const menuItems = document.querySelectorAll(".McButton > b");

  function setNavbarInitialStyles() {
    navbar.style.backgroundColor = "transparent";
    navbar.style.color = "#fff";
    menuItems.forEach((item) => (item.style.backgroundColor = "#fff"));
  }

  function setNavbarHoverStyles() {
    navbar.style.backgroundColor = "white";
    navbar.style.color = "#000";
    menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
  }

  navbar.addEventListener("mouseenter", function () {
    setNavbarHoverStyles();
  });

  navbar.addEventListener("mouseleave", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
    } else {
      setNavbarInitialStyles();
    }
  });

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));

      if (scrollTop > lastScrollTop && scrollTop > threshold2) {
        navbar.style.top = "-160px";
      } else {
        navbar.style.top = "0";
      }
    } else {
      setNavbarInitialStyles();
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });

  const button = document.querySelector(".burger-button");
  const mainNav = document.querySelector("#main-nav");
  const hideHoja = document.querySelector("#hide-hoja");
  const teslaSvgPath = document.querySelector(".tesla-svg-path");

  button.addEventListener("click", () => {
    button.classList.toggle("clicked");
    mainNav.classList.toggle("clicked");
    hideHoja.classList.toggle("clicked");
    teslaSvgPath.classList.toggle("clicked");
  });
}

function p1() {
  const tl1 = gsap.timeline(
    {
      scrollTrigger: {
        trigger: "#bg-image",
        start: "top top",
        end: "+=250%",
        scrub: 2,
        pin: "#bg-image",
      },
    },
    "a"
  );

  gsap.to("#bg-image", {
    width: "92%",
    left: "calc(50% - 46%)",
    scrollTrigger: {
      trigger: "#pinned-content",
      start: "top -60%",
      end: "+=150%",
      scrub: 0.5,
    },
  });
}

const animateWords = (el) => {
  gsap.set(el, { "font-kerning": "none" });

  // Apply SplitType
  const st = new SplitType(el, { types: "lines, words" });
  const lines = st.lines;

  const tl = gsap
    .timeline({
      delay: 1,
      scrollTrigger: {
        trigger: el,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: el,
      },
    })
    .set(el, { perspective: 1000 });

  for (const [linepos, line] of lines.entries()) {
    gsap.set(line, { transformStyle: "preserve-3d" });

    const words = line.querySelectorAll(".word");

    tl.to(
      words,
      {
        ease: "back.inOut",
        opacity: 0,
        rotationY: (pos, _, arr) =>
          pos > arr.length / 2
            ? Math.abs(pos - arr.length / 2) * -15
            : Math.abs(pos - arr.length / 2) * 15,
        z: () => gsap.utils.random(-1000, -500),
        stagger: {
          each: 0.02,
          from: "center",
        },
      },
      linepos * 0.05
    );
  }
};

const scroll = () => {
  [...document.querySelectorAll("[data-split]")].forEach((el) => {
    animateWords(el);
  });
};

function page2() {
  let allh1 = document.querySelectorAll("#page2 h1");
  allh1.forEach(function (elem) {
    let content = "";
    h1 = elem.textContent;
    let splittedText = h1.split("");
    splittedText.forEach(function (e) {
      content += `<span>${e}</span>`;
    });
    elem.innerHTML = content;
  });

  gsap.to("#page2 h1 span", {
    scrollTrigger: {
      trigger: "#page2 h1",
      start: "top 90%",
      end: "+=50%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.05,
    ease: "power2.inOut",
  });

  gsap.to("#page2-p1", {
    opacity: 1,
    scrollTrigger: {
      trigger: "#page2-p1",
      start: "top 70%",
      end: "+=50%",
      scrub: 1,
    },
  });

 

  const photos = gsap.utils.toArray(".desk-img:not(:first-child)");
  gsap.set(photos, { yPercent: 101, scale: 3, transformOrigin: 'top center' });
  
  const animation = gsap.to(photos, {
    yPercent: 0,
    scale: 1,
    duration: 1,
    stagger: 1,
  });
  
  ScrollTrigger.create({
    trigger: "#scroll-effect",
    start: "top top",
    end: "bottom bottom",
    pin: "#scroll-right",
    animation: animation,
    scrub: true,
  });
  


}


function page3(){
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=950%",
      scrub: 1,
      y:"950%",
      pin:true,
    },
  })

  tl.to(".showcase-ctn",{
    scrollTrigger:{
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=150%",
      scrub: 1,
    },
    "clip-path":" inset(0% 0% 100%)",
    ease: Power2
  })

  
  gsap.to(".texte-circle-img", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "linear"
  });

  tl.to("#showcase-pin",{
    scrollTrigger:{
      trigger: "#showcase-scroll>h1",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (.5, .5)
  })


  tl.to("#showcase-pin",{
    scrollTrigger:{
      trigger: "#showcase-scroll>h2",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (1,1)
  })

}

nav();
p1();
scroll();
page2();
page3()
