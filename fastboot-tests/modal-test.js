var expect = require('chai').expect;

describe('modal', function() {

  it('renders', function() {
    return this.visit('/modal')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#modal').length).to.equal(1);
      });
  });

});