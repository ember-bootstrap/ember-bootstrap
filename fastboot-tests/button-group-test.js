'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('buttonGroup', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/buttonGroup')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#button-group').length).to.equal(1);
        expect($('#button-group').hasClass('btn-group')).to.be.true;
        expect($('#button-group .btn').length).to.equal(3);
      });
  });

});