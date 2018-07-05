$(function() {







    $(function() {
        var backToTop = {
            element: $('#I2_nextButton'),
            offset: 350,
            duration: 350
        };

        backToTop.element.on('click', function() {
            $('html, body').animate({
                scrollTop: 500
            }, backToTop.duration);
            return false;
        });
    });


    //Mob-menu
	$('#mob-burger').click(function(){
		$(this).toggleClass('open');
		$('#header-menu-js').toggleClass('open');
		$(".mob-menu__bg").toggle();
	});

	function windowSize(){
	if ($(window).width() >= '992'){
	    $('#mob-burger').removeClass('open');
	    $('#header-menu-js').removeClass('open');
	    $(".mob-menu__bg").fadeOut();
	  }
	} 
	$(window).on('load resize',windowSize);

	//Popup
 	$('.popup-js').magnificPopup({
    	closeMarkup: '<div class="video-close" onClick=" $.magnificPopup.close()"></div>',
        type: 'iframe',
    });



	//Accordion
	$('.accordion-js > .accordion-item-js:eq(0) .accordion-btn-js').addClass('active').next().slideDown();

	$('.accordion-js .accordion-btn-js').click(function(j) {
	    var dropDown = $(this).closest('.accordion-item-js').find('.accordion-contant-js');

	    $(this).closest('.accordion-js').find('.accordion-contant-js').not(dropDown).slideUp();

	    if ($(this).hasClass('active')) {
	        $(this).removeClass('active');
	    } else {
	        $(this).closest('.accordion-js').find('.accordion-btn-js.active').removeClass('active');
	        $(this).addClass('active');
	    }

	    dropDown.stop(false, true).slideToggle();

	    j.preventDefault();
	});


	// Post Ajax
	$("#feedback-form").submit(function() {
		var str = $(this).serialize();
        $.ajax ({
			url: "/mail.php",
			type: "POST",
			data: str,
			success: function () {
	            $('#feedback-form').trigger( 'reset' );
	            $.magnificPopup.open({
				  items: {
				    src: '#feedback_popup', 
				    type: 'inline'
				  }
				});
            }
		})
		return false;
    });


});
