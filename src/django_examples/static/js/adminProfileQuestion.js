

$(document).ready(function() {
	initialize();
})
		
function initialize(){
	var watermark = "Type new question here";
	addWatermark($("#question"), watermark);
	//form to add new question
	$("#profileQForm").validate({
		errorPlacement: function (error, element){
			//error.insertAfter(element);
		},
		rules: {
			question: {
				required:true,
				notwatermark:true
			}
		},
		submitHandler: function(form) {
			form.submit();
			return false
		},
		highlight: function (element, errorClass, validClass) {
			$('#'+ element.name).addClass('admin-content-invalid');
		},
		unhighlight: function (element, errorClass, validClass) {
			$('#'+ element.name).removeClass('admin-content-invalid');
		}
	});
	
	$.validator.addMethod("notwatermark", function(value, element){
		if (value != watermark) {
			return true;
		} else {
			return false;
		}
	});
		
	
	//edit an existing question
	$('div[id^="editQBtn"]').click(function(event){
		var btn = event.target.id.replace('editQBtn', '');
		var readSelect = 'div[id^="readQ' + btn + '-field-"]'
		var editSelect = 'div[id^="editQ' + btn + '-field-"]'
		$(readSelect).toggle();
		$(editSelect).toggle();
	});

	//save an existing cat/subcat
	$('input[id^="saveQBtn"]').click(function(event){
		var btn = event.target.id.replace('saveQBtn', '');
		var id = $('#id'+btn).val();
		var version = $('#version'+btn).val();
		var question =  $('#question'+btn).val();
		
		//build form
		var form = $('<form>').attr({
			name: 'questionUpdateForm',
			action: '/profileQuestion/update',
			method: 'post'
		});
		
		//id
		$('<input>').attr({
			type: 'hidden',
			id: 'id',
			name: 'id',
			value: id
		}).appendTo($(form));
		
		//version
		$('<input>').attr({
			type: 'hidden',
			id: 'version',
			name: 'version',
			value: version
		}).appendTo($(form));
		
		//question
		$('<input>').attr({
			type: 'hidden',
			id: 'question',
			name: 'question',
			value: question
		}).appendTo($(form));
		
		$(form).validate({
			ignore: '',
			errorPlacement: function (error, element){
				//error.insertAfter(element);
			},
			highlight: function (element, errorClass, validClass) {
				$('#'+ element.name +btn).addClass('admin-content-invalid');
				
			},
			unhighlight: function (element, errorClass, validClass) {
				$('#'+ element.name +btn).removeClass('admin-content-invalid');
			},
			rules: {
				question: 'required'
			},
			submitHandler: function(frm) {
				$.post(
						form.attr('action'),
						$(form).serialize(),
						function (response) {
							//success; return to read mode
							if (response && response.toLowerCase().charAt(0) == "s") {
								var selectPrefix = '#readQ'+btn;
								$(selectPrefix+'-field-question').html(question);
								var readSelect = 'div[id^="readQ' + btn + '-field-"]'
								var editSelect = 'div[id^="editQ' + btn + '-field-"]'
								$(readSelect).toggle();
								$(editSelect).toggle();
							} //failure; stay in edit mode
							
						}
					);
				return false
			}
		});
		
		
		//force the validation to occur
		$(form).submit();
		
	});
	$('#profile-tabs').tabs();
	
}
