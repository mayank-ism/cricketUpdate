var express = require('express');
var request = require('request')
var config = require(__dirname + '/..' + '/config/config');
var router = express.Router();

router.get('/',function(req, res) {
	if(req.xhr) {
		var request_url = config.api_url + "cricket";
		request(request_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    });
	} else {
		res.redirect('/');
	}
});

router.get('/:id', function(req, res) {
	if(req.xhr) {
		var request_url = config.api_url + "cricketScore?unique_id=" + req.params.id;
		request(request_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    });	
	} else {
		res.redirect('/');
	}
});

router.get('/commentary/:id', function(req, res) {
	if(req.xhr) {
		var request_url = config.api_url + "cricketCommentary?unique_id=" + req.params.id;
		request(request_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(body); 
      }
    });	
	} else {
		res.redirect('/');
	}
});

module.exports = router;
