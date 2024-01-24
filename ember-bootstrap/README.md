# ember-bootstrap

[![CI](https://github.com/kaliber5/ember-bootstrap/actions/workflows/ci.yml/badge.svg)](https://github.com/kaliber5/ember-bootstrap/actions/workflows/ci.yml)
[![Ember Observer Score](http://emberobserver.com/badges/ember-bootstrap.svg)](http://emberobserver.com/addons/ember-bootstrap)
[![npm version](https://badge.fury.io/js/ember-bootstrap.svg)](https://badge.fury.io/js/ember-bootstrap)

An [ember-cli](http://www.ember-cli.com) addon for using [Bootstrap](http://getbootstrap.com/) 4 und 5 in Ember applications.

The addon includes the Bootstrap CSS (or Sass, Less) in your project (can be disabled). On top of that, it provides a set of native Ember components (no use of Bootstrap JavaScript!).</p>

_See [www.ember-bootstrap.com](http://www.ember-bootstrap.com/) for full documentation._

## Installation

In your application's directory:

    ember install ember-bootstrap

This will install Bootstrap 4 and will use the currently installed preprocessor or none if one is not installed.
To switch Bootstrap version or preprocessor, see the [setup documentation](http://www.ember-bootstrap.com/#/getting-started/setup).

## Compatibility

Ember Bootstrap works and is fully [tested](https://github.com/kaliber5/ember-bootstrap/actions?query=workflow%3ACI+branch%3Amaster) with

- Ember.js 4.8 or above
- Ember CLI 4.8 or above
- Bootstrap 4 and 5
- all modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- node.js 18+
- FastBoot 1.0+
- Embroider: we strive (and test) for maximum compatibility with Embroider, including the most aggressive setting
  (`staticComponents`) for tree shaking and code splitting. However as Embroider itself is still considered beta software,
  we won't be able to _guarantee_ that for the time being.

This project follows [Semantic Versioning](http://semver.org/).

## Updates

See [CHANGELOG](CHANGELOG.md) for the list of all changes.

If you want to keep up to date with ember-bootstrap, you may want to [follow me on Twitter](https://twitter.com/simonihmig).

## Author and collaborators

- [Simon Ihmig](https://github.com/simonihmig)
- [Stephen Vance](https://github.com/srvance)
- [Jeldrik Hanschke](https://github.com/jelhan)
- [Sander Knauff](https://github.com/sanderknauff)
- and many more [contributors](https://github.com/kaliber5/ember-bootstrap/graphs/contributors)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## Copyright and license

Code and documentation copyright 2020 [kaliber5](https://www.kaliber5.de) and contributors. Code released under [the MIT license](LICENSE.md).
