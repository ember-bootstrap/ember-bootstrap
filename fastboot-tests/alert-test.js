var expect = require('chai').expect;

describe('alert', function() {

  it('renders', function() {
    return this.visit('/alert')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#alert').length).to.equal(1);
        expect($('#alert').hasClass('alert')).to.be.true;
      });
  });

});