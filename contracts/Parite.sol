// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Parite {
    function estPair(uint nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }

    function estImpair(uint nombre) public pure returns (bool) {
        return nombre % 2 != 0;
    }
}
