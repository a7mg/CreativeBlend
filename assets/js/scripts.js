var scroller;
const allMarquee = [];
var marqueeOpt = {
    accessibility: true,
    wrapAround: true,
    setGallerySize: true,
    // ImagesLoaded: true,
    resize: true,
    prevNextButtons: false,
    pageDots: false,
    pauseAutoPlayOnHover: true,
    percentPosition: true,
    selectedAttraction: 0.001,
    // friction: 0.9,
}


var lang = localStorage.getItem('language') || 'en';
// $('html').attr('dir', lang == 'en' ? 'ltr' : 'rtl').attr('lang', lang);
// setTimeout(() => {
//     $('.lang-btn').text(lang == 'ar' ? 'En' : 'عربي');
// }, 100);
/*=====================================*
 * WINDOW EVENTS
/*=====================================*/
setTimeout(onWindowLoad, 3000);
$(window)
    .on('load', onWindowLoad)
    .on('scroll', onWindowScroll)
/*=====================================*
* Actions
/*=====================================*/
$(document)
    .ready(onDocumentReady)
    .on('click', function (e) {
        $('.country-list ul').removeClass('active');
    })
    .on('click', '.country-list .current', function (e) {
        e.stopPropagation();
    })
    .on('click', '.backtop', function () {
        $('html, body').animate({ scrollTop: 0 });
    })
    .on('click', 'header .menu-btn', function () {
        $(this).toggleClass('open');
        $('header').toggleClass('menu-opend');
    })
    .on('click', '.hero-bottom .play-btn', function () {
        $('.popup').addClass('active');
        $('.hero-bottom').fadeOut();
    })
    .on('click', '.popup .close', function () {
        $('.popup').removeClass('active');
        $('.hero-bottom').fadeIn();
    })
    .on('click', '.country-list .current', function () {
        $(this).next('ul').toggleClass('active');
    })

/*=====================================*
 * CURSOR 
/*=====================================*/
$(document)
    .ready(function () {
        $(".project-wrapper .project-image").hover(function () {
            $('.cursor').addClass('active');
            $(this).addClass('active');
            $(this).find('video').get(0).currentTime = 0;
            $(this).find('video').get(0).play();
        }, function () {
            $('.cursor').removeClass('active');
            $('.project-wrapper .project-image').removeClass('active');
            $(this).find('video').get(0).pause();
        });
    })
    .on('mousemove', function (e) {
        setTimeout(() => {
            $('.cursor').css({ top: e.clientY + 20, left: e.clientX + 20 });
        }, 200);
    })

/*=====================================*
 * FUNCTIONS
/*=====================================*/
function onDocumentReady() {
    $("header").load("partial/header.html");
    $("footer").load("partial/footer.html");
    gsap.config({ nullTargetWarn: false });
    gsap.registerPlugin(SplitText, ScrollTrigger);
    preLoading()
    initScroll()
}

function preLoading() {
    // $('#loading').fadeOut(function () {
    //     $('body').addClass('ready');
    // });
    // return
    var preloadingTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    preloadingTL.fromTo('#logoIconGroub', { opacity: 0, x: '100%' }, { opacity: 1, x: 0 })
    preloadingTL.from('#logoLettersGroub path, #logoLettersGroub rect', {
        opacity: 0, x: '100%', ease: 'circ', stagger: 0.1, duration: 0.5,
        onComplete: function () {
            if ($('body').hasClass('loaded')) {
                $('#loading').fadeOut(function () {
                    $('body').addClass('ready');
                });
                preloadingTL.pause();

                // logoIcon();
            }
        }
    }, 0.5);
}

function logoIcon() {
    setTimeout(() => {
        var logoTL = gsap.timeline({ repeat: -1, repeatDelay: 5 });
        // , yoyo: true
        let elem = 'header .icon img.black, header .icon img.white';
        logoTL.fromTo(elem, { rotate: 0 }, { rotate: 70, duration: 1 });
        logoTL.fromTo(elem, { x: 0, y: 0 }, { x: '100%', y: 0, ease: 'linear', repeat: 3, yoyo: true });
        logoTL.fromTo(elem, { rotate: 70 }, { rotate: 0, duration: 1 });
    }, 5000);
}

function initScroll() {
    scroller = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05
    });
    scroller.update();
    scroller.on('scroll', (event) => {
        // event.scroller.y
        headerTheme();
        ScrollTrigger.update();
    });
    ScrollTrigger.scrollerProxy(
        '#html', {
        scrollTop(value) {
            if (scroller.scroll.instance.scroll.y > $(window).height()) {
                $("header").addClass('header-icon');
            } else {
                $("header").removeClass('header-icon');
            }
            // if (scroller.scroll.instance.scroll.y > 100) {
            //     $('.navbar').addClass('navbar-has-background');
            //     $('#top-btn').css('display', 'block')
            // } else {
            //     $('.navbar').removeClass('navbar-has-background');
            //     $('#top-btn').css('display', 'none')
            // }
            return arguments.length ?
                scroller.scrollTo(value, 0, 0) :
                scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
    })
    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();
}

function onWindowLoad() {
    $('body').addClass('loaded');
    // Pages
    global();
    //
    if ($('.home-hero').length) {
        homePage();
    }
    scroller.update();
}

function onWindowScroll() {
    if ($(window).scrollTop() > $(window).height() / 2) {
        $(".backtop").addClass('show');
    } else {
        $(".backtop").removeClass('show');
    }
    headerTheme();
}

function global() {
    headerTheme();
    projectsGallery();
    audioPlayer();
    $('footer .marquee').each((i, n) => {
        marqueeOpt.autoPlay = 5000;
        allMarquee[i] = $(n).flickity(marqueeOpt)
    })

    // Our value section
    let valueTl = gsap.timeline();
    valueTl.fromTo('.our-value .section-title .border', 0.8, { width: 0, opacity: 0 }, { width: '100%', opacity: 1 }, 0);
    valueTl.fromTo('.our-value .section-title h2', 0.5, { y: '100%', opacity: 0 }, { y: 0, opacity: 1 });
    let splitValueLines = new SplitText(".our-value .content p", { type: "lines, words" });
    valueTl.staggerFrom(splitValueLines.lines, 0.8, { x: 100, autoAlpha: 0 }, 0.1, 0.5);
    ScrollTrigger.create({
        trigger: ".our-value",
        start: "top 70%",
        toggleActions: "restart pause resume reset",
        animation: valueTl.play()
    })
    // End Our value section

    $('.partners .marquee-wrapper').each((i, n) => {
        var options = { ...marqueeOpt };
        options.setGallerySize = false;
        options.rightToLeft = $(n).hasClass('right');
        options.autoPlay = 3000;
        allMarquee[i] = $(n).flickity(options)
    })

    teamSlider();
}

function teamSlider() {
    $('.team-slider').flickity({
        cellAlign: 'left',
        contain: true,
        // freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
    });
}

function projectsGallery() {
    // ProjectGallery
    var activeIndx = 0,
        images = $('#projectGallery img'),
        zIndx = 1,
        time = 800,
        pintr = setInterval(() => {
            if ($('#projectGallery img.active').length == 3) {
                images.removeClass('active');
            }
            images.eq(activeIndx).addClass('active').css('z-index', zIndx);
            activeIndx = (activeIndx + 1) % images.length;
            zIndx++;
            if (zIndx == 99) { zIndx = 1; }
        }, 800);
    // End ProjectGallery
}
/*=====================================*/
function homePage() {
    document.querySelector('.home-hero').addEventListener("mousemove", (e) => {
        animateImages(e, '.shape');
    });

    // Projects section
    // gsap.fromTo('.projects .section-title', 0.5, { width: 0, opacity: 0 }, {
    //     width: '100%', opacity: 1,
    //     scrollTrigger: {
    //         start: "top 50%",
    //         toggleActions: "restart pause resume reset",
    //         trigger: '.projects .featured'
    //     }
    // });
    const featuredProject = gsap.utils.toArray(".projects .project-image");
    featuredProject.forEach((project) => {
        gsap.fromTo(project, .8, { xPercent: -100, ease: Power2.out }, {
            xPercent: 0, scrollTrigger: {
                start: "top 60%",
                toggleActions: "restart pause resume reset",
                trigger: project
            }
        })
        gsap.fromTo(project.children, .8, { xPercent: 100, scale: 1.3, delay: -.8, ease: Power2.out }, {
            xPercent: 0, scale: 1, scrollTrigger: {
                start: "top 60%",
                toggleActions: "restart pause resume reset",
                trigger: project
            }
        });
        // gsap.fromTo(project, {
        //     'clip-path': 'inset(10% 20% 0 20% round 4px)'
        // }, {
        //     'clip-path': 'inset(0% 0% round 4px)',
        //     scrollTrigger: {
        //         markers: true,
        //         start: "top 50%",
        //         toggleActions: "restart pause resume reset",
        //         trigger: project
        //     }
        // });
    });
    // End Projects section

    // Partners section
    // let partnersTl = gsap.timeline();
    // let splitpartnersHead = new SplitText(".partners .head-text", { type: "lines, words" });
    // partnersTl.staggerFrom(splitpartnersHead.lines, 0.8, { x: 200, autoAlpha: 0 }, 0.1);

    // const partnersMarquees = gsap.utils.toArray(".partners .marquee");
    // partnersMarquees.forEach((marquee) => {
    //     if ($(marquee).find('.marquee-wrapper').hasClass('right')) {
    //         partnersTl.fromTo(marquee, 0.5, { xPercent: -100 }, { xPercent: 0 }, 0);
    //     } else {
    //         partnersTl.fromTo(marquee, 0.5, { xPercent: 100 }, { xPercent: 0 }, 0);
    //     }
    // })
    // partnersTl.from('.partners .marquee', 0.5, { xPercent: 100 }, 0.5);
    // ScrollTrigger.create({
    //     trigger: ".partners",
    //     start: "top 30%",
    //     toggleActions: "restart pause resume reset",
    //     animation: partnersTl.play()
    // })
}
/*=====================================*/
function headerTheme() {
    $('header').removeClass('dark');
    let scroll = $(window).scrollTop() + $('header').height();
    $('.dark-header').each((i, element) => {
        if (
            $(element).isInViewport() &&
            scroll >= $(element).offset().top &&
            (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            $('header').addClass('dark');
        }
    });
    $('.dark-bg').each((i, element) => {
        if (
            $(element).isInViewport() &&
            scroll >= $(element).offset().top &&
            (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            $('header').removeClass('dark');
        }
    });
}
const animateImages = (event, el, limit = 100) => {
    document.querySelectorAll(el).forEach((el) => {
        let xPos = event.clientX / window.innerWidth - 0.5,
            yPos = event.clientY / window.innerHeight - 0.5;
        gsap.to(el, 0.5, {
            y: xPos * limit,
            x: yPos * limit,
            ease: 'none'
        })
    })
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
