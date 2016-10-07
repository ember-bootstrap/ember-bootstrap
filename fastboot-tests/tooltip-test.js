var expect = require('chai').expect;

describe('tooltip', function() {

  it('renders', function() {
    return this.visit('/tooltip')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('tooltip');
        expect($('button').text().trim()).to.equal('Tooltip');

      });
  });

});