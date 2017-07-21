//animação de scroll
debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

(function (){
	var $target = $('.anime'),
		offset = $(window).height() * 3/4;

	function animeScroll(){
		var documentDist = $(document).scrollTop();

		$target.each(function(){
			var itemDist = $(this).offset().top;

			if(documentDist > itemDist - offset){
				$(this).addClass('anime-start');
			} else{
				$(this).removeClass('anime-start');
			}
		});
	}

	animeScroll();

	$(document).scroll(debounce(function() {
		animeScroll();
	}, 200));
})();

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});