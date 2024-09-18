const fs = require('fs');  
const keccak256 = require('keccak');  
const MerkleTree = require('merkletreejs').MerkleTree;  

const csv = require('csv-parser');  

const whitelist = [];  

fs.createReadStream("csv_folder/airdrop.csv")  
  .pipe(csv())  
  .on('data', (data) => {  
    const leaf = keccak256(`${data.address}${data.tokenId}`);  
    whitelist.push(leaf);  
  })  
  .on('end', () => {  
    const tree = new MerkleTree(whitelist, keccak256, { sort: true });  
    const root = tree.getHexRoot();  
    console.log("Merkle Root:", root);  
  });  
