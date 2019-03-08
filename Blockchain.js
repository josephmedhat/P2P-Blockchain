const block=require('./block.js');
class Blockchain{

constructor(){
    this.Chain=[this.CreateGenesisBlock()];
}

CreateGenesisBlock(){
    return new block(0,"23/10/2018","GenesisBlock","0");
}
GetlatestBlock(){
    return this.Chain[this.Chain.length-1];
}

Add_Block(newBlock){
    console.log(this.GetlatestBlock());
    newBlock.PreviousHash=this.GetlatestBlock().Hash;
    newBlock.Hash=newBlock. calculateHash();
this.Chain.push(newBlock);
console.log(this.Chain.length);

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
