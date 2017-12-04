var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: false,
  toJSON: {
    virtuals: false
  }
};

var VeloStationSchema = new mongoose.Schema({
  name :String,
  number :Number,
  address:String,
  lat: Number,
  lng: Number,
  open:Number
}, schemaOptions);


var VeloStation = mongoose.model('velo', VeloStationSchema);
new VeloStation({name:'00027 - NANCY THERMAL (CB)',number :27,address:'Rue du Sergent Blandan',lat:48.67899967679407,lng:6.167632567397485,open:1}).save();
module.exports = VeloStation;
