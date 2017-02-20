const fs = require('fs');
const http = require("http");

var server = http.createServer();

server.on('request', function (req, res) {
  var json = JSON.parse(fs.readFileSync('./'+process.argv[2], 'utf8'));
  var key = req.url.replace(/^\u002f/g, "");
  res.writeHead(200, {
    'Content-Type':'application/json',
    'Connection':'close'
  });
  if(json[key]){
    var resPrams = JSON.stringify(json[key]);
    res.write(resPrams);
    res.end();
  }else{
    res.write(JSON.stringify({}));
    res.end();
  }
})

server.listen(3000, function () {
  console.log('listening on ' + 3000);
});
