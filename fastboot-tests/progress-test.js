var expect = require('chai').expect;

describe('progress', function() {

  it('renders', function() {
    return this.visit('/progress')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('#progress').length).to.equal(1);
        expect($('#progress').hasClass('progress')).to.be.true;
        expect($('#progress .progress-bar').length).to.equal(1);
      });
  });

});