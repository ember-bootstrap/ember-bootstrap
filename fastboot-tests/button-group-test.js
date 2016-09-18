var expect = require('chai').expect;

describe('buttonGroup', function() {

  it('renders', function() {
    return this.visit('/buttonGroup')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#button-group').length).to.equal(1);
        expect($('#button-group').hasClass('btn-group')).to.be.true;
        expect($('#button-group .btn').length).to.equal(3);
      });
  });

});