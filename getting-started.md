---
title: Getting started
permalink: "getting-started/index.html"
layout: page
---


## Install in ember-cli application

In your application's directory:

    ember install ember-bootstrap

## Addon Options


### Importing Twitter Bootstrap Theme
Bootstrap comes with an optional theme CSS with various visual enhancements. To include this file you can import it by setting `importBootstrapTheme` to true in your `ember-cli-build.js`:

    //your-bootstrap-app/ember-cli-build.js

    /* global require, module */
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');

    module.exports = function(defaults) {
        var app = new EmberApp({
            'ember-bootstrap': {
                'importBootstrapTheme': true
            }
        });

        return app.toTree();
    };


### Opting out of Bootstrap CSS
In situations where you prefer to use another strategy for importing Bootstrap CSS,
you can opt out of CSS import by setting the `importBootstrapCSS` option to false in your `ember-cli-build.js`:

    //your-bootstrap-app/ember-cli-build.js

    /* global require, module */
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');

    module.exports = function(defaults) {
        var app = new EmberApp({
            'ember-bootstrap': {
                'importBootstrapCSS': false
            }
        });

        return app.toTree();
    };


### Opting out of Bootstrap Font
In situations where you prefer to use another strategy for importing the Bootstrap font,
you can opt out of the font import by setting the `importBootstrapFont` option to false in your `ember-cli-build.js`:

    //your-bootstrap-app/ember-cli-build.js

    /* global require, module */
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');

    module.exports = function(defaults) {
        var app = new EmberApp({
            'ember-bootstrap': {
                'importBootstrapFont': false
            }
        });

        return app.toTree();
    };
