var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Alert', function() {

  it('renders', function() {

    return this.visit('/alert')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="alert"');
      });

  });
});