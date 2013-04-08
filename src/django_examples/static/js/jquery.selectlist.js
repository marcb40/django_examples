(function($){
	var SelectList = function (element, options) {
		var currentState = 'closed';
		
		var button = $(element).children(':first');
		var list = $(button).children(':first');
		
		$('li', list).on('click', function(event){
			$(this).trigger('change');
			button.click();
			$(document).off();
		});
		
		button.on('click', function(event){
			event.stopPropagation();
			
			switch (currentState) {
				case 'open':
					currentState = 'closed';
					
					/*list.slideUp(300, function(){
						$(document).off();
					});/**/
					
					$(list).css('display', 'none');
					$(document).off();
					
					break;
				
				case 'closed':
					currentState = 'open';
					
					list.slideDown(300, function(){
						$(document).on('click', function(event){
							button.click();
							$(document).off();
						})
					});
					
					break;
			}
		});
		
		list.on('click', function(event){
			event.stopPropagation();
		});
	};
	
	$.fn.selectlist = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new SelectList(this, options);
			element.data('plugin', plugin);
		});
	};
})(jQuery);