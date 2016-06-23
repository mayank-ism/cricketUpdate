var express = require('express');
var router = express.Router();

router.use('/match', require(__dirname + '/match'));
router.use('/news', require(__dirname + '/news'));

module.exports = router;
