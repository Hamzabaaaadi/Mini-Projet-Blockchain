// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Signe {
    function estPositif(int nombre) public pure returns (bool) {
        return nombre > 0;
    }
}
