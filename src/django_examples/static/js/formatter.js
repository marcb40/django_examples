var monthAbbreviations=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* Returns date as Jan 15, 2000 */
function formatDateMmmDdYyyy(dt) {
	if (!dt) return "";
	var m;
	var d;
	var y;
	
	if (typeof dt === "string") {
		y = dt.substring(0,4);
		m = monthAbbreviations[parseInt(dt.substring(5,7))-1];
		d = dt.substring(8,10);
		
	} else if (dt instanceof Date) {
		m = monthAbbreviations[dt.getMonth()];
		d = dt.getDate();
		y = dt.getFullYear();
		
	} else {
		return "";
	}

	return (m + " " + d + ", " + y);
};

/* Returns date as 01/15/2000 */
function formatDateMmDdYyyy(dt) {
	if (!dt) return "";
	var m;
	var d;
	var y;
	
	if (typeof dt === "string") {
		y = dt.substring(0,4);
		m = dt.substring(5,7);
		d = dt.substring(8,10);
		
	} else if (dt instanceof Date) {
		m = dt.getMonth()+1;
		d = dt.getDate();
		y = dt.getFullYear();
		
		if (m < 10) {
			m = "0" + m;
		}
		if (d < 10) {
			d = "0" + d;
		}
		
	} else {
		return "";
	}

	return (m + "/" + d + "/" + y);
};


function htmlEscape(str) {
	if (!str) return null;
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
};