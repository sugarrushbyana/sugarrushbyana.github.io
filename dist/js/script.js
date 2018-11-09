'use strict';

$(function () {

    // Smooth scroll to anchor # links
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.focus();
                    };
                });
            }
        }
    });

    var $overlay = $('.overlay');

    $('window').resize(function () {
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        console.log('width: ' + winWidth + ', height: ' + winHeight);
    });

    // Navigation interactions
    $('.mobile-navigation-icon, .mobile-navigation a').on('click', function toggleMainMenu() {
        var $mobileNav = $('.js-mobile-nav');
        var $mobileIcon = $('.mobile-navigation-icon');
        // const $menuOverlay = $('.menu-overlay');
        var mobileIconTxt = $mobileIcon.hasClass('visible') ? 'MENU' : 'CLOSE';

        $overlay.toggleClass('visible');
        $mobileNav.toggleClass('visible');
        $mobileIcon.toggleClass('visible');
        // $menuOverlay.toggleClass('visible');

        $overlay.one('click', function () {
            $overlay.toggleClass('visible');
            $mobileNav.toggleClass('visible');
            $mobileIcon.toggleClass('visible');
        });
    });

    particlesJS.load('particles-js', '../../json/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
});