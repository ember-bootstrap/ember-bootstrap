---
title: Getting started
permalink: "getting-started/index.html"
layout: page
---


## Install in ember-cli application

In your application's directory:

    ember install:addon ember-bootstrap
    
If you are using an ember-cli version prior to 0.1.5, use the following commands instead:
    
    npm install --save-dev ember-bootstrap
    ember g ember-bootstrap

## Addon Options


### Importing Twitter Bootstrap Theme
Bootstrap comes with an optional theme CSS with various visual enhancements.  To include this file you can import it by setting `importBootstrapTheme` to true in your `Brocfile.js`:


    //your-bootstrap-app/Brocfile.js
    
    /* global require, module */
    
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');
    
    var app = new EmberApp({
        'ember-bootstrap': {
            'importBootstrapTheme': true
        }
    });
    
    module.exports = app.toTree();


### Opting out of Bootstrap CSS
In situations where you prefer to use another strategy for importing Bootstrap CSS,
you can opt out of CSS import by setting the `importBootstrapCSS` option to false in your `Brocfile.js`:

    //your-bootstrap-app/Brocfile.js
    
    /* global require, module */
    
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');
    
    var app = new EmberApp({
        'ember-bootstrap': {
            'importBootstrapCSS': false
        }
    });
    
    module.exports = app.toTree();

### Opting out of Bootstrap Font
In situations where you prefer to use another strategy for importing the Bootstrap font,
you can opt out of the font import by setting the `importBootstrapFont` option to false in your `Brocfile.js`:

    //your-bootstrap-app/Brocfile.js
    
    /* global require, module */
    
    var EmberApp = require('ember-cli/lib/broccoli/ember-app');
    
    var app = new EmberApp({
        'ember-bootstrap': {
            'importBootstrapFont': false
        }
    });
    
    module.exports = app.toTree();
