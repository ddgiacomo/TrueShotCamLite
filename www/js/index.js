var app = {
	
initialize: function() {
	this.bindEvents();
},
         
bindEvents: function() {
	var takePhoto = document.getElementById('takePhoto');
	takePhoto.addEventListener('click', app.takePhoto, false);
	var sendPhoto = document.getElementById('sendPhoto');
//	sendPhoto.addEventListener('click', app.sendPhoto, false);
},
 
/*sendPhoto: function() {
	alert('antes del windows.canvas');
//	var canvas2ImagePlugin = window.plugins.canvas2ImagePlugin;
	alert('despues del windows.canvas');
    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            console.log(msg);
			alert('windows.canvas OK');
        },
        function(err){
            console.log(err);
			alert('error en windows.canvas');
        },
        document.getElementById('canvas')
    );
	alert('despues del windows.canvas');
},*/
 
takePhoto: function(){
	navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 80, 
		destinationType: navigator.camera.DestinationType.FILE_URI });
//			navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
//		allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL }); 
},
 
onPhotoDataSuccess: function(imageData) {
/*
	Lee Local Storage
*/
	var sh0 = localStorage.getItem("lsystem");
	var sh1 = localStorage.getItem("daytime");
	var sh2 = localStorage.getItem("geoloc");
	var sh3 = localStorage.getItem("gps");
	var sh4 = localStorage.getItem("comm");
	var sh5 = localStorage.getItem("userid");
	var sh6 = localStorage.getItem("name");
	var sh7 = localStorage.getItem("phone");
	var lsty = localStorage.getItem("lstype");
	var lsqt = localStorage.getItem("lsqty");
	var stps = localStorage.getItem("stpos");
	var stcl = localStorage.getItem("stcol");
	var stsz = localStorage.getItem("stsiz");
	var umail = localStorage.getItem("usermail");
	var uname = localStorage.getItem("username");
	var uphon = localStorage.getItem("userphone");
	var ltln = localStorage.getItem("latlon");
	var ldir1 = localStorage.getItem("gpsdir1");
	var ldir2 = localStorage.getItem("gpsdir2");
	var ldir3 = localStorage.getItem("gpsdir3");
	
	var canvas=document.getElementById('canvas');
	var ctx=canvas.getContext("2d");
	var img=new Image();
	img.src= imageData;
//	var w = screen.width - 50;
	var x = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var xh = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

	var w = x - 50;
	var h = w;
/*	var x1=img.width/w;
	var y1=img.height/w;
	var x2=0;
	var y2=0;
	if (x1 > y1) {
		x2=img.width/x1;
		y2=img.height/x1;
	} else {
		x2=img.width/y1;
		y2=img.height/y1;
	}
*/	
img.onload = function(e) {
	var iw = img.width;
	var ih = img.height;
	var x1=img.width/w;
	h = img.height/x1;
	
	if (x < xh) {
		if (iw > ih) {
			h = h * 1.35;
			w = w * 1.35;
			canvas.width = h;
			canvas.height = w; 
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			ctx.translate(h/2,w/2);
			ctx.rotate(90*Math.PI/180);
			ctx.drawImage(img,-w/2,-h/2, w, h);
			ctx.restore();
			var temp = w;
			w = h;
			h = temp;
		} else {
			canvas.width=w;
			canvas.height=h;
			ctx.drawImage(img,0,0,w,h);
		}
	} else {         // posible cambio aqui para las fotos en landscape
		canvas.width=w;
		canvas.height=h;
		ctx.drawImage(img,0,0,w,h);
	}

// * agrega lineas
	ctx.lineWidth = 1;
	var nL = parseInt(lsqt);
// Selecciono color de linea
    if (stcl == "BLACK"){
        ctx.strokeStyle = 'black';
    } else if (stcl == "WHITE"){
		ctx.strokeStyle = 'white';
	} else if (stcl == "BLUE") {
		ctx.strokeStyle = 'blue';
    } else {
		ctx.strokeStyle = 'red';
	}

if (sh0 == "1"){	
	if (lsty == "G") {   // cuadricula
		var m = nL + 1;
		var a1 = 0;
		var a2 = w;
		for (i=1;i<=nL ; i++) {
			ctx.beginPath();
			ctx.moveTo(a1, (h/m)*i);
			ctx.lineTo(a2, (h/m)*i);
			ctx.stroke();
		}
		b1 = 0;
		b2 = h;
		for (i=1;i<=nL ; i++) {
			ctx.beginPath();
			ctx.moveTo((w/m)*i, b1);
			ctx.lineTo((w/m)*i, b2);
			ctx.stroke();
		}
	} else if (lsty == "D") {    //  diagonal
		m = nL +1;
		b1 = 0;
		b2 = h;
		for (i=1; i<=nL; i++) {
			ctx.beginPath();
			ctx.moveTo((w/m)*(i-1), b1);
			ctx.lineTo((w/m)*(i+1), b2);
			ctx.stroke();
		}
		b1 = h;
		b2 = 0;
		for (i=1; i<=nL; i++) {
			ctx.beginPath();
			ctx.moveTo((w/m)*(i-1), b1);
			ctx.lineTo((w/m)*(i+1), b2);
			ctx.stroke();
		}
	} else {                // circulos
		var t = nL * 2;
		var centerX = w/2;
		var centerY = h/2;
		var radius = (w/2)/nL;
		for (i=1; i<=nL; i++) {
		m = i - 1;
		ctx.beginPath();
		var radio = radius * i;
		ctx.arc(centerX, centerY, radio, 0, 2 * Math.PI, false);
		ctx.stroke();
		}
	}
}
// fin lineas
// agrego stamp
	var x3,y3;

// Selecciono tamaño de la letra
if (pWd == 0) {
	ctx.font="8px arial";
	var marginRight=180;
	var marginBottom=100;
	var lineSpace=8;
	if (stsz == "2X"){
        ctx.font="10px arial";
		lineSpace=10;
		marginRight=210;
		marginBottom=120;
    } else if (stsz == "3X"){
		ctx.font="12px arial";
		lineSpace=12;
		marginRight=230;
		marginBottom=140;
	}
} else {
	ctx.font="10px arial";
	var marginRight=180;
	var marginBottom=100;
	var lineSpace=10;
	if (stsz == "2X"){
        ctx.font="12px arial";
		lineSpace=12;
		marginRight=220;
		marginBottom=120;
    } else if (stsz == "3X"){
		ctx.font="14px arial";
		lineSpace=14;
		marginRight=260;
		marginBottom=140;
	}	
}
// Determino la Posicion del stamp
	if (stps == "UL"){
        x3 = 10;
        y3 = 15;
    } else if (stps == "BL"){
        x3 = 10;
        y3 = h - marginBottom;
    } else if (stps == "BR"){
        x3 = w - marginRight;
        y3 = h - marginBottom;
    } else {
        x3 = w - marginRight;
        y3 = 15;
    }
// Selecciono color de letra
    if (stcl == "BLACK"){
        ctx.fillStyle='black';
    } else if (stcl == "WHITE"){
		ctx.fillStyle='white';
	} else if (stcl == "BLUE") {
		ctx.fillStyle='blue';
    } else {
		ctx.fillStyle='red';
	}
			
//	var texto="usuario.de.prueba@ts.com";
//	var texto2="Usuario de Prueba TSC";
//	var texto3="Phone: +58 212 5556677";
	var texto=umail;
	var texto2=uname;
	var texto3=uphon;
	var texto4="True Shot CAM, version Android";
//	var texto4 = "X: " + x + " XH: " + xh + " IW: " + iw + " IH: " + ih;
	var texto5="Coords: -67.02737, 10.60886";
	var texto6="Direccion 1";
	var texto7="Direccion 2";
	var texto8="Direccion 3";
//	cw=tempCanvas.width=canvas.width;
//	ch=tempCanvas.height=canvas.height;
//	tempCtx.drawImage(canvas,0,0);
//	ctx.font="10px arial";
//	var textWidth=tempCtx.measureText(text).width;
//	tempCtx.globalAlpha=.50;
//	ctx.fillStyle='white';
//	ctx.stroke();
//	tempCtx.fillStyle='black'
//	tempCtx.fillText(text,cw-textWidth-10+2,ch-20+2);
	if (sh5 == "1"){
		ctx.fillText(texto,x3,y3);
	}
	if (sh6 == "1"){
		y3+=lineSpace;
		ctx.fillText(texto2,x3,y3);
	}
	if (sh7 == "1"){
		y3+=lineSpace;
		ctx.fillText(texto3,x3,y3);
	}
	if (sh1 == "1"){
		var month = new Array();
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";
		var date = new Date();
		var d  = date.getDate();
		var day = (d < 10) ? '0' + d : d;
		//var m = date.getMonth() + 1;
		//var month = (m < 10) ? '0' + m : m;
		var m = month[date.getMonth()];
		var yy = date.getYear();
		var year = (yy < 1000) ? yy + 1900 : yy;
		var h1 = date.getHours();
		var m1 = date.getMinutes();
		var s1 = date.getSeconds();
		//var fecha = day + "/" + month + "/" + year + "  " + h1 + ":" + m1 + ":" + s1 ;
		var fecha = m + " " + day + "," + year + "  " + h1 + ":" + m1 + ":" + s1;
		y3+=lineSpace;
		ctx.fillText(fecha,x3,y3);
	}
	if (sh4 == "1"){
		y3+=lineSpace;
		ctx.fillText(texto4,x3,y3);
	}
	if (sh3 == "1"){
		ltln = localStorage.getItem("latlon");
		y3+=lineSpace;
		ctx.fillText(ltln,x3,y3);
	}
	if (sh2 == "1"){
		y3+=lineSpace;
		ctx.fillText(ldir1,x3,y3);
		y3+=lineSpace;
		ctx.fillText(ldir2,x3,y3);
		y3+=lineSpace;
		ctx.fillText(ldir3,x3,y3);
	}
	
}
	var sendPhoto = document.getElementById('sendPhoto');
//	sendPhoto.style.display = 'block';
},

onFail: function(message) {
	alert('Failed because: ' + message);
},

showLocation: function(position) {
	gps3 = "OK";
//	clearTimeout(location_timeout);
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var igps = "lat: " + lat + ", Long: " + lng;
	localStorage.setItem("latlon", igps);
},

showError: function(position) {
	gps4 = "OK";
	clearTimeout(location_timeout);
}
}
