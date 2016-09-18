var expect = require('chai').expect;

describe('dropdown', function() {

  it('renders', function() {
    return this.visit('/dropdown')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#dropdown').length).to.equal(1);
        expect($('#dropdown').hasClass('btn-group')).to.be.true;
        expect($('#dropdown button').hasClass('dropdown-toggle')).to.be.true;
        expect($('#dropdown ul').hasClass('dropdown-menu')).to.be.true;
      });
  });

});