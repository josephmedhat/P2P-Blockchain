
const EC=require('elliptic').ec;
const ec=EC('secp256k1');

const key=ec.genKeyPair();
const PublicKey=key.getPublic('hex');
const PrivateKey=key.getPrivate('hex');

console.log("private key ",PrivateKey);
console.log("public key ",PublicKey);