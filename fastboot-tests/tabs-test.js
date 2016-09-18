var expect = require('chai').expect;

describe('tabs', function() {

  it('renders', function() {
    return this.visit('/tabs')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#tab').length).to.equal(1);
        expect($('#tab ul').hasClass('nav')).to.be.true;
        expect($('#tab ul').hasClass('nav-tabs')).to.be.true;
        expect($('#tab ul.nav li').length).to.equal(2);
        expect($('#tab .tab-pane').length).to.equal(2);
      });
  });

});