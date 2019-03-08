const block=require('./block.js');
const blockChain=require('./Blockchain.js');
const http = require('http');
const find = require('local-devices');
const netList = require('network-list');


const hostname = '127.0.0.1';
const port = 3000;
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

const server = http.createServer((req, res) => {
   
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  let x1=new block(1,"30/6/2016","Bassantito");

   var bb=new blockChain();
    bb.Add_Block(x1);
   // console.log(bb.Chain);
   console.log("is chain valid? "+bb.Is_validChain());
  console.log(`Server running at http://${hostname}:${port}/`);

});






