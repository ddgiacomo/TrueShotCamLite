function buscaGeo() {
	var ltln = localStorage.getItem("latlon");
	
	if (navigator.geolocation) {
//		navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
		gps2 = "OK";
//		var location_timeout = setTimeout("golocFail()", 10000);
//		navigator.geolocation.getCurrentPosition(app.showPosition, app.posFail, {maximumAge:66000, timeout:10000});
		var geo = navigator.geolocation;
		geo.getCurrentPosition(showLocation, showError);
	}
}

function showLocation(position) {
//	clearTimeout(location_timeout);
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var igps = "lat: " + lat + ", Long: " + lng;
//	localStorage.setItem("latlon", igps);
	localStorage.setItem("latlon", "SI GPS");
}

function showError(position) {
	clearTimeout(location_timeout);
	localStorage.setItem("latlon", "NO GPS");
}
