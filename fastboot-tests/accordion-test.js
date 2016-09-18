var expect = require('chai').expect;

describe('accordion', function() {

  it('renders', function() {
    return this.visit('/accordion')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        expect($('#accordion').length).to.equal(1);
        expect($('#accordion .panel').length).to.equal(3);
        expect($('#accordion .panel:eq(0) .panel-title').text().trim()).to.equal('First item');
        expect($('#accordion .panel:eq(1) .panel-title').text().trim()).to.equal('Second item');
      });
  });

});