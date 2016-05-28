var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Dropdown', function() {

  it('renders', function() {

    return this.visit('/dropdown')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="dropdown"');
      });

  });
});