const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(Index, Timestamp, Data, PreviousHash = "") {
      this.Index = Index;
      this.Timestamp = Timestamp;
      this.Data = Data;
      this.PreviousHash = PreviousHash;
      this.Hash = this.calculateHash();
      this.nonce = 0;
    }
    calculateHash() {
      return SHA256(
        this.Index +
          this.PreviousHash +
          this.Timestamp +
          JSON.stringify(this.Data) +
          this.nonce
      ).toString();
    }
  
    mineBlock(Difficulty) {
      while (
        this.hash.substring(0, Difficulty) !== Array(Difficulty + 1).join("0")
      ) {
        this.nonce++;
        this.Hash = this.calculateHash();
      }
      console.log("Block mined: " + this.Hash);
    }
  }
  
  module.exports = Block;
