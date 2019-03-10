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
  allBlockChains.map(chain,index)
}

function findPeer(id){
  for (var objId in peers) {
    if(objId == id)
      {
        return peers[id];
      }
  }
  return null;
}



































const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});







