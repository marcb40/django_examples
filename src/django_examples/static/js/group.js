
$(document).ready(function() {
	
	$('#finish-editing').on('click', function() {
		$("#groupForm").submit();
	});
	
	$("#groupForm").validate({
		ignore: '',
		errorPlacement: function (error, element){
			
		},
		rules: {
			title: 'required',
			summary: 'required',
			groupTypeValidation: {groupTypeRequired:true},
			mediaValidation: {primaryPhotoExists:true},
			exampleValidation: {exampleExists:true},
			teamValidation: {adminExists:true}
		},
		submitHandler: function(form) {
			promptBeforeUnload = false; 
			form.submit();
			updateHeader(true);
			return false
		},
		highlight: function (element, errorClass, validClass) {
			console.log(element);
			var label = $('label[for="' + element.id + '"]');
			$(label).addClass('invalid');
			updateHeader(false);
		},
		unhighlight: function (element, errorClass, validClass) {
			var label = $('label[for="' + element.id + '"]');
			$(label).removeClass('invalid');
		}
	});
	
	$.validator.addMethod("groupTypeRequired", function(value, element){
		var groupType = $("input[name='groupType']:checked").val();
		if (groupType) {
			return true;
		} else {
			return false;
		}
	}, "Group Type is required.");
		
	$.validator.addMethod("exampleExists", function(value, element){
		var ex = $('input[id="examples[0].example.id"]').val();
		if (ex) {
			return true;
		} else {
			return false;
		}
	}, "At least one example is required.");
		
	$.validator.addMethod("adminExists", function(value, element){
		var members = $('input[id*="userAffiliates"][id*="affiliationType"]').val();
	
		if (members) {
			if (members == "ADMIN") {
				return true;
			}
			for(var i=0; i<members.length; i++) {
				var m = members[i];
				if (m == "ADMIN") {
					return true;
				}
			}
		}
		
		return false;
		
	}, "At least one Administrator is required.");
		

	$.validator.addMethod("primaryPhotoExists", function(value, element){
		var photo = $('input[type="file"][name^="photo."], input[type="hidden"][name^="photoId."]').val();
		if (photo) {
			return true;
		} else {
			return false;
		}
	}, "At least one photo is required.");

});

