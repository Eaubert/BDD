var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: false,
  toJSON: {
    virtuals: false
  }
};

var ParkingSchema = new mongoose.Schema({
    objectid : Number,
    nom : String,
    places : String,
    complet : String,
    ferme : String,
    ouvert : String,
    capacite : Number,
    id : Number,
    adresse : String,
    date_maj : String,
    automatique : String,
    taux_occup : Number,
    taux_dispo : Number,
    lien : String,
    x : Number,
    y : Number
}, schemaOptions);

var Parking = mongoose.model('parking', ParkingSchema);

//Initialise ou met a jour la base
Parking.update = function(item){
  var attributes = item["attributes"];
  var geometry = item["geometry"];
  Parking.findOneAndUpdate( { id : attributes["ID"] }, {
        $set: {
            objectid : attributes["OBJECTID"],
            nom: attributes["NOM"],
            places: attributes["PLACES"],
            complet : attributes["COMPLET"],
            ferme: attributes["FERME"],
            ouvert: attributes["OUVERT"],
            capacite: attributes["CAPACITE"],
            id : attributes["ID"],
            adresse: attributes["ADRESSE"],
            date_maj: attributes["DATE_MAJ"],
            automatique : attributes["AUTOMATIQUE"],
            taux_dispo : attributes["TAUX_DISPO"],
            taux_occup : attributes["TAUX_OCCUP"],
            lien : attributes["LIEN"],
            x : geometry["x"],
            y : geometry["y"]
        }
    }, {upsert: true}, function(err, res){
    });
};

module.exports = Parking;
