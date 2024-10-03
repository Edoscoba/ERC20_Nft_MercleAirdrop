
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

 const MerkleRoot = "0x49b50501eaa583122f1af994519ca1e0ae58c59803aaf4af591dcdb91f10122e";
  const BAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const LSK_TokenAddress = "0x6033F7f88332B8db6ad452B7C6D5bB643990aE3f";
 
module.exports = buildModule("MerkleAirdropModule", (m) => {
  
  
  const MerkleAirdrop = m.contract("MerkleAirdrop", [LSK_TokenAddress, BAYC, MerkleRoot])

  return { MerkleAirdrop};
});
