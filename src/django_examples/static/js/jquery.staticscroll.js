(function($){
	var StaticScroll = function (element, option) {
		var settings = $.extend({
			'top': 0,
		}, option || {});
		
		$(window).scroll(function(event){
			if ($(this).scrollTop() > settings.top && $(element).css('position') != 'fixed')
			{
				$('<div id="staticscroll-spacer"/>').css({height: $(element).css('height'), margin: $(element).css('margin')}).insertAfter($(element));
				$(element).css({'position': 'fixed', 'top': '0px'});
			}
			else if ($(this).scrollTop() < settings.top && $(element).css('position') != 'static')
			{
				$('#staticscroll-spacer').remove();
				$(element).css({'position': 'static', 'top': ''});
			}
		});
	};
	
	$.fn.staticscroll = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new StaticScroll(this, options);
			element.data('plugin', plugin);
		});
	}
})(jQuery);