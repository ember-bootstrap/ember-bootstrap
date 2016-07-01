var expect = require('chai').expect;
var describeForFastboot = require('./module');

describeForFastboot('Fastboot', function() {

  it('Accordions render', function() {

    return this.visit('/accordion')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="accordion"');
      });

  });

  it('Alerts render', function() {

    return this.visit('/alert')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="alert"');
      });

  });

  it('Buttons render', function() {

    return this.visit('/button')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="button"');
        expect(response.body).to.contain('id="button-group"');
      });

  });

  it('Collapse render', function() {

    return this.visit('/collapse')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="collapse"');
      });

  });

  it('Dropdowns render', function() {

    return this.visit('/dropdown')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="dropdown"');
      });

  });

  it('Forms render', function() {

    return this.visit('/forms')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="form"');
      });

  });

  it('Modals render', function() {

    return this.visit('/modal')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="modal"');
      });

  });

  it('Progressbars render', function() {

    return this.visit('/progress')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="progress"');
      });

  });

  it('Navs render', function() {

    return this.visit('/navs')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="nav"');
      });

  });

  it('Tabs render', function() {

    return this.visit('/tabs')
      .then(function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.contain('id="tab"');
      });

  });

});