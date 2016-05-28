var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Progress', function() {

  it('renders', function() {

    return this.visit('/progress')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="progress"');
      });

  });
});