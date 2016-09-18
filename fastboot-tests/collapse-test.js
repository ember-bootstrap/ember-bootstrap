var expect = require('chai').expect;

describe('collapse', function() {

  it('renders', function() {
    return this.visit('/collapse')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#collapse').length).to.equal(1);
        expect($('#collapse').hasClass('collapse')).to.be.true;
      });
  });

});