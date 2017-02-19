'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('accordion', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/accordion')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#accordion').length).to.equal(1);
        expect($('#accordion .panel').length).to.equal(3);
        expect($('#accordion .panel:eq(0) .panel-title').text().trim()).to.equal('First item');
        expect($('#accordion .panel:eq(1) .panel-title').text().trim()).to.equal('Second item');
      });
  });

});