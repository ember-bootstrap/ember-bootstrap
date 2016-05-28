var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Button', function() {

  it('renders', function() {

    return this.visit('/button')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="button"');
        expect(response.body).to.contain('id="button-group"');
      });

  });
});