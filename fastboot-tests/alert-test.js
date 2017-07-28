'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('alert', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/alert')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#alert').length).to.equal(1);
        expect($('#alert').hasClass('alert')).to.be.true;
      });
  });

});