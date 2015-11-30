/* jshint node: true */
'use strict';

var path = require('path'),
    util = require('util'),
    extend = util._extend;

var defaultOptions = {
    importBootstrapTheme: false,
    importBootstrapCSS: true,
    importBootstrapFont: true,
    importBootstrapJsModules: []
};

module.exports = {
    name: 'ember-bootstrap',

    included: function included(app) {
        this._super.included(app);

        var emberCLIVersion = app.project.emberCLIVersion();
        if (emberCLIVersion < '0.0.41') {
            throw new Error('ember-cli-bootstrap requires ember-cli version 0.0.41 or greater.\n');
        }

        var options         = extend(defaultOptions, app.options['ember-bootstrap']);
        var bootstrapPath   = path.join(app.bowerDirectory, 'bootstrap/dist');

        // Import css from bootstrap
        if (options.importBootstrapCSS) {
            app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
            app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), { destDir: 'assets' });
        }

        if (options.importBootstrapTheme) {
            app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
        }

        // Import glyphicons
        if (options.importBootstrapFont) {
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), { destDir: '/fonts' });
        }

        if (options.importBootstrapModules && options.importBootstrapModules.length > 0) {
            options.importBootstrapModules.forEach(function(module) {
                app.import(path.join(app.bowerDirectory, 'bootstrap/js/' + module + '.js'));
            });
        } else {
            app.import(path.join(bootstrapPath, 'js/bootstrap.js'));
        }

    }
};
