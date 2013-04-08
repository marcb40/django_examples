

$(document).ready(function() {
	initialize();
})

function validateAdd() {
	var watermark = "Type new question here";
	addWatermark($("#addquestionSeed"), watermark);
	addWatermark($("#addquestionSprout"), watermark);
	addWatermark($("#addquestionBloom"), watermark);
	
	$('input[id^="createBtn"]').click(function(event){
		var btn = event.target.id.replace('createBtn', '');
		var question =  $('#addquestion'+btn).val();
		var phaseType =  $('#phaseType'+btn).val();
		
		//build form
		var form = $('<form>').attr({
			name: 'questionAddForm',
			action: '/phaseQuestion/save',
			method: 'post'
		});
		
		//question
		$('<input>').attr({
			type: 'hidden',
			id: 'question',
			name: 'question',
			value: question
		}).appendTo($(form));
		
		//required
		$('<input>').attr({
			type: 'hidden',
			id: 'active',
			name: 'active',
			value: true
		}).appendTo($(form));
		
		$('<input>').attr({
			type: 'hidden',
			id: 'phaseType',
			name: 'phaseType',
			value: phaseType
		}).appendTo($(form));
		
		
		$(form).validate({
			ignore: '',
			errorPlacement: function (error, element){
				//	error.insertAfter(element);
			},
			rules: {
				question: {
					required:true,
					notwatermark:true
				}
			},
			submitHandler: function(frm) {
				$.post(
						form.attr('action'),
						$(form).serialize(),
						function (response) {
							$('#activeQuestionList' + phaseType).html(response);
							$('#addquestion'+btn).val('');
						}
					);
				return false
			},
			highlight: function (element, errorClass, validClass) {
				$('#add'+ element.name + btn).addClass('admin-content-invalid');
			},
			unhighlight: function (element, errorClass, validClass) {
				$('#add'+ element.name + btn).removeClass('admin-content-invalid');
			}
		});
		$.validator.addMethod("notwatermark", function(value, element){
			if (value != watermark) {
				return true;
			} else {
				return false;
			}
		});
		
		
		$(form).submit();
		
	});
		
}
		
function initialize(){
	
	validateAdd();
	
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
		var rank =  $('#rank'+btn).val();
		var required = $('#required'+btn).is(":checked");
		var phaseType = $('#phaseType'+btn).val();
		
		//build form
		var form = $('<form>').attr({
			name: 'questionUpdateForm',
			action: '/phaseQuestion/update',
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
		
		//rank
		$('<input>').attr({
			type: 'hidden',
			id: 'rank',
			name: 'rank',
			value: rank
		}).appendTo($(form));
		
		
		//question
		$('<input>').attr({
			type: 'hidden',
			id: 'question',
			name: 'question',
			value: question
		}).appendTo($(form));
		
		//required
		$('<input>').attr({
			type: 'hidden',
			id: 'required',
			name: 'required',
			value: required
		}).appendTo($(form));
		
		$('<input>').attr({
			type: 'hidden',
			id: 'phaseType',
			name: 'phaseType',
			value: phaseType
		}).appendTo($(form));
		
		$(form).validate({
			ignore: '',
			errorPlacement: function (error, element){
				//	error.insertAfter(element);
			},
			highlight: function (element, errorClass, validClass) {
				$('#'+ element.name +btn).addClass('admin-content-invalid');
				
			},
			unhighlight: function (element, errorClass, validClass) {
				$('#'+ element.name +btn).removeClass('admin-content-invalid');
			},
			
			rules: {
				rank: {
					required:true,
					number:true
				},
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
								$(selectPrefix+'-field-rank').html(rank);
								$(selectPrefix+'-field-question').html(question);
								$(selectPrefix+'-field-required').html(required?"Yes":"No");
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
	$('#seed-tabs').tabs();
	$('#sprout-tabs').tabs();
	$('#bloom-tabs').tabs();
}
