const block=require('./block.js');
const http = require('http');
const swarm = require('discovery-swarm');
const port1 =require('get-port');
var defaults = require('dat-swarm-defaults')


const find = require('local-devices');
const netList = require('network-list');


const hostname = '127.0.0.1';
const port = 3000;
var dt = new Date();
var ips=[]; 
var config = defaults({
  id:Math.random().toString()
})
netList.scan({}, (err, arr) => {
  arr.map(function(currentValue, index, arr){
    if(currentValue.alive){
      console.log(currentValue.ip);
      ips.push(currentValue.ip);
    }
  });
  console.log(ips.length);
});


var sw = swarm(config);
var test=0;
(async () => {
   test=await port1();
  console.log('Listening to port: ' + test)

  // Will use 3000 if available, otherwise fall back to a random port
})();
sw.listen(test);

sw.join('peter') // can be any id/name/hash


sw.on('connection', function(connection, info) { 
        console.log(info);
 })




var timestamp = dt.toString();
const server = http.createServer((req, res) => {
   //let x1=new block(0,timestamp,"shebo");
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});








