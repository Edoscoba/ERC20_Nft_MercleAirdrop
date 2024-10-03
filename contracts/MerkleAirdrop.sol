// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.0;  

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";  
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";  
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";  

contract MerkleAirdrop {  
    bytes32 public merkleRoot;  
    IERC20 public token;  
    IERC721 public bayc;  

    mapping(address => bool) public claimed;  

    constructor(address _token, address _bayc, bytes32 _merkleRoot) {  
        token = IERC20(_token);  
        bayc = IERC721(_bayc);  
        merkleRoot = _merkleRoot;  
    }  

    function claim(uint256 tokenId, bytes32[] calldata merkleProof) external {  
        require(!claimed[msg.sender], "Already claimed");  
        require(isOwnerOfBAYC(msg.sender, tokenId), "Not an owner of BAYC");  
        
     
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, tokenId));  
        
       
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid proof");  

        claimed[msg.sender] = true;  
        
       
        token.transfer(msg.sender, 1 * 10 ** 18); 
    }  

    function isOwnerOfBAYC(address user, uint256 tokenId) internal view returns (bool) {  
        return bayc.ownerOf(tokenId) == user;  
    }  
}  
