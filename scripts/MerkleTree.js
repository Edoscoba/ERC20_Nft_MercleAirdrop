const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');
const csv = require('csv-parser');
const { ethers, AbiCoder } = require('ethers');

const results = [];
const abiCoder = new AbiCoder();

const filename = "csv_folder/airdrop.csv";
const proof_file = "csv_folder/proofs.json";

fs.createReadStream(filename)
  .pipe(csv({ trim: true, skipEmptyLines: true })) 
  .on('data', (data) => {
    console.log('Raw data:', data); 
    
    if (data.address && data.tokenId) {
      results.push({
        address: data.address,
        tokenId: data.tokenId
      });
    } else {
      console.error('Invalid entry in CSV:', data);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    const leaves = results.map(item => {
      const tokenId = Number(item.tokenId);
      if (!item.address || isNaN(tokenId)) {
        console.error('Invalid item:', item);
        return null; 
      }
      return keccak256(abiCoder.encode(['address', 'uint256'], [item.address, tokenId]));
    }).filter(Boolean); 

    console.log("get merkle root");
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const merkleRoot = merkleTree.getHexRoot();

    console.log('Merkle Root:', merkleRoot);

    const proofs = results.map(item => {
      const tokenId = Number(item.tokenId);
      const leaf = keccak256(abiCoder.encode(['address', 'uint256'], [item.address, tokenId]));
      return {
        address: item.address,
        tokenId: tokenId,
        proof: merkleTree.getHexProof(leaf)
      };
    });

    fs.writeFileSync(proof_file, JSON.stringify(proofs, null, 2));
    console.log(`Proofs saved to ${proof_file}`);
  });
