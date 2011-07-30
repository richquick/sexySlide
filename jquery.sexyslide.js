(function($){
 
    $.fn.extend({ 
         
        //pass the options variable to the function
        sexySlide: function(options) {
 
 			//Handy for CSS
			$('body').addClass('js');
			
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                margin: 10,
                thumbs : false,
                iconsStart: true,
				iconsFade: true,
				vertical: false,
				dots: false,
				slideTime: 400
            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
                var o = options;
                var slideDrawer = $(this);
				
				// Wrap 
				slideDrawer.wrap('<div class="sexySlide-outer" />').parent().wrap('<div class="sexySlide-container" />').before('<div class="sexySlide-box" />');
				
				var slideContainer = $('.sexySlide-container'); // So we can reuse it
				slideContainer.prepend('<div class="sexySlide-links"><a href="#" class="lnk-next">next</a><a href="#" class="lnk-prev">prev</a></div>');
				
               	if (o.thumbs == true) {
					// Duplicate the slide drawer as another list, so we can use for thumbnails
					thumbList = slideDrawer.html();
					thumbList = '<ul class="sexySlide-thumbs">' + thumbList + '</ul>';
					slideContainer.append(thumbList);
					
					$('.sexySlide-thumbs li img').wrap('<a href="#" />');	
				}
				
				// Store the sexySlide box as a variable, so we can calculate the width later
				var sexyBox = $('.sexySlide-box');
				
				// Work out the size of the list
				var sexySize = slideDrawer.children("li").length;
				
				// Duplicate the last LI at the start of the list
				var lastLI = '<li>' + $('li:last-child', slideDrawer).html() + '</li>';
				slideDrawer.prepend(lastLI);
				
				// Duration of the slide, in thousandths of a second
				slideTime = o.slideTime;
			
				// Set a counter, so we know which portolio piece we're on
				var currentPos = 1;
			
				// Disable slides - while in animation
				var theslides = $(".lnk-next, .lnk-prev");
				theslides.each(function() {
					$(this).attr('rel', 'enabled');
				});
				function disableslides() {
					theslides.each(function() {
						$(this).attr('rel', 'disabled');
						$('.sexySlide-thumbs li a').attr('rel', 'disabled');
					});
				};
				function enableslides() {
					theslides.each(function() {
						$(this).attr('rel', 'enabled');
						$('.sexySlide-thumbs li a').attr('rel', 'enabled');
					});
				};
				
				// Set the size of the slide drawer
				var drawerSize = (sexySize + 1) * sexyBox.width();
				slideDrawer.attr('style', 'width: ' + drawerSize + 'px;');
				
				// Adjust various meansurements if the layout is resized

				var sexyBoxSize = sexyBox.width();
				$(window).resize(function() {
					if (sexyBoxSize != sexyBox.width()) {
						sexyBoxSize = sexyBox.width();
						slideDistance = sexyBoxSize;
						drawerSize = ((sexySize + 1) * sexyBoxSize);
						if (currentPos <= 0) {
							slideDrawer.attr('style', 'left: 0px; ' + 'width: ' + drawerSize + 'px !important;');
						} else {
							slideDrawer.attr('style', 'left: -' + (currentPos * slideDistance) +  'px; ' + 'width: ' + drawerSize + 'px !important;');
						}
						
						$('.js .sexySlide-outer, .js .slide li').css('width', sexyBoxSize + 'px;');
						$('.js .sexySlide-container').css('width', sexyBoxSize +  + 'px;');
					}
				});
				
				var cPos = 0;
				var totalThumbs = $('.sexySlide-thumbs li').length;
				
				
				slideMe = function (direction) {
					// Distance of the slide, in pixels - calculated based on width of the page / holding box
					var slideDistance = sexyBox.width();
					var textShow = slideDrawer.attr('style') + ' : ' + slideDistance + ' : ' + currentPos + ' : ' + sexySize + ' : ' + direction;
				
					// If we've reached the end OR beginning of the list AND we're going forward, go back to the beginning
					if ((currentPos >= sexySize || currentPos <= 0) && direction == '-') {
						slideDrawer.attr('style', 'left: 0px; width: ' + drawerSize + 'px;');
						currentPos = 0;
					} else if ((currentPos >= sexySize || currentPos <= 0) && direction == '+') {
						// If we've reached the end OR beginning of the list AND we're going backwards, go forward to the end
						slideDrawer.attr('style', 'left: -' + (sexySize * slideDistance) +  'px; width: ' + drawerSize + 'px;');
						currentPos = sexySize;
					}
					
					slideDrawer.animate({
						left: direction + '=' + slideDistance
					}, slideTime, function() {
						// Animation complete.
						enableslides();
					});
					
					// Remove current class from all lis
					$('.sexySlide-thumbs li').removeClass('current');
					
					if (direction == '+') {
						// Note, this is the opposite "sign" to the slide direction
						currentPos--;
					} else {currentPos++;}
					
					// Update the current position of the thumbnails
					cPos = currentPos;
					if (cPos < 1) {
						cPos = totalThumbs;
					}
					var whichChild = '.sexySlide-thumbs li.i' + cPos;
					$(whichChild).addClass('current');
				}
				
				
				slideTo = function (position) {
					if (currentPos > tPos) {
						direction = '+';
						slideMultiplier = currentPos - tPos;
					} else {
						direction = '-';
						slideMultiplier = tPos - currentPos;
					}
					
					// Distance of the slide, in pixels - calculated based on width of the page / holding box
					var slideDistance = sexyBox.width();
					// Then use multiply the slideDistance by the multiplier
					
					slideDistance = slideDistance * slideMultiplier;
					var textShow = slideDrawer.attr('style') + ' : ' + slideDistance + ' : ' + currentPos + ' : ' + sexySize + ' : ' + direction;
					
					// If we've reached the end OR beginning of the list AND we're going forward, go back to the beginning
					if ((currentPos >= sexySize || currentPos <= 0) && direction == '-') {
						slideDrawer.attr('style', 'left: 0px; width: ' + drawerSize + 'px;');
						currentPos = 0;
					} else if ((currentPos >= sexySize || currentPos <= 0) && direction == '+') {
						// If we've reached the end OR beginning of the list AND we're going backwards, go forward to the end
						slideDrawer.attr('style', 'left: -' + (sexySize * slideDistance) +  'px; width: ' + drawerSize + 'px;');
						currentPos = sexySize;
					}
					
					slideDrawer.animate({
						left: direction + '=' + slideDistance
					}, slideTime, function() { 
						// Animation complete.
						enableslides();
					});
					
					// Update the current Position
					currentPos = tPos;
					
					if (currentPos == totalThumbs) {
						currentPos = 0;	
					}
				}
				
				
				//
				$('.sexySlide-thumbs li a').attr('rel', 'enabled');
				
				// Control what happens when you click a thumbnail
				$('.sexySlide-thumbs li a').click(function(){
				
					// Remove current class from all lis
					$('.sexySlide-thumbs li').removeClass('current');
					
					// extract the current position from the class
					tPos = $(this).parent().attr('class').replace(' ', '').replace('current', '').replace('i', '');
					
					if (currentPos != tPos) {
						if($(this).attr("rel") == "enabled") {
							disableslides();
							slideTo(tPos);
						}
					};
					
					// make this li the current one
					$(this).parent().addClass('current');
					return false;
				});
				
				// Fade the slide buttons out and in (they're on to start with, though)
				
				var slideButtonNext = $('.lnk-next');
				var slideButtonPrev = $('.lnk-prev');
				
				
				$('.sexySlide-links').hover(
				  function () {
					if(o.iconsFade == true) {
						slideButtonNext.fadeIn("fast");
						slideButtonPrev.fadeIn("fast");
					}
				  }, 
				  function () {
					  if(o.iconsFade == true) {
						slideButtonNext.fadeOut("fast");
						slideButtonPrev.fadeOut("fast");
					  }
				  }
				);
				
				// Slide an element
				slideButtonNext.click(function(){
					if($(this).attr("rel") == "enabled") {
						disableslides();	
						slideMe('-');
					}
					return false;
				});
				
				slideButtonPrev.click(function(){
					if($(this).attr("rel") == "enabled") {
						disableslides();	
						slideMe('+');
					}
					return false;
				});
             
            });
        }
    });
     
})(jQuery);