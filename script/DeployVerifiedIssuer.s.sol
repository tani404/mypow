//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {VerifiedIssuer} from "../src/VerifiedIssuer.sol";

contract DeployVerifiedIssuer is Script{
    function run() external returns(VerifiedIssuer){
        vm.startBroadcast();
        VerifiedIssuer verifiedIssuer = new VerifiedIssuer();
        vm.stopBroadcast();
        return verifiedIssuer;
    }
}