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

        // default modal
        expect($('#modal').length).to.equal(1);
        expect($('#modal .modal.show').length).to.equal(1);
        expect($('#modal .modal').css('display')).to.equal('block');
        expect($('#modal .modal-backdrop.show').length).to.equal(1);
        expect($('#modal .modal .modal-header .modal-title').text().trim()).to.equal('modal header');
        expect($('#modal .modal .modal-body').text().trim()).to.equal('modal body');

        // hidden modal
        expect($('#modal-hidden').length).to.equal(1);
        expect($('#modal-hidden .modal.show').length).to.equal(0);
      });
  });

});
