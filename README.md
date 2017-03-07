# ember-bootstrap

[![Build Status](https://travis-ci.org/kaliber5/ember-bootstrap.svg?branch=master)](https://travis-ci.org/kaliber5/ember-bootstrap)
[![Ember Observer Score](http://emberobserver.com/badges/ember-bootstrap.svg)](http://emberobserver.com/addons/ember-bootstrap)
[![npm version](https://badge.fury.io/js/ember-bootstrap.svg)](https://badge.fury.io/js/ember-bootstrap)
[![Dependency Status](https://david-dm.org/kaliber5/ember-bootstrap.svg)](https://david-dm.org/kaliber5/ember-bootstrap)
[![devDependency Status](https://david-dm.org/kaliber5/ember-bootstrap/dev-status.svg)](https://david-dm.org/kaliber5/ember-bootstrap#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/kaliber5/ember-bootstrap/badges/gpa.svg)](https://codeclimate.com/github/kaliber5/ember-bootstrap)
[![Test Coverage](https://codeclimate.com/github/kaliber5/ember-bootstrap/badges/coverage.svg)](https://codeclimate.com/github/kaliber5/ember-bootstrap/coverage)

An [ember-cli](http://www.ember-cli.com) addon for using [Twitter Bootstrap](http://getbootstrap.com/) in Ember applications.

The addon includes the Bootstrap assets (CSS, Icons) in your project (can be disabled). On top of that, it provides a set of native Ember components (no use of Bootstrap JavaScript!).</p>

*See [www.ember-bootstrap.com](http://www.ember-bootstrap.com/) for full documentation.*

## Install in ember-cli application

In your application's directory:

    ember install ember-bootstrap
    
This will install Bootstrap 3 and will use the currently installed preprocessor or none if one is not installed.
To switch Bootstrap version or preprocessor, re-run the default blueprint like

    ember generate ember-bootstrap --bootstrap-version=4 --preprocessor=sass
    
The `--bootstrap-version` can be "3" or "4" and defaults to "3" if the option is omitted. The `--preprocessor`
can be `none`, `less`, or `sass` and will use the currently installed preprocessor as its cue if omitted.
We explicitly support `ember-cli-less` and `ember-cli-sass`. You will need to install and configure other
preprocessors yourself.

The default blueprint does the following:

* Removes any unneeded versions of `bootstrap` and `bootstrap-sass` from `package.json` and `bower.json`
* Installs the appropriate version of `bootstrap` or `bootstrap-sass` as an npm package
* Removes unneeded dependencies on `ember-cli-less` and `ember-cli-sass`
* Installs `ember-cli-less` or `ember-cli-sass` if appropriate
* Creates `app.less` or `app.scss` if appropriate and it doesn't exist
* Adds the appropriate `@import` statement to your `app.less` or `app.scss` if it's not there
* Safely edits your `ember-cli-build.js` to ensure the proper ember-bootstrap settings for your configuration
    
### 1.0 alpha
    
The 1.0 release is currently in alpha stage. While the API is not guaranteed to remain unchanged until the first stable release, 
breaking changes are unlikely. So I encourage everybody to use the alpha version for new projects, and also to upgrade existing projects.
    
The 1.0 release will consist of a number of breaking changes compared to the previous 0.x releases, so be sure to check the 
[CHANGELOG](CHANGELOG.md) for details. After the first stable 1.0 release the API should remain stable according to SemVer.    

Beginning from version 1.0 ember-bootstrap will require at least Ember 2.3! Please file any issues you may encounter!

## Updates

See [CHANGELOG](CHANGELOG.md) for the list of all changes.

If you want to keep up to date with ember-bootstrap, you may want to [follow me on Twitter](https://twitter.com/simonihmig). 

## Authors

[Simon Ihmig](https://github.com/simonihmig)@[kaliber5](http://www.kaliber5.de) & [Contributors](https://github.com/kaliber5/ember-bootstrap/graphs/contributors)


## Copyright and license

Code and documentation copyright 2017 kaliber5 GmbH. Code released under [the MIT license](LICENSE.md).
