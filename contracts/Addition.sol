// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Addition {
    uint public nombre1;
    uint public nombre2;

    constructor(uint _n1, uint _n2) {
        nombre1 = _n1;
        nombre2 = _n2;
    }

    function addition1() public view returns (uint) {
        return nombre1 + nombre2;
    }

    function addition2(uint a, uint b) public pure returns (uint) {
        return a + b;
    }

    function setNombres(uint _n1, uint _n2) public {
        nombre1 = _n1;
        nombre2 = _n2;
    }
}
