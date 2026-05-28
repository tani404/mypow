//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Base64} from "lib/openzeppelin-contracts/contracts/utils/Base64.sol";
import {Strings} from "lib/openzeppelin-contracts/contracts/utils/Strings.sol";
import {VerifiedIssuer} from "./VerifiedIssuer.sol";

contract WorkProof is ERC721{
    using Strings for uint256;
    using Strings for uint8;
    using Strings for address;

    error WorkProof_Soulbound();
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
        string ipfsHash;
    }

    VerifiedIssuer public immutable issuerRegistry;
    uint256 private _nextTokenId;

    mapping(uint256 => Credential) private _credentials;
    mapping(address => uint256[]) private _workerCredentials;

    event CredentialsIssued(uint256 tokenId, address issuer,address worker, uint256 issuedAt);

    constructor(address _issuerRegistry) ERC721("WorkProof", "MWP"){
        issuerRegistry = VerifiedIssuer(_issuerRegistry);
    }

    function issueCredentials(address _worker, string calldata _platform, string calldata _jobTitle, uint8 _rating, string calldata _ipfsHash) external {
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

        uint256 tokenId = _nextTokenId++;

        _credentials[tokenId] = Credential({
            issuer: msg.sender,
            worker: _worker,
            platform: _platform,
            jobTitle: _jobTitle,
            rating: _rating,
            issuedAt: block.timestamp,
            ipfsHash: _ipfsHash
        });

        _workerCredentials[_worker].push(tokenId);

        _mint(_worker, tokenId);

        emit CredentialsIssued(tokenId, msg.sender, _worker, block.timestamp);
    }

    function tokenURI(uint256 tokenId) public view override returns(string memory){
        if(tokenId >= _nextTokenId) revert WorkProof_TokenDoesNotExist();

        Credential memory cred = _credentials[tokenId];

        string memory stars = _buildStars(cred.rating);

        string memory json = string(abi.encodePacked(
            '{',
                '"name" : "WorkProof #', tokenId.toString(), '",',
                '"description" : "Verified work credential issued on myPOW.",',
                '"attributes" : [',
                    '{"trait_type": "Job Title", "value": "', cred.jobTitle, '"},',
                    '{"trait_type": "Platform", "value": "', cred.platform, '"},',
                    '{"trait_type": "Rating", "value": "', uint256(cred.rating).toString(), '"},',
                    '{"trait_type": "Stars", "value": "', stars, '"},',
                    '{"trait_type": "Issuer", "value": "', _addressToString(cred.issuer), '"},',
                    '{"trait_type": "Worker", "value": "', _addressToString(cred.worker), '"},',
                    '{"trait_type": "Documents cid hash", "value": "', cred.ipfsHash, '"},',
                    '{"trait_type": "Issued At", "value": "', cred.issuedAt.toString(), '"}',
                ']',
            '}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        ));
    }

    function _buildStars(uint8 rating) internal pure returns(string memory){
        return string(abi.encodePacked(uint256(rating).toString(), "/5"));
    }

    function _addressToString(address addr) internal pure returns(string memory){
        return Strings.toHexString(uint256(uint160(addr)), 20);
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

    function revokeCredentials(uint256 _tokenId) external{
        if(_tokenId > _nextTokenId) revert WorkProof_TokenDoesNotExist();
        if(msg.sender != _credentials[_tokenId].issuer) revert WorkProof_NotVerifiedIssuer();
        _burn(_tokenId);
    }

    function totalSupply() public view returns(uint256){
        return _nextTokenId;
    }

    function transferFrom(address , address , uint256 ) public pure override{
        revert WorkProof_Soulbound();
    } 

    function safeTransferFrom(address , address , uint256 , bytes memory) public pure override{
        revert WorkProof_Soulbound();
    } 
}