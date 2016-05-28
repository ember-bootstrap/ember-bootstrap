var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Collapse', function() {

  it('renders', function() {

    return this.visit('/collapse')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="collapse"');
      });

  });
});