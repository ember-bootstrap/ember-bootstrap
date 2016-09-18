var expect = require('chai').expect;

describe('nav', function() {

  it('renders', function() {
    return this.visit('/nav')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('ul#nav').length).to.equal(1);
        expect($('ul#nav').hasClass('nav')).to.be.true;
      });
  });

});