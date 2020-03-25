# How To Contribute

## Issues

* For general questions please use the #e-bootstrap channel on the [Ember Discord server](https://discord.gg/zT3asNS).

* For bug reports please include the output of `ember bootstrap:info` in your description.

## Pull requests

* This addon supports Bootstrap 3 and 4 at the same time. Therefore the project structure is a bit different
than that of usual Ember addon. Please read the section on [Dual Bootstrap support](#dual-bootstrap-support)
for more detailed explanations.

* Add a test for your change. Only refactoring and documentation changes
require no new tests. In the case of a bug fix, please make sure that the added test is failing without the fix.

* When you create a pull request, please provide a clear PR title, describing your changes in a way
that other users would easily understand the changes. The title will be used to automatically generate the 
[Changelog](CHANGELOG.md).

## Dual Bootstrap support

This addon supports apps using Bootstrap version 3 as well as 4. The user is able to set the version
in the app's `ember-cli-build-js` (or using the addon's blueprint: `ember generate ember-bootstrap --bootstrap-version=3`).
Therefore the addon needs to support both versions at the same time, which required a slightly different 
file structure than usual.

### Components

That concerns the component file trees, both for the JavaScript as well as the template parts.
The JavaScript components are located as usual in `addon/components`, but are split into these sub folders:
* `base`
* `bs3`
* `bs4`

Depending on the chosen Bootstrap version, only the `bs3` or the `bs4` trees are exposed to the consuming app
at build time, and moved to the root of the component folder. So for example for a Bootstrap 4 app 
`addon/components/bs4/bs-button.js` is moved to `addon/components/bs-button.js` using a Broccoli tree
transformation, and as such is used by the app, while the `bs3` tree is dismissed. 

This allows to have a somewhat different implementation where required, to account for differences of the
functionality and/or markup (e.g. different class names). But as the differences will be mostly small
compared to the similarities, the Bootstrap version specific components will inherit from the base component
in the `base` tree, which will contain the majority of the code, and which should be version-independent.

So at the end for every common component there is one file in each of `bs3` and `bs4` trees, as well as the
base component in `base`.

### Templates

A similar setup is used for templates. But as we don't have a way to extend templates, we do not have a 
`base` template. Rather for templates that show no differences between the BS3 and BS4 implementation,
those can be found in the `common` tree (and only there!). Only if a component needs different templates, 
it will not have a file in `common`, but rather a file each in `bs3` as well as in `bs4`. 

A Broccoli transformation will again kick in at build time, and merge the `common` tree with the appropriate 
version-specific tree, while dismissing the other (unused) one.

### Testing

This addon uses TravisCI to run a [ember-try](https://github.com/ember-cli/ember-try) based test matrix 
containing separate test runs for Bootstrap 3 and 4. By default all tests will run for both versions. 

To also accommodate for different testing requirements based on the Bootstrap version, there exist some testing
helpers in [tests/helpers/bootstrap-test.js](tests/helpers/bootstrap-test.js). In particular if you need a 
different test for a specific Bootstrap version, you can use one of `testBS3()` or `testBS4()` as a replacement
for the usual QUnit `test()` function, which will only be used in a test run for that specific version.

See the existing tests for examples of how this is used. 

To run tests locally for Bootstrap 3 (as BS4 is the default), you can set the `BOOTSTRAPVERSION` environment
variable to "3", e.g. `BOOTSTRAPVERSION=3 ember test`.

## Project Setup

### Installation

* `git clone https://github.com/kaliber5/ember-bootstrap`
* `cd ember-bootstrap`
* `yarn`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

To run tests in Bootstrap 3 mode, prefix these commands with `BOOTSTRAPVERSION=3` as described [here](#testing).

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
