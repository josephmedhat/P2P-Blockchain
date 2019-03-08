const block=require('./block.js');
const http = require('http');
const swarm = require('discovery-swarm');

const find = require('local-devices');
const netList = require('network-list');


const hostname = '127.0.0.1';
const port = 3000;
var dt = new Date();
var ips=[]; 
netList.scan({}, (err, arr) => {
  arr.map(function(currentValue, index, arr){
    if(currentValue.alive){
      console.log(currentValue.ip);
      ips.push(currentValue.ip);
    }
  });
  console.log(ips.length);
});


var sw = swarm();
sw.listen(3000);
sw.join(Math.random().toString()) // can be any id/name/hash


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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

});






