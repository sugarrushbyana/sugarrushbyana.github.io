$(function() {

    // Smooth scroll to anchor # links
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500, function() {
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

    const $overlay = $('.overlay');

    $('window').resize(() => {
        const winWidth = $(window).width();
        const winHeight = $(window).height();

        console.log(`width: ${winWidth}, height: ${winHeight}`);
    });

    // Navigation interactions
    $('.mobile-navigation-icon, .mobile-navigation a').on('click', function toggleMainMenu() {
        const $mobileNav = $('.js-mobile-nav');
        const $mobileIcon = $('.mobile-navigation-icon');
        // const $menuOverlay = $('.menu-overlay');
        let mobileIconTxt = $mobileIcon.hasClass('visible') ? 'MENU' : 'CLOSE';

        $overlay.toggleClass('visible');
        $mobileNav.toggleClass('visible');
        $mobileIcon.toggleClass('visible');
        // $menuOverlay.toggleClass('visible');

        $overlay.one('click', () => {
            $overlay.toggleClass('visible');
            $mobileNav.toggleClass('visible');
            $mobileIcon.toggleClass('visible');
        });
    });
});