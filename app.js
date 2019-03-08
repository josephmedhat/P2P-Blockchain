const block=require('./block.js');
const blockChain=require('./Blockchain.js');
const Transaction=require('./Transaction.js');
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
   // bb.Add_Block(x1);
    bb.Create_Transaction(new Transaction('add1','add2',{area:30*40,price:100}));
    bb.Create_Transaction(new Transaction('add2','add1',{area:30*40,price:50}));
bb.minePinding_Transactions('add1');
console.log("the balance",bb.GetPalance('add1'));
bb.minePinding_Transactions('add2');
console.log("the balance",bb.GetPalance('add2'));

   //console.log(bb.Chain);
   //console.log("is chain valid? "+bb.Is_validChain());
  console.log(`Server running at http://${hostname}:${port}/`);

});






