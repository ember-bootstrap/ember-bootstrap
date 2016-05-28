var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Form', function() {

  it('renders', function() {

    return this.visit('/form')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="form"');
      });

  });
});