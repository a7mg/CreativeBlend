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