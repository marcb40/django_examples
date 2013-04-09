(function($){
	var DropdownMenu = function (element, options) {
		var menu = $(element);
		var currentState = 'closed';
		
		var settings = $.extend({
			'button' : undefined
		}, options || {});
		
		if (settings.button == undefined)
			return;
			
		var button = $('#' + settings.button);
		
		button.on('click', function(event) {
			event.stopPropagation();
			
			switch (currentState) {
				case 'open':
					currentState = 'closed';
					
					menu.slideUp(300, function(){
						$(document).off();
					});
					
					break;
				
				case 'closed':
					currentState = 'open';
					
					menu.slideDown(300, function(){
						$(document).on('click', function(event){
							button.click();
							$(document).off();
						});
					});
					
					break;
			}
		});
		
		menu.on('click', function(event){
			event.stopPropagation();
		});
	};
	
	$.fn.dropdownmenu = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new DropdownMenu(this, options);
			element.data('plugin', plugin);
		});
	};
})(jQuery);
