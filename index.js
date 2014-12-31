/* jshint node: true */
'use strict';

var path = require('path'),
    util = require('util'),
    extend = util._extend;

var defaultOptions = {
    importBootstrapTheme: false,
    importBootstrapCSS: true,
    importBootstrapFont: true
};

function unwatchedTree(dir) {
    return {
        read:    function() { return dir; },
        cleanup: function() { }
    };
}

module.exports = {
    name: 'ember-bootstrap',

    treeFor: function(name) {
        if (name === 'vendor') {
            // Map 'node_modules' to 'vendor', so that we can import Font Awesome assets later.
            var treePath = path.join(__dirname, 'node_modules');
            return unwatchedTree(treePath);
        }
    },

    included: function included(app) {
        this._super.included(app);

        var emberCLIVersion = app.project.emberCLIVersion();
        if (emberCLIVersion < '0.0.41') {
            throw new Error('ember-cli-bootstrap requires ember-cli version 0.0.41 or greater.\n');
        }

        var options         = extend(defaultOptions, app.options['ember-bootstrap']);
        var bootstrapPath   = 'vendor/bootstrap/dist';

        // Import css from bootstrap
        if (options.importBootstrapTheme) {
            app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
        }

        if (options.importBootstrapCSS) {
            app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
            app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), { destDir: 'assets' });
        }

//        if (options.importBootstrapJS) {
//            app.import(path.join(bootstrapPath, 'js/bootstrap.js'));
//        }

        // Import glyphicons
        if (options.importBootstrapFont) {
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
            app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });
        }

//        // import bootstrap module
//        app.import(path.join('vendor/ember-cli-bootstrap/shim.js'), {
//            type: 'vendor',
//            exports: { 'bootstrap': ['default'] }
//        });
    }
};