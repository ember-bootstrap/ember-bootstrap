'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('carousel', function() {
  setupTest();

  it('renders', function() {
    return this.visit('/carousel')
      .then(function(res) {
        let $ = res.jQuery;
        let response = res.response;

        expect(response.statusCode).to.equal(200);
        expect($('#carousel').length).to.equal(1);
        expect($('#carousel').hasClass('carousel')).to.be.true;
        expect($('#carousel').hasClass('slide')).to.be.true;
        expect($('#carousel .carousel-control-next').length).to.equal(1);
        expect($('#carousel .carousel-control-prev').length).to.equal(1);
        expect($('#carousel .carousel-inner .carousel-item').length).to.equal(3);
      });
  });
});
