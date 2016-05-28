var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Modal', function() {

  it('renders', function() {

    return this.visit('/modal')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="modal"');
      });

  });
});