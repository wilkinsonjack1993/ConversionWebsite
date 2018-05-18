var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var length = new Schema({
	description: String,
	abbreviation: String,
	lengthInMM: {type:Number, 'default': 0},
	dateAdded: Date
});

module.exports = mongoose.model('Length', length);
