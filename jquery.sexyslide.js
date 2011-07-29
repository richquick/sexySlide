(function($){
 
    $.fn.extend({ 
         
        //pass the options variable to the function
        sexySlide: function(options) {
 
            //Set the default values, use comma to separate the settings, example:
            var defaults = {
                margin: 10,
                thumbs : false,
                iconsStart: true,
				iconsFade: true
            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
                var o = options;
                var $this = $(this);
				 
                //code to be inserted here
                //you can access the value like this
                alert(o.margin);
             
            });
        }
    });
     
})(jQuery);