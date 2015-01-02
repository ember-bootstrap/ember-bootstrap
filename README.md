# ember-bootstrap

An [ember-cli](http://www.ember-cli.com) addon for using [Twitter Bootstrap](http://getbootstrap.com/) in Ember applications.

The motivation for this addon is to replace the [bootstrap_for_ember](https://github.com/ember-addons/bootstrap-for-ember) library, which does not seem to be actively developed, and is not up to date with current ember.js developments (components, ember-cli, no support for Ember's Run Loop).

## Install in ember-cli application

In your application's directory:

    npm install --save-dev ember-bootstrap

## Addon Options


### Importing specific components
By default, all of the components will be imported into the project. You can optionally specify exactly which components
should be imported into the project via the `component` option, which accepts an array of component names:


```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap': {
    'components': ['bs-alert', 'bs-notifications', 'bs-nav']
  }
});

module.exports = app.toTree();
```

### Importing Twitter Bootstrap Theme
Bootstrap comes with an optional theme CSS with various visual enhancements.  To include this file you can import it by setting `importBootstrapTheme` to true in your `Brocfile.js`:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-bootstrap': {
    'importBootstrapTheme': true
  }
});

module.exports = app.toTree();
```

### Opting out of Bootstrap CSS
In situations where you prefer to use another strategy for importing Bootstrap CSS,
you can opt out of CSS import by setting the `importBootstrapCSS` option to false in your `Brocfile.js`:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-bootstrap': {
    'importBootstrapCSS': false
  }
});

module.exports = app.toTree();
```

### Opting out of Bootstrap Font
In situations where you prefer to use another strategy for importing the Bootstrap font,
you can opt out of the font import by setting the `importBootstrapFont` option to false in your `Brocfile.js`:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-bootstrap': {
    'importBootstrapFont': false
  }
});

module.exports = app.toTree();
```

## Credits

* http://getbootstrap.com/
* https://github.com/ember-addons/bootstrap-for-ember
* https://github.com/dockyard/ember-cli-bootstrap
* https://github.com/dockyard/ember-cli-async-button