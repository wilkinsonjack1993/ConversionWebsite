var mongoose = require('mongoose');
var Length = require('../../model/length.js');

var exports = module.exports = {};

// Handle get requests to return all lengths
exports.selectAllLengths = function (res) {
  console.log("Length access receives call");
  Length.find({}, function (err, lengths) {
    if (err) {
      console.log(err.message);
      res.status(500).send({error: "Could not fetch lengths"});
    } else {
      console.log(lengths);
      res.send(lengths);
    }
  });
}

// Insert new Length object
exports.insert = function (req, res) {
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
}


// // Handle post requests to insert new length
// // Return newly inserted length record.
// router.post('/', function(req, res) {
//   var length = new Length();
//   length.description = req.body.description;
//   length.abbreviation = req.body.abbreviation;
//   length.lengthInMM = req.body.lengthInMM;
//   length.dateAdded = new Date();
//
//   length.save(function (err, savedLength) {
//     if (err) {
//       res.status(500).send({error: "Length could not be saved"});
//     } else {
//       res.send(savedLength);
//     }
//   });
// });

// Export router
module.exports = exports;
