//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {VerifiedIssuer} from "./VerifiedIssuer.sol";

contract WorkProof is ERC721{
    error WorkProod_Soulbound();
    error WorkProof_NotVerifiedIssuer();
    error WorkProof_InvalidAddress();
    error WorkProof_InvalidRating(); 
    error WorkProof_TokenDoesNotExist();
    error WorkProof_CannotIssueSelf();

    struct Credential{
        address issuer;
        address worker;
        string platform;
        string jobTitle;
        uint8 rating;
        uint256 issuedAt;
        string metadataURI;
    }

    VerifiedIssuer public immutable issuerRegistry;
    uint256 private _nextTokenId;

    mapping(uint256 => Credential) private _credentials;
    mapping(address => uint256[]) private _workerCredentials;

    event CredentialsIssued(uint256 tokenId, address issuer,address worker, uint256 issuedAt);

    constructor(address _issuerRegistry) ERC721("WorkProof", "MWP"){
        issuerRegistry = VerifiedIssuer(_issuerRegistry);
    }

    function issueCredentials(address _worker, string calldata _platform, string calldata _jobTitle, uint8 _rating, string calldata _metadataURI) external {
        if(!issuerRegistry.isVerifiedIssuer(msg.sender)){
            revert WorkProof_NotVerifiedIssuer();
        }

        if(_worker == address(0)){
            revert WorkProof_InvalidAddress();
        }

        if(_worker == msg.sender){
            revert WorkProof_CannotIssueSelf();
        }

        if(_rating < 1 || _rating > 5){
            revert WorkProof_InvalidRating(); 
        }

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _credentials[tokenId] = Credential({
            issuer: msg.sender,
            worker: _worker,
            platform: _platform,
            jobTitle: _jobTitle,
            rating: _rating,
            issuedAt: block.timestamp,
            metadataURI: _metadataURI
        });

        _workerCredentials[_worker].push(tokenId);

        _mint(_worker, tokenId);

        emit CredentialsIssued(tokenId, msg.sender, _worker, block.timestamp);
    }

    function getCredentials(address _worker) public view returns(uint256[] memory){
        if(_worker == address(0)){
            revert WorkProof_InvalidAddress();
        }
        return _workerCredentials[_worker];
    }

    function getCredentialsDetail(uint256 _tokenId) public view returns(Credential memory) {
        if(_tokenId >= _nextTokenId) revert WorkProof_TokenDoesNotExist();
        return _credentials[_tokenId];        
    }

    function tokenURI(uint256 _tokenId) public view override returns(string memory){
        if(_tokenId >= _nextTokenId) revert WorkProof_TokenDoesNotExist();
        return _credentials[_tokenId].metadataURI;
    }

    function totalSupply() public view returns(uint256){
        return _nextTokenId;
    }

    function transferFrom(address , address , uint256 ) public pure override{
        revert WorkProod_Soulbound();
    } 

    function safeTransferFrom(address , address , uint256 , bytes memory) public pure override{
        revert WorkProod_Soulbound();
    } 
}