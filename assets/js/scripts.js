var scroll;
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
    .on('click', '.backtop', function () {
        $('html, body').animate({ scrollTop: 0 });
    })
    .on('click', '.menu-btn', function () {
        $(this).toggleClass('open');
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
    // $("footer").load("partial/footer.html");
    gsap.config({ nullTargetWarn: false });
    gsap.registerPlugin(SplitText, ScrollTrigger);
    preLoading()
    initScroll()
}

function preLoading() {
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
            }
        }
    }, 0.5)
}

function initScroll() {
    scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.05
    });
    scroll.update();
    scroll.on('scroll', (event) => {
        // event.scroll.y
        headerTheme();
    });
}

function onWindowLoad() {
    $('body').addClass('loaded');
    scroll.update();

    homePage();
}
/*=====================================*/
function homePage() {
    document.querySelector('.home-hero').addEventListener("mousemove", (e) => {
        animateImages(e, '.shape');
    });


    const marqueeElem = document.querySelectorAll(".marquee");
    const allMarquee = [];
    marqueeElem.forEach((elm, i) => {
        allMarquee[i] = new Flickity(elm, {
            accessibility: true,
            resize: true,
            wrapAround: true,
            prevNextButtons: false,
            pageDots: false,
            percentPosition: true,
            // setGallerySize: true,
            autoPlay: $(elm).data('speed') || 3000,
            pauseAutoPlayOnHover: true,
            selectedAttraction: 0.001,
            // friction: 0.9,
            rightToLeft: $(elm).hasClass('right')
        });
    })
}

$.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function onWindowScroll() {
    if ($(window).scrollTop() > $(window).height() / 2) {
        $(".backtop").addClass('show');
    } else {
        $(".backtop").removeClass('show');
    }
    headerTheme();
}
/*=====================================*/
function headerTheme() {
    $('header').removeClass('dark');
    let scroll = $(window).scrollTop() + $('header').height();
    $('.dark-header').each((i, element) => {
        if (
            $(element).isInViewport()
            && scroll >= $(element).offset().top
            && (scroll <= $(element).offset().top + $(element).innerHeight())
        ) {
            $('header').addClass('dark');
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

// ProjectGallery
var activeIndx = 0,
    images = $('#projectGallery img'),
    zIndx = 1,
    pintr = setInterval(() => {
        if ($('#projectGallery img.active').length == 3) {
            images.removeClass('active');
        }
        images.eq(activeIndx).addClass('active').css('z-index', zIndx);
        activeIndx = (activeIndx + 1) % images.length;
        zIndx++;
        if (zIndx == images.length) { zIndx = 1; }
    }, getRandomArbitrary(100, 600));
// End ProjectGallery