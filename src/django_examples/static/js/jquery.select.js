(function($){
	var Select = function (element, options) {
		var currentState = 'closed';
		
		var settings = $.extend({
			'parent' : $(element).parent(),
			'default' : '',
			'width' : '250px',
			'class'  : 'select'
		}, options || {});
		
		if (settings.default != '')
			$(element).prepend('<option value="">' + settings.default + '</option>');
		
		$(element).wrap('<div class="hidden"/>');
		$(element).change(function(e) {
			console.log(e);
		});
		
		settings.parent.append('<ul id="' + $(element).attr('id') + '-select" style="width: ' + settings.width + '" class="' + settings.class +  '"/>');
		$('#' + $(element).attr('id') + '-select').append('<li><span class="label">' + $(element).find(':selected').text() + '</span><ul id="' + $(element).attr('id') + '-list"/></li>');
		
		$('option', element).each(function(){
			$('#' + $(element).attr('id') + '-list').append('<li data-value="' + $(this).val() + '">' + $(this).text() + '</li>');
		});
		
		var button = $('#' + $(element).attr('id') + '-select').children(':first');
		var list = $(button).children('ul:first');
		
		$('li', list).on('click', function(event){
			$(element).val($(event.currentTarget).data('value'));
			$('.label', button).html($(element).find(':selected').text());
			$(element).trigger('change');
		});
		
		button.on('click', function(event){
			event.stopPropagation();
			
			switch (currentState) {
				case 'open':
					currentState = 'closed';
					
					$(list).css('display', 'none');
					$(document).off();
					
					break;
				
				case 'closed':
					currentState = 'open';
					
					list.slideDown(300, function(){
						$(document).on('click', function(event){
							button.click();
							$(document).off();
						});
					});
					
					break;
			}
		});
	};
	
	$.fn.select = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new Select(this, options);
			element.data('plugin', plugin);
		});
	}
})(jQuery);