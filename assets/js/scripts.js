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
    gsap.config({ nullTargetWarn: false });
    gsap.registerPlugin(SplitText, ScrollTrigger);
    preLoading()
}

function preLoading() {
    var preloadingTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    preloadingTL.fromTo('#logoIconGroub', { opacity: 0, x: '100%' }, { opacity: 1, x: 0 })
    preloadingTL.from('#logoLettersGroub path, #logoLettersGroub rect', {
        opacity: 0, x: '100%', ease: 'circ', stagger: 0.1, duration: 0.5,
        onComplete: function () {
            if ($('body').hasClass('loaded')) {
                $('#loading').fadeOut();
                preloadingTL.pause();
            }
        }
    }, 0.5)
}

function onWindowLoad() {
    $('body').addClass('loaded');
    homePage();
}

function homePage() {
    partnersSliders();
}

function partnersSliders() {
    // var slider = $('.partners .slider-wrapper');
    // slider.flickity({
    //     accessibility: true,
    //     resize: true,
    //     wrapAround: true,
    //     prevNextButtons: false,
    //     pageDots: false,
    //     percentPosition: true,
    //     setGallerySize: true,

    //     // rightToLeft: true,
    //     // cellAlign: 'center',
    //     // contain: true,
    //     // freeScroll: true,
    //     // prevNextButtons: false,
    //     // pageDots: false,
    //     // autoPlay: 1500,
    // });
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

let marqueeSlider = document.querySelector('.partners .slider-wrapper');
let mainTicker = new Flickity('.partners .slider-wrapper', {
  accessibility: true,
  resize: true,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  percentPosition: true,
  setGallerySize: true,
});

// Set initial position to be 0
mainTicker.x = 0;

// Start the marquee animation
play();

function play() {
  // Set the decrement of position x
  mainTicker.x -= 1.5;
  mainTicker.settle(mainTicker.x);
  requestId = window.requestAnimationFrame(play);
}

// Main function to cancel the animation.
function pause() {
  if(requestId) {
    // Cancel the animation
    window.cancelAnimationFrame(requestId)

    // Reset the requestId for the next animation.
    requestId = undefined;
  }
}

// Pause on hover/focus
marqueeSlider.addEventListener('mouseenter', () => pause());

// Unpause on mouse out / defocus
marqueeSlider.addEventListener('mouseleave', () => play());