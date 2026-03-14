//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract VerifiedIssuer is Ownable{
    error VerifiedIssuer_InvalidAddress();
    error VerifiedIssuer_AlreadyVerified();
    error VerifiedIssuer_InvalidIssuer();

    address[] public issuers;
    mapping(address issuer => bool isVerified) public verifiedIssuers;

    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    constructor() Ownable(msg.sender){}

    function addIssuer(address _issuer) external onlyOwner{
        if(_issuer == address(0)){
            revert VerifiedIssuer_InvalidAddress();
        }

        if(verifiedIssuers[_issuer]){
            revert VerifiedIssuer_AlreadyVerified();
        }

        verifiedIssuers[_issuer] = true;
        issuers.push(_issuer);

        emit IssuerAdded(_issuer);
    }

    function removeIssuer(address _issuer) external onlyOwner{
        if(_issuer == address(0)){
            revert VerifiedIssuer_InvalidAddress();
        }

        if(!verifiedIssuers[_issuer]){
            revert VerifiedIssuer_InvalidIssuer();
        }

        verifiedIssuers[_issuer] = false;

        emit IssuerRemoved(_issuer);
    }

    function isVerifiedIssuer(address _issuer) public view returns(bool){
        if(_issuer == address(0)){
            revert VerifiedIssuer_InvalidAddress();
        }

        return verifiedIssuers[_issuer]; 
    }

    function getIssuers() public view returns(address[] memory){
        return issuers;
    }
}