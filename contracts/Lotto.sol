pragma solidity ^0.4.11;

contract Lotto {
  address public owner;
  uint ticket_price;

  function Lotto(){
    owner = msg.sender;
  }

  function buy_ticket public payable(){
    // Keyword `payable` allows ether to be sent
    // Do something with msg.sender, msg.value
  }

}
