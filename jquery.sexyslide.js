(function($){
 
    $.fn.extend({ 
         
        //pass the options variable to the function
        sexySlider: function(options) {
 
 			//Handy for CSS
			$('body').addClass('js');
			
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                margin: 10,
                thumbs : false,
                iconsStart: true,
				iconsFade: true,
				vertical: false,
				sliderTime: 400
            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
                var o = options;
                var $this = $(this);
				
				// Wrap 
				$this.wrap('<div id="sexySlider-outer" />').parent().wrap('<div id="sexySlider-container" />').before('<div id="sexySlider-box" />');
				
				var slideContainer = $('#sexySlider-container'); // So we can reuse it
				slideContainer.prepend('<div id="sexySlider-links"><a href="#" id="lnk-next">next</a><a href="#" id="lnk-prev">prev</a></div>');
				
               	if (o.thumbs == true) {
					// Duplicate the slide drawer as another list, so we can use for thumbnails
					thumbList = $this.html();
					thumbList = '<ul id="sexySlider-thumbs">' + thumbList + '</ul>';
					slideContainer.append(thumbList);
					
					$('#sexySlider-thumbs li img').wrap('<a href="#" />');	
				}
				
				// Store the sexySlider box as a variable, so we can calculate the width later
				var sexyBox = $('#sexySlider-box');
				
				// Work out the size of the list
				var sexySize = $this.children("li").length;
				
				// Duplicate the last LI at the start of the list
				var lastLI = '<li>' + $('li:last-child', $this).html() + '</li>';
				$this.prepend(lastLI);
				
				// Duration of the slide, in thousandths of a second
				slideTime = o.sliderTime;
				
				// Set a counter, so we know which portolio piece we're on
				var currentPos = 1;
				
				// Disable sliders - while in animation
				var theSliders = $("#lnk-next, #lnk-prev");
				theSliders.each(function() {
					$(this).attr('rel', 'enabled');
				});
				function disableSliders() {
					theSliders.each(function() {
						$(this).attr('rel', 'disabled');
						$('#sexySlider-thumbs li a').attr('rel', 'disabled');
					});
				};
				function enableSliders() {
					theSliders.each(function() {
						$(this).attr('rel', 'enabled');
						$('#sexySlider-thumbs li a').attr('rel', 'enabled');
					});
				};
				
				// Set the size of the slider drawer
				var drawerSize = (sexySize + 1) * sexyBox.width();
				$this.attr('style', 'width: ' + drawerSize + 'px;');
				
				// Adjust various meansurements if the layout is resized

				var sexyBoxSize = sexyBox.width();
				$(window).resize(function() {
					if (sexyBoxSize != sexyBox.width()) {
						sexyBoxSize = sexyBox.width();
						slideDistance = sexyBoxSize;
						drawerSize = (sexySize + 1) * sexyBoxSize;
						$this.css('width', drawerSize + 'px;');
						if (currentPos <= 0) {
							$this.attr('style', 'left: 0px;');
						} else {
							$this.attr('style', 'left: -' + (currentPos * slideDistance) +  'px;');
						}
					}
				});
				
				var cPos = 0;
				var totalThumbs = $('#sexySlider-thumbs li').length;
				
				 
				slideMe = function (direction) {
					// Distance of the slide, in pixels - calculated based on width of the page / holding box
					var slideDistance = sexyBox.width();
					var textShow = $this.attr('style') + ' : ' + slideDistance + ' : ' + currentPos + ' : ' + sexySize + ' : ' + direction;
				
					// If we've reached the end OR beginning of the list AND we're going forward, go back to the beginning
					if ((currentPos >= sexySize || currentPos <= 0) && direction == '-') {
						$this.attr('style', 'left: 0px; width: ' + drawerSize + 'px;');
						currentPos = 0;
					} else if ((currentPos >= sexySize || currentPos <= 0) && direction == '+') {
						// If we've reached the end OR beginning of the list AND we're going backwards, go forward to the end
						$this.attr('style', 'left: -' + (sexySize * slideDistance) +  'px; width: ' + drawerSize + 'px;');
						currentPos = sexySize;
					}
					
					$this.animate({
						left: direction + '=' + slideDistance
					}, slideTime, function() {
						// Animation complete.
						enableSliders();
					});
					
					// Remove current class from all lis
					$('#sexySlider-thumbs li').removeClass('current');
					
					if (direction == '+') {
						// Note, this is the opposite "sign" to the slide direction
						currentPos--;
					} else {currentPos++;}
					
					// Update the current position of the thumbnails
					cPos = currentPos;
					if (cPos < 1) {
						cPos = totalThumbs;
					}
					var whichChild = '#sexySlider-thumbs li.i' + cPos;
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
					var textShow = $this.attr('style') + ' : ' + slideDistance + ' : ' + currentPos + ' : ' + sexySize + ' : ' + direction;
					
					// If we've reached the end OR beginning of the list AND we're going forward, go back to the beginning
					if ((currentPos >= sexySize || currentPos <= 0) && direction == '-') {
						$this.attr('style', 'left: 0px; width: ' + drawerSize + 'px;');
						currentPos = 0;
					} else if ((currentPos >= sexySize || currentPos <= 0) && direction == '+') {
						// If we've reached the end OR beginning of the list AND we're going backwards, go forward to the end
						$this.attr('style', 'left: -' + (sexySize * slideDistance) +  'px; width: ' + drawerSize + 'px;');
						currentPos = sexySize;
					}
					
					$this.animate({
						left: direction + '=' + slideDistance
					}, slideTime, function() {
						// Animation complete.
						enableSliders();
					});
					
					// Update the current Position
					currentPos = tPos;
					
					if (currentPos == totalThumbs) {
						currentPos = 0;	
					}
				}
				
				
				//
				$('#sexySlider-thumbs li a').attr('rel', 'enabled');
				
				// Control what happens when you click a thumbnail
				$('#sexySlider-thumbs li a').click(function(){
				
					// Remove current class from all lis
					$('#sexySlider-thumbs li').removeClass('current');
					
					// extract the current position from the class
					tPos = $(this).parent().attr('class').replace(' ', '').replace('current', '').replace('i', '');
					
					if (currentPos != tPos) {
						if($(this).attr("rel") == "enabled") {
							disableSliders();
							slideTo(tPos);
						}
					};
					
					// make this li the current one
					$(this).parent().addClass('current');
					return false;
				});
				
				// Fade the slider buttons out and in (they're on to start with, though)
				
				var slideButtonNext = $('#lnk-next');
				var slideButtonPrev = $('#lnk-prev');
				
				$('#sexySlider-links').hover(
				  function () {
					slideButtonNext.fadeIn("fast");
					slideButtonPrev.fadeIn("fast");
				  }, 
				  function () {
					slideButtonNext.fadeOut("fast");
					slideButtonPrev.fadeOut("fast");
				  }
				);
				
				// Slide an element
				slideButtonNext.click(function(){
					if($(this).attr("rel") == "enabled") {
						disableSliders();	
						slideMe('-');
					}
					return false;
				});
				
				slideButtonPrev.click(function(){
					if($(this).attr("rel") == "enabled") {
						disableSliders();    
						slideMe('+');
					}
					return false;
				});
             
            });
        }
    });
     
})(jQuery);