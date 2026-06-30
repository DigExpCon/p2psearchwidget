var form_div = document.getElementById('ppc_search');

// Search specific partner or not
if ( form_div.getAttribute('data-search') ) {
	var search_partner = form_div.getAttribute('data-search').replace(/[^a-zA-Z0-9\-,. ]/gi, '');
} else {
	var search_partner = "";
}
if ( form_div.getAttribute('data-heading') ) {
	var heading = form_div.getAttribute('data-heading').replace(/[^a-zA-Z0-9\-,. ]/gi, '');
} else {
	var heading = "";	
}
var color = form_div.getAttribute('data-color');
var addstyles = form_div.getAttribute('data-addstyles');

// Build partners input
if ( search_partner != "" ) {
	var partner = '<input type="hidden" name="provider" value="' + search_partner + '">';
} else {
	var partner = "";
}

// Use heading or not
if ( heading && heading == "none" ) {
	var form_heading = "";
} else if ( heading && heading != "yes" ) {
	var form_heading = '<h3 class="ppc-search-heading">' + heading + '</h3>';
} else {
	var form_heading  = '<h3 class="ppc-search-heading">Search Plains to Peaks Collective</h3>';
}

// Choose black or white image (not actually necessary for PPC widget)
if ( color && color == "dark" ) {
	var logo_image = '<img src="https://cdn.statically.io/gh/DigExpCon/ppcdplawidget@8da398dc4fdf31b45715dcdabadca06530470b09/PtoP_logo_trans.png" alt="" class="ppc_widget_logo" width="100px">';
} else {
	var logo_image = '<img src="https://cdn.statically.io/gh/DigExpCon/ppcdplawidget@8da398dc4fdf31b45715dcdabadca06530470b09/PtoP_logo_trans.png" alt="" class="ppc_widget_logo" width="100px">';
}

// Add styles or not
if ( addstyles != "no" || addstyles == "" ) {
	var style = document.createElement('style');
	// These are basic styles applicable to either light or dark; they just control the layout and basic colors
  	style.innerHTML = `
    #ppc_search { padding: 15px; border-radius: 5px; max-width: 840px!important; }
  	.ppc_widget { display: grid; grid-template-columns: minmax(60px, 80px) minmax(80%, 900px); align-items: center; max-width: 800px!important; }
	.ppc-search-form { display: flex; margin-left: 1%; max-height: 70px; align-items: stretch; }
	.ppc-search-form label { flex:1; }
	input[type="search"].ppc-search-field { -webkit-appearance: none; width: 100%; height: 45px; border-radius: 2px 0 0 2px; background-color: white; opacity: 1; }
     input[type="search"].ppc-search-field:focus { background-color: white; opacity: 1; }
	input[type="submit"].ppc-search-submit { padding: 0 5%;  height:45px; border-radius: 0 2px 2px 0; }
	#ppc_search .screen-reader-text { clip: rect(1px, 1px, 1px, 1px); position: absolute!important; height: 0; width: 0; overflow: hidden; }
  	`;
	if ( addstyles != "basic" ) {
		style.innerHTML += `
		input[type="submit"].ppc-search-submit { background-color: #f0b323; color: #382F2D}
		input[type="submit"].ppc-search-submit:hover { background-color: #382F2D; color: #F0B323;}
		.ppc-search-field { 	color: #2c2a33; border: 1px solid #e1e5e6; border-radius: 3px; padding: 0.875rem; }
		h3.ppc-search-heading { font-size: calc(16px + 4.5vw*.1); line-height: 1; margin: 1% 0; }
		#ppc_search .ppc_widget img {border-radius: 0; box-shadow: none; }
	`;
	}
	if ( color == "dark" ) {
		style.innerHTML += `
		#ppc_search { background-color: #3e2b2e; }
		h3.ppc-search-heading { color: white; }
		#ppc_search .ppc_widget img {border-radius: 0; box-shadow: none; }
	`;		
	} 
  	document.head.appendChild(style);
}

// Build the form
var form = form_heading + '<div class="ppc_widget">' + logo_image +
'<form role="search" method="get" class="ppc-search-form" action="https://www.plains2peaks.org/" target="_blank">'+
	'<label><span class="screen-reader-text">Search for:</span>'+
		'<input type="search" class="ppc-search-field" placeholder="Search term" value="" name="txq">'+
	'</label>'+ 
	'<input type="hidden" name="a" value="q">' + 
	'<input type="hidden" name="hs" value="1">' + 
	'<input type="hidden" name="r" value="1">' + 
	'<input type="hidden" name="results" value="1">' + 
	'<input type="hidden" name="o" value="20">' + 
	'<input type="hidden" name="puq" value="">' + 
	partner +
	'<input type="submit" class="ppc-search-submit" value="Go">'+
'</form></div>';

// Display the form
form_div.innerHTML += form;
