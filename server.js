var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/views/parser", function(req, res) {
  let header = req.headers;
  let ip = (header['x-forwarded-for']||req.socket.remoteAddress).split(",")[0];
  let lang = header['accept-language'].split(",")[0];
  let software = header['user-agent'].split('(')[1].split(')')[0];
  let result = {"ipaddress":ip, "language":lang, "software":software};
  res.end(JSON.stringify(result));
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
