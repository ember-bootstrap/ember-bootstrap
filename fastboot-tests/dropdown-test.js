'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('dropdown', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/dropdown')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#dropdown').length).to.equal(1);
        expect($('#dropdown').hasClass('btn-group')).to.be.true;
        expect($('#dropdown button').hasClass('dropdown-toggle')).to.be.true;
      });
  });

});
