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
        expect($('#accordion .card').length).to.equal(3);
        expect($('#accordion .card:eq(0) .card-header').text().trim()).to.equal('First item');
        expect($('#accordion .card:eq(1) .card-header').text().trim()).to.equal('Second item');
      });
  });

});
