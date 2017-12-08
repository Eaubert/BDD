var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var Travaux = require('../models/travaux');
var https = require('https');

//Initialise ou met a jour la base a parti du json reucperer deuis l'url
exports.update = function(req, res, next) {

  var url = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Info_Travaux_Niveau/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson";

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var Response = JSON.parse(body);
          Response["features"].forEach(function(item){
            Travaux.update(item);
          });
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
};

//affiche la base dans la console
exports.getAll = function(req, res, next){
  var query = Travaux.find();

  query.exec(function(err,comms){
    comms.forEach(function(index){
      console.log(index);
    });
  });

}
