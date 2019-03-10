const SHA256 = require('crypto-js/sha256');

const EC=require('elliptic').ec;
const ec=EC('secp256k1');


class Transaction{
constructor (PublicKey_sender,PublicKey_reciepient,dataObj){
    
this.PublicKey_reciepient=PublicKey_reciepient;
this.PublicKey_sender=PublicKey_sender;
this.obj={
    area:dataObj.area,
    price:dataObj.price
};

}
calculateHash(){
    return SHA256(this.PublicKey_sender + ":"+this.PublicKey_reciepient+":"+this.dataObj).toString();
}
Sign_Transaction(signKey){
if(signKey.getPublic('hex') != this.PublicKey_sender){
    throw new Error("You cannot sign this transaction !");
}
const hashT=this.calculateHash();
const sig=signKey.sign(hashT,'base64');
this.signature=sig.toDER('hex');
}

Is_validTransaction(){
if(!this.signature||this.signature.length==0){
    throw new Error("there is no signature in this transaction !");
}
const PublicKey=ec.keyFromPublic(this.PublicKey_sender,'hex');
return PublicKey.verify(this.calculateHash(),this.signature);
}

}
module.exports= Transaction;