function addWatermark(input, watermark)  { 
	//init, set watermark text and class
	input.val(watermark).addClass('watermark');
 
	//if blur and no value inside, set watermark text and class again.
	input.blur(function(){
  		if ($(this).val().length == 0){
    		$(this).val(watermark).addClass('watermark');
		}
 	});
 
	//if focus and text is watermrk, set it to empty and remove the watermark class
	input.focus(function(){
  		if ($(this).val() == watermark){
    		$(this).val('').removeClass('watermark');
		}
 	});
}