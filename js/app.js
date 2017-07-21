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