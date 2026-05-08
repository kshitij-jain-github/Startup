

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Cursor System
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX - 14, y: e.clientY - 14, duration: 0.15 });
    });

    // Interactive elements scaling for cursor
    const interactive = document.querySelectorAll('button, a, .bento-card, .project-item');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 2.5, backgroundColor: 'rgba(232, 213, 181, 0.1)', borderColor: 'transparent', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: '#E8D5B5', duration: 0.3 });
        });
    });

    // Hero Animations
    // Cinematic Split Text Reveal

    // Premium Cinematic Hero Reveal

    const heroTL = gsap.timeline();

    heroTL

        .to(".hero-left", {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.12,
            ease: "expo.out"
        })

        .to(".hero-right", {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "expo.out"
        }, "-=1")

        .to(".hero-bottom", {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "expo.out"
        }, "-=1.1")

        .to(".hero-subtext", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out"
        }, "-=0.8")

        .to(".hero-btns", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out"
        }, "-=0.8");
    // Scroll Progress
    gsap.to('#progress-bar', {
        width: '100%',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2
        }
    });

    // Bento Grid reveal
    gsap.utils.toArray('.bento-card').forEach((card, i) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            delay: i * 0.1
        });
    });

    // Project Items reveal
    gsap.utils.toArray('.project-item').forEach(item => {
        gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
            }
        });
    });
    // Mouse Reactive Background
    document.addEventListener("mousemove", (e) => {

        gsap.to(".orb-one", {
            x: e.clientX * 0.02,
            y: e.clientY * 0.02,
            duration: 3
        });

        gsap.to(".orb-two", {
            x: -e.clientX * 0.015,
            y: -e.clientY * 0.015,
            duration: 3
        });

    });
    // Reveal Headlines
    gsap.utils.toArray('h3').forEach(h3 => {
        gsap.from(h3, {
            x: -50,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: h3,
                start: 'top 85%'
            }
        });
    });

    // Background Parallax for Project Images
    gsap.utils.toArray('.project-item img').forEach(img => {
        gsap.to(img, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                scrub: true
            }
        });
    });
});
// Mobile Menu
// Apple Style Mobile Menu

const mobileMenu = document.getElementById('mobile-menu');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

const menuTimeline = gsap.timeline({ paused: true });

menuTimeline
    .to(mobileMenu, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: "power3.out"
    })

    .to('.mobile-link-text', {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out"
    }, "-=0.1");

openMenu.addEventListener('click', () => {
    menuTimeline.play();
});

closeMenu.addEventListener('click', () => {
    menuTimeline.reverse();
});

// Close after click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuTimeline.reverse();
    });
});
// Running Hero Text Animation
// Premium Running Word Reveal

const words = [
    "cinematic",
    "premium",
    "immersive",
    "luxury",
    "modern",
    "iconic"
];

const changingText = document.getElementById("changing-text");
const textWrapper = document.getElementById("text-wrapper");

let wordIndex = 0;

// Dynamic Width Fix
const measure = document.createElement("span");

measure.style.position = "absolute";
measure.style.visibility = "hidden";
measure.style.whiteSpace = "nowrap";
measure.style.fontSize = getComputedStyle(changingText).fontSize;
measure.style.fontFamily = getComputedStyle(changingText).fontFamily;

document.body.appendChild(measure);

let maxWidth = 0;

words.forEach(word => {
    measure.innerText = word;
    maxWidth = Math.max(maxWidth, measure.offsetWidth);
});

textWrapper.style.width = `${maxWidth + 20}px`;

// Cinematic Word Animation
setInterval(() => {

    gsap.to(changingText, {
        x: 100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {

            wordIndex = (wordIndex + 1) % words.length;

            changingText.textContent = words[wordIndex];

            gsap.fromTo(
                changingText,
                {
                    x: -100,
                    opacity: 0,
                    filter: "blur(10px)"
                },
                {
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "expo.out"
                }
            );

        }
    });

}, 2500);
