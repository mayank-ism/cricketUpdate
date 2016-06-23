var express = require('express');

var app = express();
var config = require('./config/config');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/view/index.html');
});

app.use(require('./controller'));

app.listen(config.port);
