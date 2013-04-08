(function($){
	var InlineEdit = function (element, option) {
		var settings = $.extend({
			'offset': {top: 5, left: 5},
			'icon': '/static/images/edit.png',
			'click': function(event){console.log('default');}
		}, option || {});
		
		$('body').append('<div id="edit-' + $(element).attr('id') + '" class="edit"/>');
		
		var hover = $('#edit-' + $(element).attr('id'))
			.width($(element).width())
			.height($(element).height())
			.css('left', $(element).position().left - settings.offset.left)
			.css('top', $(element).position().top - settings.offset.top)
			.append('<img src="' + settings.icon + '"/>');
		
		var icon = $('img', hover)
			.css('right', 5)
			.css('top', 5);
		
		$(hover).click(function(event){
			settings.click(event);
		});
		
		$(window).resize(function(){
			console.log('resize');
			$('#edit-' + $(element).attr('id'))
				.width($(element).width())
				.height($(element).height())
				.css('left', $(element).position().left - settings.offset)
				.css('top', $(element).position().top - settings.offset);
		});
	};
	
	$.fn.inlineedit = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new InlineEdit(this, options);
			element.data('plugin', plugin);
		});
	}
})(jQuery);
