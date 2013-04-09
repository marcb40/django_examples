var appId = $('#facebookAppId').val();
FB.init({
	appId : appId,
	status : true,
	cookie : true
});

$(document).ready(function() {
	$("#share li").click(function(event) {
		if (event.currentTarget.id == 'facebook') {
			shareOnFacebook();
		} else if (event.currentTarget.id == 'google') {
			shareOnGooglePlus();
		} else if (event.currentTarget.id == 'twitter') {
			shareOnTwitter();
		}

	});

});

/**
 * Facebook
 * 
 * @requires #facebookAppId
 * @requires #facebookRedirectUrl
 * @requires #title
 * @requires #summary
 * @requires #logoUrl
 */
function shareOnFacebook() {
	var obj = {
		method : 'feed',
		redirect_uri : $('#facebookRedirectUrl').val(),
		link : window.location.href,
		picture : $('#logoUrl').val(),
		name : $('#title').val(),
		caption : ' ',
		description : $('#summary').val(),
		display : 'popup'
	};

	function callback(response) {
	}

	FB.ui(obj, callback);
}

/**
 * Google+
 * 
 * @requires #googlePlusUrl
 */
function shareOnGooglePlus() {
	var url = $('#googlePlusUrl').val() + getUrlToShare();
	window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600')
}

/**
 * Twitter
 * 
 * @requires #twitterUrl
 * @requires #title
 */
function shareOnTwitter() {
	var url = $('#twitterUrl').val() + getUrlToShare() + "&text=" + $('#title').val();
	window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=280,width=600')
}

/**
 * Some social media (google+ and twitter) cannot except non-accessible urls (like localhost) so for testing, make sure the current url contains the
 * base working examples url, otherwise, just use the base
 * 
 * @returns
 */
function getUrlToShare() {
	if (window.location.href.indexOf($('#workingExamplesUrl').val()) > -1) {
		return window.location.href;
	} else {
		return $('#workingExamplesUrl').val();
	}
}