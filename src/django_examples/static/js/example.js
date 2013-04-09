
$(document).ready(function() {
	
	//pre-validation processing
	$('input[type="submit"]').click(function(e){
	     //update the editors to reflect the value for validation
	     CKEDITOR.instances.progressUpdateText.updateElement();
	})
	
	$("#exampleForm").validate({
		ignore: '',
		errorPlacement: function (error, element){
		//	error.insertAfter(element);
		},
		rules: {
			title: 'required',
			summary: 'required',
			visible: 'required',
			mediaValidation: {primaryPhotoExists:true},
			categoryValidation: {categoryExists:true},
			teamValidation: {adminExists:true},
			phaseValidation: {phaseAnswersExist:true}
		},
		submitHandler: function(form) {
			promptBeforeUnload = false; 
			form.submit();
			updateHeader(true);
			return false
		},
		highlight: function (element, errorClass, validClass) {
			var label = $('label[for="' + element.id + '"]');
			$(label).addClass('invalid');
			updateHeader(false);
		},
		unhighlight: function (element, errorClass, validClass) {
			var label = $('label[for="' + element.id + '"]');
			$(label).removeClass('invalid');
		}
	});
	
		
	$.validator.addMethod("categoryExists", function(value, element){
		var cat = $('input[id^="categories["]').val();
		if (cat) {
			return true;
		} else {
			return false;
		}
	}, "At least one category is required.");
	
	$.validator.addMethod("dateMMDDYYYY", function(value, element){
		var dt = null;
		try {
			dt = $.datepicker.parseDate('mm/dd/yy', value);
		} catch (err) {
			return false;
		}
		if (dt) {
			return true;
		} else {
			return false;
		}
	}, "Please enter a valid date.");
		
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
	
	$.validator.addMethod("wholeUpdateValid", function(value, element){
		var title = $("#progressUpdateTitle");
		var date = $("#progressUpdateDate");
		var txt = $("#progressUpdateText");
		
		var validTitle = title.valid();
		var validDate = date.valid();
		var validText = txt.valid();
		return (validTitle && validDate && validText);
			
	}, "The Update is invalid.");
		

	$.validator.addMethod("primaryPhotoExists", function(value, element){
		var photo = $('input[type="file"][name^="photo."], input[type="hidden"][name^="photoId."]').val();
		if (photo) {
			return true;
		} else {
			return false;
		}
	}, "At least one photo is required.");

	$.validator.addMethod("phaseAnswersExist", function(value, element){
		return (isValidPhaseQuestion("seed", "Seed")
				&& isValidPhaseQuestion("sprout", "Sprout")
				&& isValidPhaseQuestion("bloom", "Bloom"));
	}, "Please answer all required questions.");
	
	
});


function isValidPhaseQuestion(lowerPhaseType, properPhaseType) {
	//find all questions that are required
	var reqQuestions = $('input[name^="required' + properPhaseType + 'Question"]')
	var isValid = true;
	var isCollection = true;
	var questions = [];
	if (reqQuestions.length > 1) {
		questions = reqQuestions;
	} else if (reqQuestions.length > 0) {
		questions.push(reqQuestions);
		isCollection = false;
	}
	//for each question, verify that an answer exists
	if (questions.length > 0) {
		$.each(questions, function(index, value){
			var qId;
			if (!isCollection) {
				qId = value.attr('name').replace('required' + properPhaseType + 'Question', '');
			} else {
				qId = value.name.replace('required' + properPhaseType + 'Question', '');
			}
			var ans = CKEDITOR.instances[lowerPhaseType + 'Answers.' + qId + '.answer'].getData();			
			if (ans.trim().length < 1) {
				isValid = false;  //no answer
			}
		});
	}
	
	return isValid;
};

