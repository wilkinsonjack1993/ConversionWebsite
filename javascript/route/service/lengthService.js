var LengthAccess = require('../access/lengthAccess.js')

var exports = module.exports = {};

// Returns all lengths in database
exports.getAllLengths = function(res) {
  LengthAccess.selectAllLengths(res);
}

// Inserts length into database
exports.insertLength = function(req, res) {
  LengthAccess.insert(req, res);
}

// Call convert length
exports.convertLength =  function (req, res) {
  LengthAccess.convertLength(req, res);
}


module.exports = exports;
