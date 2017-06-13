pragma solidity ^0.4.11;

contract Lotto {
  address public owner;
  address[] public participants;
  address public winner;

  uint prize_total = 0 ether;
  uint ticket_price = 0 ether;
  uint prize_tally = 0 ether;

  event ticket_bought(
    uint _prize_tally
  );

  /* @TODO Remove: For debugging */
  event console_log(
    uint _log
  );

  function Lotto(uint _prize_total, uint _ticket_price){
    owner = msg.sender;
    prize_total = _prize_total;
    ticket_price = _ticket_price;
  }

  function buy_ticket() public payable returns(bool){
    if(prize_tally < prize_total){
      participants.push(msg.sender);
      prize_tally += msg.value;

      ticket_bought(prize_tally);
      return true;
    } else {
      return false;
    }
  }

  function get_participants() constant public returns(address[]){
    return participants;
  }

  function get_tally() constant public returns(uint){
    return prize_tally;
  }

}
