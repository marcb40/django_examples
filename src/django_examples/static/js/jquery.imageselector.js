/**
 * @author Derrick Curry
 */
(function($){
	var ImageSelector = function (element, option) {
		var settings = $.extend({
			width: 230,
			height: 230,
			image: undefined,
			id: 0
		}, option || {});
		
		// Wrap it in a button
		$(element).wrap('<div id="btn-' + $(element).attr('id') + '" />');
		
		// Get a reference to the parent div
		var parent = $(element).parent();
		
		$('<div id="photo" />').appendTo(parent);
		$('<div id="photo-add" class="add-border add-icon" />').css({width: settings.width, height: settings.height}).appendTo(parent);
		$('<div id="photo-added" class="add-border profile-photo-add" />').appendTo(parent);
		
		// If an image url is passed in then show it and hide the other div's
		if (settings.id != undefined && settings.id != 0) {
			$('<input type="hidden" id="profilePhoto.id" value="' + settings.id + '"/>').appendTo("#photo");
			$('<img src="' + settings.image + '" width="' + settings.width + '" height="' + settings.height + '" />').appendTo('#photo');
			
			$('#photo-add').css('display', 'none');
			$('#photo-added').css('display', 'none');
			
			//$('#photo').inlineedit();
		} else {
			$('#photo').css('display', 'none');
			$('#photo-added').css('display', 'none');
		}
		
		$('#btn-' + $(element).attr('id')).click(function(event){
			$(element).trigger('click');
		});
		
		$(element).click(function(event){
			event.stopPropagation();
		});
		
		$(element).change(function(event){
			var path = $(this).val().split('\\').pop();
			if (path.length > 0) {
				$('#photo-add, #photo').css('display', 'none');
				$('#photo-added').css('display', 'block').html(path);
			} else {
				$('#photo-added, #photo').css('display', 'none');
				$('#photo-add').css('display', 'block');
			}
		});
		
		// Hide the element from view
		$(element).wrap('<div class="hidden" />').css({opacity: 0, filter: 'alpha(opacity:0)'});
	};
	
	$.fn.imageselector = function (options) {
		return this.each(function(){
			var element = $(this);
			if (element.data('plugin')) return;
			
			var plugin = new ImageSelector(this, options);
			element.data('plugin', plugin);
		});
	}
})(jQuery);