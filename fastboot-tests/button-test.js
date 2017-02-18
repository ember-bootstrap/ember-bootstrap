'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('button', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/button')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#button').length).to.equal(1);
        expect($('#button').hasClass('btn')).to.be.true;
        expect($('#button').hasClass('btn-primary')).to.be.true;
        expect($('#button').text().trim()).to.equal('Button');
      });
  });

});