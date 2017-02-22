#! /usr/bin/env node

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

'use strict';

const fs = require('fs');
const http = require('http');

var host = 3104;
var header = 200
var server = http.createServer();
if(process.argv[3] !== void 0){
  host = process.argv[3];
}
server.on('request', function (req, res) {
  var json = JSON.parse(fs.readFileSync('./'+process.argv[2], 'utf8'));
  var key = req.url.replace(/^\u002f/g, "");
  if(json[key]){
    if('status' in json[key]){
      var statusArr = json[key]["status"];
      var success = 200;
      var error = 400;
      statusArr.forEach(function(status) {
        if(status >= 200 && status < 300){
          success = status
          header = success;
        }else{
          error = status;
        }
      });
      var requireArr = json[key]["require"];
      var data = '';
      req.on('data', function (chunk) {
        data += chunk;
      })
      req.on('end', function () {
        var match = true;
        var dataObj = JSON.parse(data);
        var resPrams;
        for (var req in requireArr) {
          console.log(requireArr[req]);
          if(requireArr[req] in dataObj){
            console.log("exist");
          }else{
            console.log("don't exist");
            match = false
            header = error
          }
        }
        //ここでヘッダー判別
        res.writeHead(header, {
          'Content-Type':'application/json',
          'Connection':'close'
        });
        if(match == true){
          resPrams = JSON.stringify(json[key][success]);
        } else {
          resPrams = JSON.stringify(json[key][error]);
        }
        console.log(new Date() + ", " + req.method + "=" + key + ", status="+header+ ", response=" + resPrams);
        res.write(resPrams);
        res.end();
      })
    }
  }else{
    res.writeHead(404, {
      'Content-Type':'application/json',
      'Connection':'close'
    });
    console.log(new Date() + ", " + req.method + "=" + key + ", status=404, response={}");
    res.write(JSON.stringify({}));
    res.end();
  }
})

server.listen(host, function () {
  console.log('listening on ' + host);
});
