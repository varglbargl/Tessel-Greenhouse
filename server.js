var express = require('express');
var app = express();
var url = require('url');
var fs  = require('fs');

// -- SERVE STARIC FILES

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, 'index.html'));
});

// -- CREATE SERVER

var port = process.env.PORT || 3030;
console.log('Listening on port', port);
app.listen(port);

// todo: add character save to parse