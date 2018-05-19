var mongoose = require('mongoose');
var LengthDB = require('../../model/length.js');
var LengthExternal = require('../../model/lengthExternal.js');

var exports = module.exports = {};

// Handle get requests to return all lengths
exports.selectAllLengths = function (res) {
  LengthDB.find({}, function (err, lengths) {
    if (err) {
      console.log(err.message);
      res.status(500).send({error: "Could not fetch lengths"});
    } else {
      res.send(lengths);
    }
  });
}

// Insert new Length object
exports.insert = function (req, res) {
  var length = new LengthDB();
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
}

exports.getLength = function (req, res, callback) {
  LengthDB.find({description: req.body.description, abbreviation: req.body.abbreviation}, function (err, lengths) {
    if (err) {
      console.log(err.message);
      res.status(500).send({error: "Could not fetch lengths"});
    } else {
      console.log(lengths);
      res.send(lengths);
    }
  });
}


exports.convertLength = function (req, res) {
  LengthDB.findOne({description: req.body.inputLength.description, abbreviation: req.body.inputLength.abbreviation}, function (err, inputLengthDB) {
    if (err) {
      console.log(err.message);
      res.status(500).send({error: "Could not fetch lengths"});
    } else {
      LengthDB.findOne({description: req.body.targetLength.description, abbreviation: req.body.targetLength.abbreviation}, function (err, targetLengthDB) {
        if (err) {
          console.log(err.message);
          res.status(500).send({error: "Could not fetch lengths"});
        } else {

          // TODO update this to return an imported object!!!
          res.send({
            "description": targetLengthDB.description,
            "abbreviation": targetLengthDB.abbreviation,
            "amount": req.body.inputLength.amount * inputLengthDB.lengthInMM / targetLengthDB.lengthInMM
          });

          // var lengthExternal = LengthExternal.lengthExternal;
          // lengthExternal.description = targetLengthDB.description;
          // lengthExternal.abbreviation = targetLengthDB.abbreviation;
          // lengthExternal.amount = req.body.inputLength.amount * inputLengthDB.lengthInMM / targetLengthDB.lengthInMM;
          // // var externalLength = new LengthExternal(targetLengthDB.description, targetLengthDB.abbreviation, amount);
          // console.log(lengthExternal);
          // res.send(lengthExternal);
        }
      });
    }
  });
}

// Export router
module.exports = exports;
