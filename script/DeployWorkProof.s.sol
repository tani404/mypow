//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {WorkProof} from "../src/WorkProof.sol";
import {DevOpsTools} from "lib/foundry-devops/src/DevOpsTools.sol";
import {VerifiedIssuer} from "../src/VerifiedIssuer.sol";

contract DeployWorkProof is Script{
    function run() external returns(WorkProof){
        address verifiedIssuer = DevOpsTools.get_most_recent_deployment("VerifiedIssuer", 31337);

        vm.startBroadcast();
        WorkProof workProof = new WorkProof(verifiedIssuer);
        vm.stopBroadcast();

        return workProof;
    }
}