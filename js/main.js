(function ($) {
	"use strict";

    /* Preloading JS */
    $(window).load(function() {
	    $('.preloader-wrap').fadeOut('500', function() {
            $(this).remove();
        });
	});

	/* ScrollToTop JS */
    $(window).scroll(function() {
    	var wScroll = $(this).scrollTop();
    	if (wScroll > 800) {
    		$('.scroll-to-top').fadeIn('slow');
    	} else {
    		$('.scroll-to-top').fadeOut('slow');
    	}
    });
    $('.scroll-to-top').on('click', function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	/* Sticky Menu JS */
	$('#mainmenu').sticky({topSpacing:0});

	$('#navMenu li a').on('click', function() {
            $('#navMenu').removeClass('in');
    });

    /* Smooth scroll Js*/
	$('.navbar-nav li a, .home-arrow-down a').on('click', function(event) {
		   $('.navbar-nav li a, .home-arrow-down a').parent().removeClass('active');
        var $anchor = $($(this).attr('href')).offset().top - 60;
		   $(this).parent().addClass('active');
        $('body, html').animate({scrollTop : $anchor}, 800);
					 event.preventDefault();
        return false;
    });

    /* Wow JS */
	new WOW().init();

	/* Mixutup JS */
	$('#portfolio-items').mixItUp({
		animation: {
			effects: 'fade translateZ(-100px)',
			duration: 1000
		}
	});

	/* Venobox JS */
    $('.vbox-popup').venobox({
    	numeratio: true,
        infinigall: true
    });

	/* client-reviews-slider JS */
	$('#client-reviews-slider').owlCarousel({
	    loop: true,
	    margin: 0,
	    smartSpeed: 2000,
	    nav: false,
	    addClassActive: true,
	    animateOut: 'slideOutDown',
		animateIn: 'flipInX',
	    dots: true,
	    autoplay: true,
	    autoplayTimeout: 50000000,
	    responsiveClass: true,
	    responsive: {
	        0: {
	            items: 1,
	        },
	        600: {
	            items: 1,
	        },
	        1000: {
	        	items: 1,
	        }
	    }
	});

	$(function () {
        // Get the form.
        var form = $('#contact-form');

        // Get the messages div.
        var formMessages = $('#error-message');

        var ajaxLoad = $('#ajaxLoad');

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            form.css({opacity: 0.3});
            ajaxLoad.show();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            }).done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('erro');
                $(formMessages).addClass('sucesso');
                // Set the message text.
                $(formMessages).text(response);
                // Clear the form.
                $('#name').val('');
                $('#email').val('');
                $('#subject').val('');
                $('#message').val('');
                form.css({opacity: 1});
                ajaxLoad.hide();
            }).fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('sucesso');
                $(formMessages).addClass('erro');
                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Opa! Ocorreu um erro e sua mensagem não pode ser enviada.');
                }
                form.css({opacity: 1});
                ajaxLoad.hide();
            });
        });
    });

	/* Parallex Js*/
    $(window).stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
    });

})(jQuery);
