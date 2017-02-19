'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('modal', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/modal')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#modal').length).to.equal(1);

        // @todo ember-wormhole has still several issues with FastBoot
        // see https://github.com/yapplabs/ember-wormhole/issues/86
        // also cannot upgrade form 0.4.1 because of https://github.com/yapplabs/ember-wormhole/issues/77
        // when these things have been sorted out hopefully soon, we can activate the following tests

        // expect($('.modal').length).to.equal(1);
        // expect($('.modal').hasClass('fade')).to.be.false;
      });
  });

});