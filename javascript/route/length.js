var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Length = require('../model/length.js');

// Handle get requests to return all lengths
router.get('/', function(req, res) {
  Length.find({}, function (err, lengths) {
    if (err) {
      res.status(500).send({error: "Could not fetch lengths"});
    } else {
      res.send(lengths);
    }
  });
});

// Handle post requests to insert new length
// Return newly inserted length record.
router.post('/', function(req, res) {
  var length = new Length();
  length.description = req.body.description;
  length.abbreviation = req.body.abbreviation;
  length.lengthInMM = req.body.lengthInMM;
  length.dateAdded = new Date();

  length.save(function (err, savedLength) {
    if (err) {
      res.status(500).send({error: "Length could not be saved"});
    } else {
      res.send(savedLength);
    }
  });
});

// Export router
module.exports = router;
