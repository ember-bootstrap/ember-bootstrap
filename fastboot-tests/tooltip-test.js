'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('tooltip', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/tooltip')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('h1').text().trim()).to.equal('tooltip');
        expect($('button').text().trim()).to.equal('Tooltip');

      });
  });

});