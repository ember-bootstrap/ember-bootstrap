var expect = require('chai').expect;

describe('popover', function() {

  it('renders', function() {
    return this.visit('/popover')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('popover');
        expect($('button').text().trim()).to.equal('Popover');
      });
  });

});