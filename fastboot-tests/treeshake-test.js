'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('Tree shaking', function() {
  setupTest('treeshake');

  it('renders whitelisted component', function() {
    return this.visit('/whitelisted')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#button-group').length).to.equal(1);
        expect($('#button-group').hasClass('btn-group')).to.be.true;
        expect($('#button-group .btn').length).to.equal(3);
      });
  });

  it('fails to render blacklisted component', function() {
    return this.visit('/blacklisted')
      .then(function(res) {
        let $ = res.jQuery;
        expect($('#accordion').length).to.equal(0);
      });
  });

});