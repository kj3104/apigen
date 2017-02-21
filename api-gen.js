/*
The MIT License (MIT)

Copyright (c) 2017 luca3104.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
