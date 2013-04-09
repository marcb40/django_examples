/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

//Add a reference to the new plugin 
CKEDITOR.plugins.addExternal('MediaEmbed', '/static/js/ckeditor/plugins/mediaembed/'); 

CKEDITOR.editorConfig = function( config )
{
	config.extraPlugins = 'mediaembed'; // Additional plugin 
	
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.skin = 'wex,/static/skins/wex/';
	config.dialog_backgroundCoverColor = "#000000";
	config.dialog_backgroundCoverOpacity = "0.5";	
};

