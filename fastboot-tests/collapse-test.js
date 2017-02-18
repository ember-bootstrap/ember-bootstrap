'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('collapse', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/collapse')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#collapse').length).to.equal(1);
        expect($('#collapse').hasClass('collapse')).to.be.true;
      });
  });

});