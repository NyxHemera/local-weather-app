var celsius = false;
var currentCity = 0;

$( document ).ready(function() {
	
	getCurrentLocation();
	
});

function doWeatherStuff(wObj) {
	var lon = wObj.coord.lon;
	var lat = wObj.coord.lat;
	var city = wObj.name;
	var weather = wObj.weather[0].main;
	var wDesc = wObj.weather[0].description;
	var temp = wObj.main.temp;
	var humid = wObj.main.humidity;
	
	adjustBackground(temp);
	
	if(celsius){
		temp = temp-273.15;
		temp = Math.ceil(temp*100) / 100;
		temp = temp + String.fromCharCode(176) + "C";
	}else{
		temp = 1.8*(temp-273) + 32;
		temp = Math.ceil(temp*100) / 100;
		temp = temp + String.fromCharCode(176) + "F";
	}
	
	updateHTML(lon, lat, temp, weather, humid, city, wObj);
}

//updates the page with weather info
function updateHTML(lon, lat, temp, weather, humid, city, wObj) {
	$('#longitude').text("Longitude: " + lon);
	$('#latitude').text("Latitude: " + lat);
	$('#temperature').text(temp);
	$('#weather-description').text(weather);
	$('#city').text(city);
	$('#humidity').text(humid + "% Humidity");
	
	//Show JSON
	$('#JSON-ACTUAL').text(JSON.stringify(wObj));
}

function adjustBackground(temp) {
	temp = temp-273.15;
	if(temp <= 0){
		//freezing
		$("body").css("background-image","url('https://36ac30c13130509695cc52edff7cc9aaed02b916.googledrive.com/host/0B-hZ9xIoiYFbcXhQejBRLXR6NGc/alm-549333_1280.jpg')");
	}else if(temp <= 15.56){
		//cold
		$("body").css("background-image","url('https://36ac30c13130509695cc52edff7cc9aaed02b916.googledrive.com/host/0B-hZ9xIoiYFbcXhQejBRLXR6NGc/forest-642116_1280.jpg')");
	}else if(temp <= 25.56){
		//warm
		$("body").css("background-image","url('https://36ac30c13130509695cc52edff7cc9aaed02b916.googledrive.com/host/0B-hZ9xIoiYFbcXhQejBRLXR6NGc/landscape-403165_1280.jpg')");
	}else{
		//HOT
		$("body").css("background-image","url('https://36ac30c13130509695cc52edff7cc9aaed02b916.googledrive.com/host/0B-hZ9xIoiYFbcXhQejBRLXR6NGc/desert-1007157_1280.jpg')");
	}
}

function changeTemp() {
	celsius = !celsius;
	if(currentCity===0){
		getCurrentLocation();
	}else{
		getSpecificLocation(currentCity);
	}
	
}

function getCurrentLocation(api) {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			var api = 'http://api.openweathermap.org/data/2.5/weather?lat=';
			api += position.coords.latitude + "&lon=";
			api += position.coords.longitude + "&APPID=c02785c4236a60cafe25905ab8a0745b";
			
			$.getJSON(api, doWeatherStuff);
		});
	}
}

function getSpecificLocation(num) {
	var api = 'http://api.openweathermap.org/data/2.5/weather?lat=';
	var location = '';
	var key = '&APPID=c02785c4236a60cafe25905ab8a0745b';
	currentCity = num;
	
	switch(num){	
		case 1:
			//London
			api += 51.51 + "&lon=";
			api += -0.13;
			break;
		case 2:
			//Dubai
			api += 25.26 + "&lon=";
			api += 55.3;
			break;
		case 3:
			//Tokyo
			api += 35.69 + "&lon=";
			api += 139.69;
			break;
		case 4:
			//Moscow
			api += 55.75 + "&lon=";
			api += 37.62;
			break;
		case 5:
			//New York
			api += 40.71 + "&lon=";
			api += -74.01;
			break;
	}
	
	api += key;
	$.getJSON(api, doWeatherStuff);
	
}