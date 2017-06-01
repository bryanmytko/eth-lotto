var Lotto = artifacts.require("./Lotto.sol");

contract('Lotto', function(accounts) {
  it("should purchase a ticket if tickets are available", function(){
    return Lotto.deployed().then(function(instance){
      instance.buy_ticket();
      return instance;
    }).then(function(instance){
      return instance.get_tally.call();
    }).then(function(tally){
      assert.equal(tally.valueOf(), 1, "Incorrect value");
    });
  });
});
