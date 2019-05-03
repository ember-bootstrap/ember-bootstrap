'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('form', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/form')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('form#form').length).to.equal(1);
        expect($('form .form-group').length).to.equal(4);
        expect($('form .form-group:eq(0) label').text().trim()).to.equal('Email');
        expect($('form .form-group:eq(0) input[type=email]').length).to.equal(1);
      });
  });

});
