var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: false,
  toJSON: {
    virtuals: false
  }
};

var TravauxSchema = new mongoose.Schema({
    objectid : Number,
    type_intervention : String,
    libelle_travaux : String,
    intervenant : String,
    niveau_gene : String,
    descr_gene1 : String,
    descr_gene2 : String,
    descr_gene3 : String,
    adresse : String,
    commune : String,
    auteur : String,
    modifie_par : String,
    section : String,
    delestage_deviation : String,
    date_debut : Number,
    date_fin : Number,
    x : Number,
    y : Number
}, schemaOptions);

var Travaux = mongoose.model('travaux', TravauxSchema);

//Initialise ou met a jour la base
Travaux.update = function(item){
  var attributes = item["attributes"];
  var geometry = item["geometry"];
  Travaux.findOneAndUpdate( { objectid : attributes["OBJECTID"] }, {
        $set: {
            objectid : attributes["OBJECTID"],
            type_intervention : attributes["TYPE_INTERVENTION"],
            libelle_travaux : attributes["LIBELLE_TRAVAUX"],
            intervenant : attributes["INTERVENANT"],
            niveau_gene : attributes["NIVEAU_GENE"],
            descr_gene1 : attributes["DESCR_GENE1"],
            descr_gene2 : attributes["DESCR_GENE2"],
            descr_gene3 : attributes["DESCR_GENE3"],
            adresse : attributes["ADRESSE"],
            commune : attributes["COMMUNE"],
            auteur : attributes["AUTEUR"],
            modifie_par : attributes["MODIFIE_PAR"],
            section : attributes["SECTION"],
            delestage_deviation : attributes["DELESTAGE_DEVIATION"],
            date_debut : attributes["DATE_DEBUT"],
            date_fin : attributes["DATE_FIN"],
            x : geometry["x"],
            y : geometry["y"]
        }
    }, {upsert: true}, function(err, res){
    });
};

module.exports = Travaux;
