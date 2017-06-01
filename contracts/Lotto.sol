pragma solidity ^0.4.11;

contract Lotto {
  address public owner;
  address[] public participants;
  address public winner;

  uint prize_total = 10 ether;
  uint prize_tally = 0 ether;
  uint ticket_price = 1 ether;

  event ticket_bought(
    uint _prize_tally
  );

  function Lotto(){
    owner = msg.sender;
  }

  function buy_ticket() public payable {
    if(prize_tally < prize_total){
      participants.push(msg.sender);
      prize_tally += msg.value;

      ticket_bought(prize_tally);
    }
  }

  function get_participants() constant public returns(address[]){
    return participants;
  }

  function get_tally() constant public returns(uint){
    return prize_tally;
  }

}
