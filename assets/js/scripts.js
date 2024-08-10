var scroll;
/*********************************************
 * WINDOW EVENTS
/*********************************************/
setTimeout(onWindowLoad, 3000);
$(window)
    .on('load', onWindowLoad)
    .on('scroll', onWindowScroll)
/*********************************************
* Actions
/*********************************************/
$(document)
    .ready(onDocumentReady)
    .on('click', '.backtop', function () {
        $('html, body').animate({ scrollTop: 0 });
    })
    .on('click', '.menu-btn', function () {
        $(this).toggleClass('open');
    })

/***************************************************************************
 * CURSOR 
 * *********************/
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

/*********************************************
 * FUNCTIONS
/*********************************************/
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
                $('#loading').fadeOut(function() {
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


function homePage() {
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
/*********************************************/
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















// Array of image URLs
const imageUrls = [
    'https://via.placeholder.com/300/FF5733/FFFFFF?text=Image+1',
    'https://via.placeholder.com/200/33FF57/FFFFFF?text=Image+2',
    'https://via.placeholder.com/500/3357FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/700/57FF33/FFFFFF?text=Image+4',
    'https://via.placeholder.com/300/FF3357/FFFFFF?text=Image+5'
];

// Array to hold preloaded images
const preloadedImages = [];

// Function to preload images
function preloadImages(urls) {
    for (let i = 0; i < urls.length; i++) {
        const img = new Image();
        img.src = urls[i];
        preloadedImages.push(img);
    }
}

// Preload images
preloadImages(imageUrls);

// Get the image element
const imageElement = document.getElementById('randomImage');

// Function to get a random preloaded image
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * preloadedImages.length);
    return preloadedImages[randomIndex].src;
}

// Function to update the image source
function updateImage() {
    imageElement.src = getRandomImage();
}

// Update image every 2 seconds
setInterval(updateImage, 300);

// Initialize with the first image
updateImage();

/*********************************************/
// allMarquee[i].x = 0;
// play();
// elm.addEventListener('mouseenter', () => pause());
// elm.addEventListener('mouseleave', () => play());
// function play() {
//     allMarquee.forEach((m, i) => {
//         m.x -= (0.5 * (i + 0.1));
//         m.settle(m.x);
//         // m.requestId = window.requestAnimationFrame(play);
//     })
// }
// function pause(m) {
//     if (m.requestId) {
//         window.cancelAnimationFrame(m.requestId)
//         m.requestId = undefined;
//     }
// }
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

// allMarquee[i] = new Flickity(elm, {
//     accessibility: true,
//     resize: true,
//     wrapAround: true,
//     prevNextButtons: false,
//     pageDots: false,
//     percentPosition: true,
//     setGallerySize: true,
// });