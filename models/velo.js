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
  number: Number,
  name: String,
  address: String,
  lat:Number,
  lng: Number,
  banking: Boolean,
  bonus: Boolean,
  status: String,
  contract_name: String,
  bike_stands: Number,
  available_bike_stands: Number,
  available_bikes: Number,
  last_update: Number
}, schemaOptions);

var VeloStation = mongoose.model('velo', VeloStationSchema);

//Initialise ou met a jour la base
VeloStation.update = function(item){
  var position = item["position"];
  VeloStation.findOneAndUpdate({number : item["number"]}, {
        $set: {
          name : item["name"],
          address : item["address"],
          lat : position["lat"],
          lng : position["lng"],
          banking : item["banking"],
          bonus : item["bonus"],
          status: item["status"],
          contract_name : item["contract_name"],
          bike_stands: item["bike_stands"],
          available_bike_stands: item["available_bike_stands"],
          available_bikes: item["available_bikes"],
          last_update: item["last_update"]
        }
    }, {upsert: true}, function(err){});
};

module.exports = VeloStation;
