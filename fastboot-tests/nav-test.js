'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('nav', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/nav')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('ul#nav').length).to.equal(1);
        expect($('ul#nav').hasClass('nav')).to.be.true;
      });
  });

});