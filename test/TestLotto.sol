pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lotto.sol";

// This library breaks when you have no functions to test -- PR?
contract TestLotto {
  function testContractIsTestable(){
    uint num = 1;
    Assert.equal(num,1, "Contract should be testable");
  }
}
