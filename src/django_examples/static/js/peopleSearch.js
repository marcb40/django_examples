$(document).ready(function() {
		   
    $(document).scroll(function(){
        if  ($(window).scrollTop() == $(document).height() - $(window).height()){
            loadMoreData();
        }
    });
    
   
    $('input[id^="roles"]').change(function(){
    	loadNewData();
    });
    
    $('input[id^="tags"]').change(function(){
    	loadNewData();
    });
    
    function loadNewData() {
    	jQuery('#offset').first().val(0); //update the request offset for a new search
    	jQuery.ajax({type:'POST',
    				data:jQuery('form:first').serialize(), 
    				url:'/search/searchPeople',
    				success:function(data,textStatus){
    							jQuery('#searchResults').html(data);
    							var updatedTotal = jQuery('[name="totalResults"]').last().val();
    							jQuery('[name="totalResults"]').first().val(updatedTotal);
    							jQuery('#resultCount').html(updatedTotal);
    						},
    				error:function(XMLHttpRequest,textStatus,errorThrown){}});	
    }

    function loadMoreData(){
    	var total = jQuery('#totalResults').val();  //total count of search results
    	var lastOffset = jQuery('[name="offset"]').last().val();  //offset to use when requesting more results
    	if (parseInt(lastOffset) >= parseInt(total)) {
    		return; //no more results to get
    	}
    	
    	jQuery('#offset').first().val(lastOffset); //update the request offset for next group of results
    	//make the request
    	jQuery.ajax({type:'POST',
    				data:jQuery('form:first').serialize(), 
    				url:'/search/searchPeople',
    				success:function(data,textStatus){
    							jQuery('#searchResultList').append(data);    							
    						},
    				error:function(XMLHttpRequest,textStatus,errorThrown){}});
       
    }
	
    $('body').on('filter', function(event, tags){
    	$.each(tags, function(idx, obj){
			$('<input>').attr({
				type: 'hidden',
				id: 'tags',
				name: 'tags',
				value: obj
			}).appendTo('form:first');
		});
    	
    	loadNewData();
    });
});

 
