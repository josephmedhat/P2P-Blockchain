const block=require('./block.js');
const peer=require('./peer')
const msg=require('./message')
const blockChain=require('./Blockchain.js');
const Transaction=require('./Transaction.js');
const http = require('http');
const swarm = require('discovery-swarm');
const port1 =require('get-port');
const readline = require('readline')
var defaults = require('dat-swarm-defaults')
const find = require('local-devices');
const netList = require('network-list');
const EC=require('elliptic').ec;
const ec=EC('secp256k1');

var numberOfConnections=0
var peers=[];
var allBlockChains=[]
var user_input;
var myBlockChain=new blockChain()
//////////////////////////////////////////////////////////////////////////

const askUser = async () => {
  user_input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  user_input.question('Send message: ', message => {
    var request=JSON.stringify(new msg(message))
    peers[request.second_id].connection.write(request)
    user_input.close()
    user_input = undefined
    askUser()
  });
}


const myPrivatekey=ec.keyFromPrivate('0dcf1477c7a8b0ff12abd38937ec35f9573399c07f03a3e7990268410a2ede5e');
const myWalletAddress=myPrivatekey.getPublic('hex');

/////////////////////////////////////////////////////////////////////////////
var myId=Math.random().toString()
var config = defaults({
  id:myId
})

var sw = swarm(config);
var myPort=0;




(async () => {
  myPort=await port1();
  console.log('your id is '+ myId)
  console.log('Listening to port: ' + myPort)

  sw.listen(myPort);

  sw.join('network')

  sw.on('connection', function(connection, info) {
        //add new peer
          var newPeer=new peer(myId,connection,info,numberOfConnections);
          if(!peers[newPeer.id]){
           console.log(peers)
           peers[newPeer.id]=newPeer
            for (var id in peers) {
              console.log(peers[id])
              var request=JSON.stringify(new msg(newPeer.id+","+id+","+"need"));
              peers[id].connection.write(request)
            }
            

            connection.on('data',(data1)=>{
              data=JSON.parse(data1.toString())
              console.log("request type is"+data.type)
              console.log(data)
              if(data.type == "need"){
                //console.log(peers)
                //console.log(peers[data.first_id])
                  if(peers[data.first_id]){
                    console.log(myBlockChain)
                    var newRequest=new msg("0,0,give",myBlockChain)
                    peers[data.first_id].connection.write(newRequest)
                  }
              }
              else if(data.type == "give"){
                    allBlockChains.push(data.content)
              }
              console.log(allBlockChains)
            })
            askUser()

          }

       
        // recieve request
       
 })
})();

function getLargest(){
  var max=allBlockChains[0]
  allBlockChains.map(function(chain,index){
      if(chain.length()>max.length){
        max=allBlockChains[index]
      }
  })
  return max;
}






  let x1=new block(1,"30/6/2016","test_block");

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







