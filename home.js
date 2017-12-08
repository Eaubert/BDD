var Velo = require('../models/velo');

exports.index = function(req, res) {

		res.render('home', {
    	title: 'Home',
		});
};
