var AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;
var RSVP = require('rsvp');
var request = RSVP.denodeify(require('request'));

function describeForFastboot(name, fn) {
  describe(name, function() {
    this.timeout(600000);

    var app;
    var port = 49741;

    function visit(route) {
      var url = 'http://localhost:' + port + route;
      return request(url);
    }

    before(function() {

      app = new AddonTestApp();
      this.visit = visit.bind(this);

      return app.create('fastboot')
        .then(function() {
          return app.runEmberCommand('install', 'ember-cli-fastboot');
        })
        .then(function() {
          return app.startServer({
            command: 'fastboot',
            port: port,
            additionalArguments: ['--serve-assets']
          });
        });
    });

    after(function() {
      return app.stopServer();
    });
    
    fn.call(this);
  });
}

module.exports = describeForFastboot;