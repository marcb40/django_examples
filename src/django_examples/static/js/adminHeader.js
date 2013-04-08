function onFeaturetteUpdate(data) {
	$('#featuretteMessage').html(data);
	$('#featuretteMessage').fadeIn('fast');
	setTimeout(function() {
	    $('#featuretteMessage').fadeOut('fast');
		}, 2000);
};

$(document).ready(function() {
			
	$("#featuretteForm").validate({
		errorPlacement: function (error, element){
	//		error.insertAfter(element);
		},
		rules: {
			rank: {
				featuretteRank: true,
				number: true
			}
		},
		submitHandler: function(form) {
			jQuery.ajax({
				type:'post',
				data:jQuery('#featuretteForm').serialize(), 
				url:'/featurette/toggleFeaturette',
				success:function(data,textStatus){onFeaturetteUpdate(data);},
				error:function(XMLHttpRequest,textStatus,errorThrown){onFeaturetteUpdate('Failure');}
			});
			return false
		},
		highlight: function (element, errorClass, validClass) {
			var label = $('label[for="' + element.id + '"]');
			$(label).addClass('invalid');
		},
		unhighlight: function (element, errorClass, validClass) {
			var label = $('label[for="' + element.id + '"]');
			$(label).removeClass('invalid');
		}
	});
	
	
	$.validator.addMethod("featuretteRank", function(value, element){
		if ($('#featurePageChk').is(":checked") && (value == undefined || value == "") ) {
			return false;
		} else {
			return true;
		}			
	}, "This field is required.");
			
	
});
