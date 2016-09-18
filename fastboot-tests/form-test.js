var expect = require('chai').expect;

describe('form', function() {

  it('renders', function() {
    return this.visit('/form')
      .then(function(res) {
        var $ = res.jQuery;
        // var response = res.response;

        // add your real tests here
        expect($('form#form').length).to.equal(1);
        expect($('form .form-group').length).to.equal(4);
        expect($('form .form-group:eq(0) label').text().trim()).to.equal('Email');
        expect($('form .form-group:eq(0) input[type=email]').length).to.equal(1);
      });
  });

});