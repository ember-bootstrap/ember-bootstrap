# ember-bootstrap

[![Build Status](https://travis-ci.org/kaliber5/ember-bootstrap.svg?branch=master)](https://travis-ci.org/kaliber5/ember-bootstrap)
[![Ember Observer Score](http://emberobserver.com/badges/ember-bootstrap.svg)](http://emberobserver.com/addons/ember-bootstrap)
[![npm version](https://badge.fury.io/js/ember-bootstrap.svg)](https://badge.fury.io/js/ember-bootstrap)
[![Dependency Status](https://david-dm.org/kaliber5/ember-bootstrap.svg)](https://david-dm.org/kaliber5/ember-bootstrap)
[![devDependency Status](https://david-dm.org/kaliber5/ember-bootstrap/dev-status.svg)](https://david-dm.org/kaliber5/ember-bootstrap#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/kaliber5/ember-bootstrap.svg)](https://greenkeeper.io/)

[![Browser Status](https://badges.herokuapp.com/sauce/ember-bootstrap)](https://saucelabs.com/u/ember-bootstrap)


An [ember-cli](http://www.ember-cli.com) addon for using [Twitter Bootstrap](http://getbootstrap.com/) 3 or 4 (experimental) in Ember applications.

The addon includes the Bootstrap assets (CSS, Icons) in your project (can be disabled). On top of that, it provides a set of native Ember components (no use of Bootstrap JavaScript!).</p>

*See [www.ember-bootstrap.com](http://www.ember-bootstrap.com/) for full documentation.*

## Install in ember-cli application

In your application's directory:

    ember install ember-bootstrap
    
This will install Bootstrap 3 and will use the currently installed preprocessor or none if one is not installed.
To switch Bootstrap version or preprocessor, see the documentation.

## Compatibility

ember-bootstrap works and is fully [tested](https://travis-ci.org/kaliber5/ember-bootstrap) with

* Ember.js 2.3+
* Bootstrap 3 and 4. *Support for Bootstrap 4 is currently considered experimental and not covered by SemVer, as Bootstrap 4 itself is not yet stable.*
* all modern evergreen browsers (Chrome, Firefox, Safari, Edge) and IE 11. 
* FastBoot 1.0+ 
* jQuery-less builds using [ember-native-dom-event-dispatcher](https://github.com/rwjblue/ember-native-dom-event-dispatcher)

### 1.0 RC

The 1.0 release is currently in release candidate stage. There *should* not be any breaking changes anymore. So we encourage everybody
to use it for new projects, and also to upgrade existing projects.

The 1.0 alpha series consisted of a number of breaking changes compared to the previous 0.x releases, so be sure to check the 
[CHANGELOG](CHANGELOG.md) for details. After the first stable 1.0 release the API will remain stable according to
[SemVer](http://semver.org/).    

## Updates

See [CHANGELOG](CHANGELOG.md) for the list of all changes.

If you want to keep up to date with ember-bootstrap, you may want to [follow me on Twitter](https://twitter.com/simonihmig). 

## Author and collaborators

* [Simon Ihmig](https://github.com/simonihmig)
* [Stephen Vance](https://github.com/srvance)
* and many more [contributors](https://github.com/kaliber5/ember-bootstrap/graphs/contributors)

## Copyright and license

Code and documentation copyright 2017 [kaliber5](http://www.kaliber5.de) and contributors. Code released under [the MIT license](LICENSE.md).
