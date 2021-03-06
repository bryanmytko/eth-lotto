let Lotto = artifacts.require("./Lotto.sol");
const MAX_TICKETS = 4;

// Constructor notes for test different deploys:
// https://github.com/trufflesuite/truffle/issues/159

contract('Lotto', function(accounts) {
  it("should purchase a ticket if tickets are available", function(){
    return Lotto.deployed().then(function(instance){
      instance.buy_ticket({
        from: accounts[1],
        to: instance.address,
        value: 1
      });
      return instance;
    }).then(function(instance){
      return instance.get_tally.call();
    }).then(function(tally){
      assert.equal(tally.valueOf(), 1, "Should purchase a ticket.");
    });
  });

  it("should not purchase tickets if the pot is full", function(){
    return Lotto.deployed().then(function(instance){
      for(let i = 0; i < MAX_TICKETS; i++){
        instance.buy_ticket({
          from: accounts[1],
          to: instance.address,
          value: 1
        });
      }
      return instance;
    }).then(function(instance){
      return instance.get_tally.call();
    }).then(function(tally){
      assert.equal(
        tally.valueOf(),
        3,
        `Should not purchase ${MAX_TICKETS} tickets.`
      );
    });
  });

  it("should find a winner when the pot is full", function(){
    return Lotto.deployed().then(function(instance){
      for(let i = 0; i < MAX_TICKETS; i++){
        instance.buy_ticket({
          from: accounts[i],
          to: instance.address,
          value: 1
        });
      }
      return instance;
    }).then(function(instance){
      return instance.winner.call();
    }).then(function(winner){
      assert.include(accounts, winner);
    });
  });
});
