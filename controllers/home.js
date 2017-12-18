var parking = require('../models/parking');
var velo = require('../models/velo');
var travaux = require('../models/travaux');
var upparking = require('../controllers/parking')
var upvelo = require('../controllers/velo')
var uptravaux = require('../controllers/travaux')
var geodist = require('geodist')

exports.index = function(req, res) {
	res.render('Home', {
		title: 'Accueil'
	});
	//upvelo.update();
	//upparking.update();
};

exports.velo = function(req, res){
	//uptravaux.update();
	var query = velo.find();
  query.exec(function(err,comms){
		res.render('station', {
    	title: 'Station velo',
			tab:comms
  	});
  });
};

exports.voiture = function(req, res){
	//uptravaux.update();
	var query = parking.find();
  query.exec(function(err,comms){
		res.render('parking', {
    	title: 'Parking',
			tab:comms
  	});
  });
}

exports.details = function(req, res) {
	//key : AIzaSyD4k459oJsSbP-VjwhnpABf9OqhorZnGlc
	velo.findOne({number:req.param('id')},function(err,result){
		var c= 11754255.426096; //constante de la projection
		var e= 0.0818191910428158; //première exentricité de l'ellipsoïde
		var n= 0.725607765053267; //exposant de la projection
		var xs= 700000; //coordonnées en projection du pole
		var ys= 12655612.049876; //coordonnées en projection du pole
		var l=result.lat;
		var ln=result.lng;
		var l1={l,ln};
		var tp=[];
		var tt=[];
		var markersp="";
		var markerst="";
		//travaux
		var query = travaux.find();
		query.exec(function(er,comms){
			//parking
			var q =parking.find();
			q.exec(function(errr,com){
				//for travaux
				for(var i=0;i<comms.length;i++){
					var x =comms[i].x;
					var y=comms[i].y;
					var a=(Math.log(c/(Math.sqrt(Math.pow((x+xs),2)+Math.pow((y-ys),2))))/n);
					var r =e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*Math.sin(1)))))))))))))))))))
					var lng=((Math.atan(-(x-xs)/(y-ys)))/n+3/180*Math.PI)/Math.PI*180;
					var lat=Math.asin(Math.tanh((Math.log(c/Math.sqrt(Math.pow((x-xs),2)+Math.pow((y-ys),2)))/n)+e*Math.atanh(r)))/Math.PI*180+0.006;
					var l2={lat,lng}
					if(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2)<1){
						tt.push(comms[i]);
						markerst+="&markers=color:yellow%7Clabel:T%7C"+lat+","+lng;
					}
				}
				//for parking
				for(var j=0;j<com.length;j++){
					var x =com[j].x;
					var y=com[j].y;
					var a=(Math.log(c/(Math.sqrt(Math.pow((x+xs),2)+Math.pow((y-ys),2))))/n);
					var r =e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*Math.sin(1)))))))))))))))))))
					var lng=((Math.atan(-(x-xs)/(y-ys)))/n+3/180*Math.PI)/Math.PI*180;
					var lat=Math.asin(Math.tanh((Math.log(c/Math.sqrt(Math.pow((x-xs),2)+Math.pow((y-ys),2)))/n)+e*Math.atanh(r)))/Math.PI*180+0.006;
					var l2={lat,lng}
					if(com[j].places!=null){
						if(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2)<1){
							tp.push(com[j]);
							markersp+="&markers=color:blue%7Clabel:P%7C"+lat+","+lng;
						}
					}
				}
				var carte="https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C"+l+","+ln+markersp+markerst+"&key=AIzaSyD4k459oJsSbP-VjwhnpABf9OqhorZnGlc";
				res.render('details', {
					title: 'Station',
					tabvelo :result,
					tabparking:tp,
					tabtravaux:tt,
					c:carte
				});
			});
		});
	});
};

exports.detailp = function(req, res) {
	parking.findOne({id:req.param('id')},function(err,result){
		var c= 11754255.426096; //constante de la projection
		var e= 0.0818191910428158; //première exentricité de l'ellipsoïde
		var n= 0.725607765053267; //exposant de la projection
		var xs= 700000; //coordonnées en projection du pole
		var ys= 12655612.049876; //coordonnées en projection du pole
		//	var l=result.lat;
		//	var ln=result.lng
		var x =result.x;
		var y=result.y;
		var a=(Math.log(c/(Math.sqrt(Math.pow((x+xs),2)+Math.pow((y-ys),2))))/n);
		var r =e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*Math.sin(1)))))))))))))))))))
		var ln=((Math.atan(-(x-xs)/(y-ys)))/n+3/180*Math.PI)/Math.PI*180;
		var l=Math.asin(Math.tanh((Math.log(c/Math.sqrt(Math.pow((x-xs),2)+Math.pow((y-ys),2)))/n)+e*Math.atanh(r)))/Math.PI*180+0.006;
		var l1={l,ln};
		var ts=[];
		var tt=[];
		var markerst="";
		var markerss="";
		//travaux
		var query = travaux.find();
		query.exec(function(er,comms){
			//station
			var q =velo.find();
			q.exec(function(errr,com){
				//for travaux
				for(var i=0;i<comms.length;i++){
					var x =comms[i].x;
					var y=comms[i].y;
					var a=(Math.log(c/(Math.sqrt(Math.pow((x+xs),2)+Math.pow((y-ys),2))))/n);
					var r =e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*(Math.tanh(a+e*Math.atanh(e*Math.sin(1)))))))))))))))))))
					var lng=((Math.atan(-(x-xs)/(y-ys)))/n+3/180*Math.PI)/Math.PI*180;
					var lat=Math.asin(Math.tanh((Math.log(c/Math.sqrt(Math.pow((x-xs),2)+Math.pow((y-ys),2)))/n)+e*Math.atanh(r)))/Math.PI*180+0.006;
					var l2={lat,lng}
					//console.log(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2));
					if(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2)<1){
						tt.push(comms[i]);
						markerst+="&markers=color:yellow%7Clabel:T%7C"+lat+","+lng;
					}
				}
				//for station
				for(var j=0;j<com.length;j++){
					var lat=com[j].lat;
					var lng=com[j].lng;
					var l2={lat,lng}
					//console.log(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2));
					if(geodist(l1,l2,{exact: true, unit: 'km'}).toFixed(2)<1){
						ts.push(com[j]);
						markerss+="&markers=color:red%7Clabel:S%7C"+lat+","+lng;
					}
				}
				var carte="https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:P%7C"+l+","+ln+markerss+markerst+"&key=AIzaSyD4k459oJsSbP-VjwhnpABf9OqhorZnGlc";
				res.render('detailp', {
					title: 'Parking',
					tabparking :result,
					tabstation:ts,
					tabtravaux:tt,
					c:carte
				});
			});
		});
	});
};
