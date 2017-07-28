'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('progress', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/progress')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#progress').length).to.equal(1);
        expect($('#progress').hasClass('progress')).to.be.true;
        expect($('#progress .progress-bar').length).to.equal(1);
      });
  });

});