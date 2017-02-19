'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('popover', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/popover')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('body').length).to.equal(1);
        expect($('h1').text().trim()).to.equal('popover');
        expect($('button').text().trim()).to.equal('Popover');
      });
  });

});