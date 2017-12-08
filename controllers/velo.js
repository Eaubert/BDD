var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var Velo = require('../models/velo');
var https = require('https');

/**
 * Initialiser database
 */
exports.init = function(req, res, next) {

  var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=6ae5e363f162f5c154af6c5078e55d4620559d11';

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var Response = JSON.parse(body);
          Response.forEach(function(item){
            Velo.save(item);
          })
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
};

exports.update = function(req, res, next) {

  var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=6ae5e363f162f5c154af6c5078e55d4620559d11';

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var Response = JSON.parse(body);
          Response.forEach(function(item){
            Velo.update(item);
          })
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });
};

exports.getAll = function(req, res, next){
  var query = Velo.find();

  query.exec(function(err,comms){
    comms.forEach(function(index){
      console.log(index);
    });
  });

}
