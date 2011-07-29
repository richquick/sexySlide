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
				vertical: false
            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
                var o = options;
                var $this = $(this);
				
				// Wrap 
				$this.wrap('<div id="sexySlider-outer" />').parent().wrap('<div id="sexySlider-container" />').before('<div id="sexySlider-box" />');
				
				var slideContainer = $('#sexySlider-container'); // So we can reuse it
				slideContainer.prepend('<div id="sexySlider-links"><a href="#" id="lnk-next">next</a><a href="#" id="lnk-prev">prev</a></div>');

                //code to be inserted here
                //you can access the value like this
                // alert(o.margin);
             
            });
        }
    });
     
})(jQuery);