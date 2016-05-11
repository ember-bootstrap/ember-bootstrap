---
title: Getting started
permalink: "getting-started/index.html"
layout: page
---


## Install in ember-cli application

In your application's directory:

    ember install ember-bootstrap

## Addon Options

### Importing CSS Assets

#### Importing Twitter Bootstrap Theme
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


#### Opting out of Bootstrap CSS
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


#### Opting out of Bootstrap Font
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

### Using with Less

When you are using [ember-cli-less](https://github.com/gdub22/ember-cli-less) you can import all of bootstrap's 
Less assets easily under the 'ember-bootstrap' namespace: 

```less
// app.less
@import "ember-bootstrap/bootstrap";
@import "ember-bootstrap/theme";
```

You can also seletively import only the assets your app needs:

```less
// app.less
@import "variables.less";
@import "mixins.less";
@import "normalize.less";
@import "scaffolding.less";
@import "type.less";
@import "buttons.less";
```

__Just make sure to not include the compiled CSS file that is included by default, see "Opting out of Bootstrap CSS" above!__
    
