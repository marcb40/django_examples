

$(document).ready(function() {
	initialize();
})
		
function initialize(){
	var watermark = "Type category name";
	addWatermark($('input[id="name"]'), watermark);
	
	$("#parentCategory").select({class:"admin-content-select"});
	
	//form to add new category
	$("#parentCatForm").validate({
		errorPlacement: function (error, element){
			//error.insertAfter(element);
		},
		rules: {
			name: {
				required:true,
				notwatermark:true
			}
		},
		submitHandler: function(form) {
			form.submit();
			return false
		},
		highlight: function (element, errorClass, validClass) {
			element.className = 'admin-content-invalid';
			
		},
		unhighlight: function (element, errorClass, validClass) {
			element.className = '';
		}
	});
		
	//form to add new sub-category
	$("#subCatForm").validate({
		errorPlacement: function (error, element){
			//error.insertAfter(element);
		},
		highlight: function (element, errorClass, validClass) {
			element.className = 'admin-content-invalid';
			
		},
		unhighlight: function (element, errorClass, validClass) {
			element.className = '';
		},
		rules: {
			name: {
				required:true,
				notwatermark:true
			},
			"parentCategory.id": {
				required: true
			}
		},
		submitHandler: function(form) {
			form.submit();
			return false
		}
	});
	
	$.validator.addMethod("notwatermark", function(value, element){
		if (value != watermark) {
			return true;
		} else {
			return false;
		}
	});
	
	//edit an existing cat/subcat
	$('div[id^="editCatBtn"]').click(function(event){
		var btn = event.target.id.replace('editCatBtn', '');
		var readSelect = 'div[id^="readCat' + btn + '-field-"]'
		var editSelect = 'div[id^="editCat' + btn + '-field-"]'
		$(readSelect).toggle();
		$(editSelect).toggle();
	});

	//save an existing cat/subcat
	$('input[id^="saveCatBtn"]').click(function(event){
		var btn = event.target.id.replace('saveCatBtn', '');
		var id = $('#id'+btn).val();
		var version = $('#version'+btn).val();
		var name =  $('#name'+btn).val();
		var rank =  $('#rank'+btn).val();
		var required = $('#required'+btn).is(":checked");
		var parentCat = $('select[name="parentCategory.id'+btn+'"]').val(); 
		
		//build form
		var form = $('<form>').attr({
			name: 'categoryUpdateForm',
			action: '/category/update',
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
		
		//name
		$('<input>').attr({
			type: 'hidden',
			id: 'name',
			name: 'name',
			value: name
		}).appendTo($(form));
		
		//required
		$('<input>').attr({
			type: 'hidden',
			id: 'required',
			name: 'required',
			value: required
		}).appendTo($(form));
		
		//parent
		$('<input>').attr({
			type: 'hidden',
			id: 'parentCategory.id',
			name: 'parentCategory.id',
			value: parentCat
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
				rank: {
					required:true,
					number:true
				},
				name: 'required'
			},
			submitHandler: function(frm) {
				$.post(
						form.attr('action'),
						$(form).serialize(),
						function (response) {
							//success; return to read mode
							if (response && response.toLowerCase().charAt(0) == "s") {
								var selectPrefix = '#readCat'+btn;
								$(selectPrefix+'-field-rank').html(rank);
								$(selectPrefix+'-field-name').html(name);
								$(selectPrefix+'-field-required').html(required?"Yes":"No");
								$(selectPrefix+'-field-parentCategory').html($('select[name="parentCategory.id'+btn+'"] option:selected').text());
								var readSelect = 'div[id^="readCat' + btn + '-field-"]'
								var editSelect = 'div[id^="editCat' + btn + '-field-"]'
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
	$('#parentCat-tabs').tabs();
	$('#subCat-tabs').tabs();
	
};
