# How To Contribute

## Issues

* For general questions please use the #e-bootstrap channel on the [Ember Discord server](https://discord.gg/zT3asNS).

* For bug reports please include the versions of Ember Bootstrap, Bootstrap, and Ember in your description.

## Pull requests

* This addon supports Bootstrap 4 and 5 at the same time. Therefore the build setup is a bit different
than that of a usual Ember addon. Please read the section on [Dual Bootstrap support](#dual-bootstrap-support)
for more detailed explanations.

* Add a test for your change. Only refactoring and documentation changes
require no new tests. In the case of a bug fix, please make sure that the added test is failing without the fix.

* When you create a pull request, please provide a clear PR title, describing your changes in a way
that other users would easily understand the changes. The title will be used to automatically generate the 
[Changelog](CHANGELOG.md).

## Dual Bootstrap support

This addon supports apps using Bootstrap version 4 as well as 5. The user is able to set the version
in the app's `ember-cli-build-js`.
Therefore the addon needs to support both versions at the same time, which requires the components to be compiled
differently at build time.

This is accomplished using the `@embroider/macros` addon, which provides helpers (called macros) that allow you to
introduce conditionals based on the Bootstrap version, which are compiled away when building the host app, so no
runtime overhead occurs. The most common case is applying different classes based on the Bootstrap version, like in 
this example of the `<BsAlert>` component:

```hbs
<label
  class="
    {{if (macroCondition (macroGetOwnConfig "isBS5")) "form-label"}}
    {{@labelClass}}
  "
  ...attributes
>
```

This will compile to `<label class="form-label {{@labelClass}}" ...attributes>` in a Bootstrap 5 app and to 
`<label class="{{@labelClass}}" ...attributes>` for Bootstrap 4.

Please refer to the `@embroider/macros` [documentation](https://github.com/embroider-build/embroider/blob/master/packages/macros/README.md) for further information.

### Testing

This addon uses Github Actions to run a [ember-try](https://github.com/ember-cli/ember-try) based test matrix 
containing separate test runs for Bootstrap 4 and 5. By default all tests will run for both versions. 

To also accommodate for different testing requirements based on the Bootstrap version, there exist some testing
helpers in [tests/helpers/bootstrap.js](tests/helpers/bootstrap.js). In particular if you need a 
different test for a specific Bootstrap version, you can use one of `testBS4()` or `testBS5()` as a replacement
for the usual QUnit `test()` function, which will only be used in a test run for that specific version.

See the existing tests for examples of how this is used. 

To run tests locally for Bootstrap 4 (as BS5 is the default), you can set the `BOOTSTRAPVERSION` environment
variable to "4", e.g. `BOOTSTRAPVERSION=4 ember test`.

## Project Setup

### Installation

* `git clone https://github.com/kaliber5/ember-bootstrap`
* `cd ember-bootstrap`
* `pnpm`

### Linting

* `pnpm lint`
* `pnpm lint:fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

To run tests in Bootstrap 4 mode, prefix these commands with `BOOTSTRAPVERSION=4` as described [here](#testing).

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
