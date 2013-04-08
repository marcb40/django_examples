
// Allow validation of hidden objects
$.validator.setDefaults({ ignore: '' });

// Multi-question Validator
$.validator.addMethod("multiquestion", function(value, element, params){
	var count = 0;
	
	$(".answers").each(function(index){
		if ($(this).val() != "")
			count++;
	});
				
	if (count >= params.requiredCount)
		return true;
	
	return false;
	
}, "Please answer at least three of the following questions.");
	
// Radio List Validator
$.validator.addMethod("radiolist", function(value, element){
	var value = $("input[@name=" + value +"]:checked").val();
	
	if (value != undefined)
		return true;
	
	return false;
}, "Please select an option.");