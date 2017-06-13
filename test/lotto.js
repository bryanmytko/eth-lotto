var Lotto = artifacts.require("./Lotto.sol");

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
      for(let i = 0; i < 4; i++){
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
      assert.equal(tally.valueOf(), 3, "Should not purchase 4 tickets.");
    });
  });
});
