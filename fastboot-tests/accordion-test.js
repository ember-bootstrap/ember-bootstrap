var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Accordion', function() {

  it('renders', function() {

    return this.visit('/accordion')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="accordion"');
      });

  });
});