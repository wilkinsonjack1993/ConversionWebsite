var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Weight = require('../model/weight.js');

// Handle get all requests and return all Weights
router.get('/', function(req, res) {
  Weight.find({}, function (err, weights) {
    if (err) {
      res.status(500).send({error: "Could not fetch weights"});
    } else {
      res.send(weights);
    }
  });
});

// Handle post request to insert a weight
// Return newly inserted length record
router.post('/', function (req, res) {
	var weight = new Weight();
	weight.description = req.body.description;
	weight.abbreviation = req.body.abbreviation;
	weight.weightInKgs = req.body.weightInKgs;
	weight.dateAdded = new Date();

	weight.save(function (err, savedWeight) {
		if (err) {
			res.status(500).send({error: "Could not save weight"});
		} else {
			res.send(savedWeight);
		}
	});
});

// Export router
module.exports = router;
