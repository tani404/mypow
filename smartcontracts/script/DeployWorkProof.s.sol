//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {VerifiedIssuer} from "../src/VerifiedIssuer.sol";
import {WorkProof} from "../src/WorkProof.sol";

contract DeployWorkProof is Script{
    VerifiedIssuer verifiedIssuer;
    WorkProof workProof;

    function run() external returns(WorkProof, VerifiedIssuer){
        vm.startBroadcast();
        verifiedIssuer = new VerifiedIssuer();
        workProof = new WorkProof(address(verifiedIssuer));
        vm.stopBroadcast();

        return (workProof, verifiedIssuer);
    }
}