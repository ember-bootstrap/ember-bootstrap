var expect = require('chai').expect;

describe('button', function() {

  it('renders', function() {
    return this.visit('/button')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#button').length).to.equal(1);
        expect($('#button').hasClass('btn')).to.be.true;
        expect($('#button').hasClass('btn-primary')).to.be.true;
        expect($('#button').text().trim()).to.equal('Button');
      });
  });

});