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
	velo.findOne({number:req.param('id')},function(err,result){
		var query = parking.find();
	  query.exec(function(er,comms){
			res.render('details', {
				title: 'Station',
				tabvelo :result
			});
			console.log(comms[1].x)
		});
	});
};

exports.detailp = function(req, res) {
	res.render('details', {
		title: 'Parking'
	});
	var l1={lat :48,lon: 6}
	var l2={lat:48.027,lon:6}
	if(geodist(l1,l2,{exact: true, unit: 'km'})<3){
		console.log(geodist(l1,l2,{exact: true, unit: 'km'}))
	}else{
		console.log('oui')
	}
};
