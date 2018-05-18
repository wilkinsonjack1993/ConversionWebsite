var express = require('express');
var router = express.Router();

var LengthService = require('../route/service/lengthService.js');

// Handle get requests to return all lengths
router.get('/getAll', function(req, res) {
  LengthService.getAllLengths(res);
});

// Handle post requests to insert new length
// Return newly inserted length record.
router.post('/insert', function(req, res) {
  LengthService.insertLength(req, res);
});

// Export router
module.exports = router;
