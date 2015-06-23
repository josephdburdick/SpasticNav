(function($) {
	'use strict';

	$.fn.spasticNav = function(options) {
	
		options = $.extend({
			overlap : 7,
			speed : 500,
			reset : 1500,
			easing : 'linear'
		}, options);
	
		return this.each(function() {
			
		 	var nav = $(this),
		 		hasMoved = false,
		 		isSelected = $('#nav-primary-selected', nav).length ? true : false,
		 		currentPageItem = function(){

		 			// if primary nav item selected use it
		 			if ($('#nav-primary-selected', nav).length){
		 				return $('#nav-primary-selected', nav);
		 			} else {
						return nav.find('li').first();	
		 			}
		 		},
		 		blob,
		 		reset,
		 		transition;

		 	$('<li id="primary-nav-blob"></li>').css({
		 		width : currentPageItem().outerWidth(),
		 		height : currentPageItem().outerHeight() + options.overlap,
		 		left : isSelected ? currentPageItem().position().left : $(this).position().left,
		 		top : currentPageItem().position().top - options.overlap / 2,
		 		opacity: isSelected ? 1 : 0
		 	}).appendTo(this);
		 	
		 	blob = $('#primary-nav-blob', nav);

		 	if (!isSelected && !hasMoved){
		 		$('body').on('mousemove', function(e){
					if (!hasMoved){
						var positionX;
						setTimeout(function(){
							positionX = e.clientX - nav.offset().left - (blob.outerWidth() / 2);
							blob.css({left: positionX + 'px'});
							hasMoved = true;
						}, 300);
					}
					else{
						$('body').off('mousemove');
					}
				});
		 	}
		 	
					 	
			$('li:not(#primary-nav-blob)', nav).hover(function() {
				// mouse over
				transition = {
					left : $(this).position().left,
					width : $(this).width(),
					opacity: 1
				};
				clearTimeout(reset);
				reset = setTimeout(function() {
					if(!Modernizr.csstransitions){
						blob.animate(transition,
						{
							duration : options.speed,
							easing : options.easing,
							queue : false
						});
					}
					else{
						blob.css(transition);
					}
				}, options.speed * 0.85);

				hasMoved = true;
			}, function() {

				// mouse out	
				transition = {
					width : currentPageItem().outerWidth(),
					left : isSelected ? currentPageItem().position().left : $(this).position().left,
					opacity: isSelected ? 1 : 0
				};

				reset = setTimeout(function() {
					if(!Modernizr.csstransitions){
						blob.animate(transition, options.speed);
					}
					else{
						blob.css(transition);
					}
					
				}, options.reset);
				
			});
		 
		
		}); // end each
	
	};

})(jQuery);