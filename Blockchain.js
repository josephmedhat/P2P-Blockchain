const block=require('./block.js');
const Transaction=require('./Transaction.js');

class Blockchain{

constructor(){
    this.Chain=[this.CreateGenesisBlock()];
    this.Difficulty=3;
    this.PendingTransactions=[];
}

CreateGenesisBlock(){
    return new block(0,"23/10/2018","GenesisBlock","0");
}
GetlatestBlock(){
    return this.Chain[this.Chain.length-1];
}

/*Add_Block(newBlock){
    console.log(this.GetlatestBlock());
    newBlock.PreviousHash=this.GetlatestBlock().Hash;
   // newBlock.Hash=newBlock. calculateHash();
   newBlock.mineBlock(this.Difficulty);
this.Chain.push(newBlock);
console.log(this.Chain.length);

}*/
minePinding_Transactions(){
    let Block= new block("",Date.now,this.PendingTransactions);
    Block.mineBlock(this.Difficulty);
    console.log("mining successfully");
    this.Chain.push(Block);
    this.PendingTransactions=[];
}

Create_Transaction(transaction){
    this.PendingTransactions.push(transaction);
}

GetPalance(address){
    let balance=0;
    for(const block of this.Chain)
    {
        console.log(block.Transactions);

    for(const transaction of block.Transactions)
    {
    if(transaction.PublicKey_sender==address){
     balance-=transaction.obj.price;
    }
    if(transaction.PublicKey_reciepient==address){
        balance+=transaction.obj.price;
    }
    }
    }
return balance;
}
Is_validChain(){
for(let i=1;i<this.Chain.length;i++){
    const Current_block=this.Chain[i];
    const Previous_block=this.Chain[i-1];
    console.log(Current_block);
    console.log(Current_block.Hash) 
    console.log(Current_block.calculateHash()) 

    if(Current_block.Hash!==Current_block.calculateHash()){
        return false;
    }
    
    if(Current_block.PreviousHash!==Previous_block.Hash){
        return false;
    }
   
}
return true;
}

}
module.exports = Blockchain;
