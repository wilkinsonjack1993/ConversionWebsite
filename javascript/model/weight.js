var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weight = new Schema({
	description: String,
	abbreviation: String,
	weightInKgs: {type:Number, 'default': 0},
	dateAdded: Date
});

module.exports = mongoose.model('Weight', weight);