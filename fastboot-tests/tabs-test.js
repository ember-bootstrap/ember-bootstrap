'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('tabs', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/tabs')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#tab').length).to.equal(1);
        expect($('#tab ul').hasClass('nav')).to.be.true;
        expect($('#tab ul').hasClass('nav-tabs')).to.be.true;
        expect($('#tab ul.nav li').length).to.equal(2);
        expect($('#tab ul.nav li:eq(0)').hasClass('active')).to.be.true;
        expect($('#tab .tab-pane').length).to.equal(2);
        expect($('#tab .tab-pane:eq(0)').hasClass('active')).to.be.true;
      });
  });

});