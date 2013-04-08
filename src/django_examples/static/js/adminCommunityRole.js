

$(document).ready(function() {
	initialize();
})
		
function initialize(){
	var titleWatermark = "Type new role here";
	addWatermark($("#title"), titleWatermark);
	
	var descriptionWatermark = "Type new description here";
	addWatermark($("#description"), descriptionWatermark);
	
	//form to add new question
	$("#roleForm").validate({
		errorPlacement: function (error, element){
			//error.insertAfter(element);
		},
		rules: {
			title: {
				required:true,
				notTitleWatermark:true
			},
			
			description: {
				required:true,
				notDescriptionWatermark:true
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
	
	$.validator.addMethod("notTitleWatermark", function(value, element){
		if (value != titleWatermark) {
			return true;
		} else {
			return false;
		}
	});
	
	$.validator.addMethod("notDescriptionWatermark", function(value, element){
		if (value != descriptionWatermark) {
			return true;
		} else {
			return false;
		}
	});
		
	
	//edit an existing question
	$('div[id^="editRoleBtn"]').click(function(event){
		var btn = event.target.id.replace('editRoleBtn', '');
		var readSelect = 'div[id^="readRole' + btn + '-field-"]'
		var editSelect = 'div[id^="editRole' + btn + '-field-"]'
		$(readSelect).toggle();
		$(editSelect).toggle();
	});

	//save an existing cat/subcat
	$('input[id^="saveRoleBtn"]').click(function(event){
		var btn = event.target.id.replace('saveRoleBtn', '');
		var id = $('#id'+btn).val();
		var version = $('#version'+btn).val();
		var title =  $('#title'+btn).val();
		var desc =  $('#description'+btn).val();
		
		//build form
		var form = $('<form>').attr({
			name: 'roleUpdateForm',
			action: '/communityRole/update',
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
		
		//title
		$('<input>').attr({
			type: 'hidden',
			id: 'title',
			name: 'title',
			value: title
		}).appendTo($(form));
		
		//description
		$('<input>').attr({
			type: 'hidden',
			id: 'description',
			name: 'description',
			value: desc
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
				title: 'required',
				description: 'required'
			},
			submitHandler: function(frm) {
				$.post(
						form.attr('action'),
						$(form).serialize(),
						function (response) {
							//success; return to read mode
							if (response && response.toLowerCase().charAt(0) == "s") {
								var selectPrefix = '#readRole'+btn;
								$(selectPrefix+'-field-title').html(title);
								$(selectPrefix+'-field-description').html(desc);
								var readSelect = 'div[id^="readRole' + btn + '-field-"]'
								var editSelect = 'div[id^="editRole' + btn + '-field-"]'
								$(readSelect).toggle();
								$(editSelect).toggle();
							} //failure; stay in edit mode
							
							//show confirmation message
							var svMsg = '#saveMsg'+btn;
							$(svMsg).html(response);
							$(svMsg).toggle();
							$(svMsg).fadeIn('fast');
							setTimeout(function() {
							    $(svMsg).fadeOut('fast');
								}, 1500);
							
						}
					);
				return false
			}
		});
		
		//force the validation to occur
		$(form).submit();
		
		
	});
	$('#role-tabs').tabs();
};
