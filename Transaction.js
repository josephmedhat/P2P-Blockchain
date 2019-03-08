class Transaction{
constructor (PublicKey_sender,PublicKey_reciepient,dataObj){
    
this.PublicKey_reciepient=PublicKey_reciepient;
this.PublicKey_sender=PublicKey_sender;
this.obj={
    area:dataObj.area,
    price:dataObj.price
};

}}
module.exports= Transaction;