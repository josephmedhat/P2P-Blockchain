const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(Index, Timestamp, Transactions, PreviousHash = "") {
      this.Index = Index;
      this.Timestamp = Timestamp;
      this.Transactions = Transactions;
      this.PreviousHash = PreviousHash;
      this.Hash = this.calculateHash();
      this.nonce = 0;
    }
    calculateHash() {
      return SHA256(
        this.Index +
          this.PreviousHash +
          this.Timestamp +
          JSON.stringify(this.Transactions) +
          this.nonce
      ).toString();
    }
  
    mineBlock(Difficulty) {
      while (
        this.Hash.substring(0, Difficulty) !== Array(Difficulty + 1).join("0")) {
        this.nonce++;
        this.Hash = this.calculateHash();
      }
      console.log("Block mined: " + this.Hash);
    }
    ValidTransactions(){
      for(const transaction of this.Transactions){
        if(!transaction.Is_validTransaction()){
          return false;
        }
      }
      return true;
    }
  }
  
  module.exports = Block;
