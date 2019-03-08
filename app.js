const block=require('./block.js');
const blockChain=require('./Blockchain.js');
const Transaction=require('./Transaction.js');
const http = require('http');
const find = require('local-devices');
const netList = require('network-list');
const EC=require('elliptic').ec;
const ec=EC('secp256k1');

const myPrivatekey=ec.keyFromPrivate('0dcf1477c7a8b0ff12abd38937ec35f9573399c07f03a3e7990268410a2ede5e');
const myWalletAddress=myPrivatekey.getPublic('hex');

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
   // bb.Add_Transaction(new Transaction('add1','add2',{area:30*40,price:100}));
   // bb.Add_Transaction(new Transaction('add2','add1',{area:30*40,price:50}));


const t1=new Transaction(myWalletAddress,'add2',{area:30*40,price:100});
t1.Sign_Transaction(myPrivatekey);
bb.Add_Transaction(t1);

bb.minePinding_Transactions();
console.log("the balance",bb.GetPalance(myWalletAddress));
bb.minePinding_Transactions('add2');
console.log("the balance",bb.GetPalance('add2'));
console.log("is chain valid? ",bb.Is_validChain());
bb.Chain[1].Transactions[0].obj.price=5;

console.log("is chain valid? ",bb.Is_validChain());

   console.log(bb.Chain);
   //console.log("is chain valid? "+bb.Is_validChain());
  console.log(`Server running at http://${hostname}:${port}/`);

});






