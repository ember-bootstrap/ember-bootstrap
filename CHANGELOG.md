<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-06-21)


### Bug Fixes

* **Accordion:** add static CSS fix to enable clicking on whole header on iOS ([2a8fefe](https://github.com/kaliber5/ember-bootstrap/commit/2a8fefe)), closes [#355](https://github.com/kaliber5/ember-bootstrap/issues/355)
* **Button:** fix event bubbling for submit buttons. Event bubbling is prevented when a `onClick` action handler has been set ([89c575d](https://github.com/kaliber5/ember-bootstrap/commit/89c575d))
* **Button:** Stop event bubbling when clicked ([a2d123b](https://github.com/kaliber5/ember-bootstrap/commit/a2d123b)), closes [#347](https://github.com/kaliber5/ember-bootstrap/issues/347)
* **Dropdown:** Make dropdowns BS4 compliant ([b37c150](https://github.com/kaliber5/ember-bootstrap/commit/b37c150))
* **Form:** fixed various form classes for Bootstrap 4. Thanks to [@Rapid0o](https://github.com/Rapid0o) ([f487ecd](https://github.com/kaliber5/ember-bootstrap/commit/f487ecd)), closes [#336](https://github.com/kaliber5/ember-bootstrap/issues/336)
* **Modal:** Trigger submit on all forms in modal body. Thanks to [@Moxide](https://github.com/Moxide) ([b2b32b8](https://github.com/kaliber5/ember-bootstrap/commit/b2b32b8)), closes [#362](https://github.com/kaliber5/ember-bootstrap/issues/362)
* **Modal/Tooltip/Popover:** Updated ember-wormhole fixes FastBoot problems for Modals, Tooltips and Popovers ([19b8328](https://github.com/kaliber5/ember-bootstrap/commit/19b8328)), closes [#284](https://github.com/kaliber5/ember-bootstrap/issues/284)
* **Popover:** Fix scrollposition for FF - fixes [#357](https://github.com/kaliber5/ember-bootstrap/issues/357) ([ef97a62](https://github.com/kaliber5/ember-bootstrap/commit/ef97a62))
* **Tooltip/Popover:** fixed offset of arrow for subsequent displays ([0ed9042](https://github.com/kaliber5/ember-bootstrap/commit/0ed9042)), closes [#361](https://github.com/kaliber5/ember-bootstrap/issues/361)
* **Tooltip/Popover:** fixed positioning being slightly off ([3ba51b1](https://github.com/kaliber5/ember-bootstrap/commit/3ba51b1))
* **Tooltip/Popover:** Fixed removing event listeners of destroyed components ([33dfda7](https://github.com/kaliber5/ember-bootstrap/commit/33dfda7)), closes [#350](https://github.com/kaliber5/ember-bootstrap/issues/350)


### Features

* **FormElement:** Add customWarning property to show warnings independently of validation. Thanks to [@elgordino](https://github.com/elgordino) ([540e233](https://github.com/kaliber5/ember-bootstrap/commit/540e233))
* **Navbar:** automatically collapse menu when clicking nav link on mobile ([2008884](https://github.com/kaliber5/ember-bootstrap/commit/2008884)), closes [#317](https://github.com/kaliber5/ember-bootstrap/issues/317)
* **Navbar:** expose public `collapsed` property, call onCollapse/onCollapsed and onExpand/onExpanded actions ([27f0da9](https://github.com/kaliber5/ember-bootstrap/commit/27f0da9))



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.12...v1.0.0-beta.1) (2017-06-05)


### Bug Fixes

* **AccordionItem:** preventDefault click on title link. Thanks to [@dajk](https://github.com/dajk) ([78bb9e9](https://github.com/kaliber5/ember-bootstrap/commit/78bb9e9)), closes [#311](https://github.com/kaliber5/ember-bootstrap/issues/311)
* **Modal:** Fixed `onClick` dummy action. Thanks to [@dajk](https://github.com/dajk) ([76dadf2](https://github.com/kaliber5/ember-bootstrap/commit/76dadf2))
* **Setup:** Soften the build-time errors to warnings for non-standard configurations ([fec690e](https://github.com/kaliber5/ember-bootstrap/commit/fec690e)), closes [#322](https://github.com/kaliber5/ember-bootstrap/issues/322)


### Features

* **jQuery:** Removed jQuery-dependency ([ac489e8](https://github.com/kaliber5/ember-bootstrap/commit/ac489e8)), closes [#300](https://github.com/kaliber5/ember-bootstrap/issues/300)


### BREAKING CHANGES

* **jQuery:** The `triggerElement` and `viewportSelector` properties of tooltips and popovers now expect a valid CSS Selector. If you used any jQuery specific non-standard selector features like `:eq()` for example, this needs to be refactored!



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.11...v1.0.0-alpha.12) (2017-04-26)


### Features

* **AccordionItem:** yield title and body as contextual components for better customization. Thanks to [@dajk](https://github.com/dajk) ([8d09cdf](https://github.com/kaliber5/ember-bootstrap/commit/8d09cdf)), closes [#283](https://github.com/kaliber5/ember-bootstrap/issues/283)
* **Build:** Upgrade to ember-cli-babel@6 to enable new ember-cli targets feature ([cf9a77d](https://github.com/kaliber5/ember-bootstrap/commit/cf9a77d))



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.10...v1.0.0-alpha.11) (2017-04-21)


### Features

* **FastBoot:** prepare for upcoming FastBoot 1.0 breaking changes. ember-bootstrap should now be compatible with pre and post 1.0 versions of FastBoot! ([7474e72](https://github.com/kaliber5/ember-bootstrap/commit/7474e72))
* **FormElement:** `helpText` allows you to add a block of help text next to your form control ([c23af92](https://github.com/kaliber5/ember-bootstrap/commit/c23af92)), closes [#169](https://github.com/kaliber5/ember-bootstrap/issues/169)
* **FormElement:** Added `options` and `optionLabelPath` properties to better support select-like control components ([271c52d](https://github.com/kaliber5/ember-bootstrap/commit/271c52d))



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.9...v1.0.0-alpha.10) (2017-04-13)


### Bug Fixes

* **Install:** Fix dependency validator to allow having bootstrap in bower dependencies. Thanks to [Exelord](https://github.com/exelord).  ([2d5d254](https://github.com/kaliber5/ember-bootstrap/commit/2d5d254))


### Features

* **Form:** form element yields control component for easier customization ([7fa354a](https://github.com/kaliber5/ember-bootstrap/commit/7fa354a))



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.8...v1.0.0-alpha.9) (2017-04-01)


### Bug Fixes

* **Install:** Blueprint honor existing config ([#285](https://github.com/kaliber5/ember-bootstrap/issues/285)) ([030131e](https://github.com/kaliber5/ember-bootstrap/commit/030131e)), closes [#282](https://github.com/kaliber5/ember-bootstrap/issues/282)
* **Install:** Use configured `bootstrapVersion` if present ([e68d372](https://github.com/kaliber5/ember-bootstrap/commit/e68d372)), closes [#276](https://github.com/kaliber5/ember-bootstrap/issues/276)
* **Install:** Address the situation where `ember-cli-build.js` could not be edited, closes [#279](https://github.com/kaliber5/ember-bootstrap/issues/279)


### Features

* **Info command:** added `ember bootstrap:info` command ([2c54d3f](https://github.com/kaliber5/ember-bootstrap/commit/2c54d3f))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.7...v1.0.0-alpha.8) (2017-03-20)


### Bug Fixes

* **Install:** fixed default options not being applied at addon installation, causing a `Bootstrap version must be 3 or 4` error ([1d753cb](https://github.com/kaliber5/ember-bootstrap/commit/1d753cb)), closes [#272](https://github.com/kaliber5/ember-bootstrap/issues/272)
* **Install:** fixed wrong config being added to `ember-cli-build.js` when no preprocessor was used ([63210bf](https://github.com/kaliber5/ember-bootstrap/commit/63210bf))
* **Navbar:** Use `fixed-top`, `fixed-bottom`, and `sticky-top` for BS4 for navbar `position` ([bf46b39](https://github.com/kaliber5/ember-bootstrap/commit/bf46b39)), closes [#269](https://github.com/kaliber5/ember-bootstrap/issues/269)



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.6...v1.0.0-alpha.7) (2017-03-19)


### Bug Fixes

* **Install:** fixed missing dependency (`silent-error`) in package.json ([7f6cc7a](https://github.com/kaliber5/ember-bootstrap/commit/7f6cc7a))



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.5...v1.0.0-alpha.6) (2017-03-18)


### Bug Fixes

* **Build:** fix build issue with ember-cli 2.12.0. Thanks to [@rwjblue](https://github.com/rwjblue) ([377edb6](https://github.com/kaliber5/ember-bootstrap/commit/377edb6))
* **Dropdown:** Dropdown with a `block=true` toggle button has 'dropdown' class instead of 'btn-group' ([5f9cd78](https://github.com/kaliber5/ember-bootstrap/commit/5f9cd78)), closes [#244](https://github.com/kaliber5/ember-bootstrap/issues/244)
* **FormElement:** shows automatic validation state only when validator addon is present ([#266](https://github.com/kaliber5/ember-bootstrap/issues/266)) ([c163e54](https://github.com/kaliber5/ember-bootstrap/commit/c163e54)), closes [#240](https://github.com/kaliber5/ember-bootstrap/issues/240)


### Features

* **Installation:** Improved default blueprint (`ember g ember-bootstrap`) for addon installation. Installs only the necessary
  dependencies, based on your chosen Bootstrap version and optional CSS preprocessor. Introduces new options `--bootstrapVersion`
  to easily switch Bootstrap version (3/4) and `--preprocessor` to choose the CSS preprocessor (Sass/Less), including
  installation of the preprocessor addon itself if required. Also does not require Bower anymore! 
  Find all details at the [Getting started](http://www.ember-bootstrap.com/#/getting-started/assets) guide.
  Thanks to [srvance](https://github.com/srvance)!
* **Dropdown:** Adds isOpen to dropdown template hash. Thanks to [@theroncross](https://github.com/theroncross) ([58abd4b](https://github.com/kaliber5/ember-bootstrap/commit/58abd4b)), closes [#251](https://github.com/kaliber5/ember-bootstrap/issues/251)



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.4...v1.0.0-alpha.5) (2017-02-27)


### Features

* **Bootstrap 4:** experimental support for Bootstrap 4 added, thanks to the terrific work of [srvance](https://github.com/srvance). For instructions visit the [Getting started](http://www.ember-bootstrap.com/#/getting-started/bootstrap-4) guide. ([#206](https://github.com/kaliber5/ember-bootstrap/pull/206))
* **FormElement:** `customError` shows custom error message independent of the model's validation ([93e451a](https://github.com/kaliber5/ember-bootstrap/commit/93e451a))
* **Modal:** use separate components for modal header and close button to allow for better customization ([7ba6bc1](https://github.com/kaliber5/ember-bootstrap/commit/7ba6bc1))



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.3...v1.0.0-alpha.4) (2017-02-09)


### Features

* **FormElement:** Add input as available event for showValidationOn. Thanks to elgordino ([#210](https://github.com/kaliber5/ember-bootstrap/issues/210)) ([b153864](https://github.com/kaliber5/ember-bootstrap/commit/b153864))
* **Modal:** container div for ember-wormhole renamed to `#ember-bootstrap-wormhole`, is added at build-time to index.html, not through initializer anymore ([9b4013a](https://github.com/kaliber5/ember-bootstrap/commit/9b4013a)), closes [#222](https://github.com/kaliber5/ember-bootstrap/issues/222)
* **Modal:** Fall back to not using fade transition in FastBoot by default, so FastBoot rendered app contains immediately visible modal ([b95aad9](https://github.com/kaliber5/ember-bootstrap/commit/b95aad9))



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/kaliber5/ember-bootstrap/compare/1.0.0-alpha.2...v1.0.0-alpha.3) (2017-01-21)


### Features

* **FormElement:** supports most common HTML5 attributes ([3ef492c](https://github.com/kaliber5/ember-bootstrap/commit/3ef492c)), closes [#179](https://github.com/kaliber5/ember-bootstrap/issues/179)
* **FormGroup/FormElement:** supports control sizing through `size` property ([90ca70b](https://github.com/kaliber5/ember-bootstrap/commit/90ca70b)), closes [#202](https://github.com/kaliber5/ember-bootstrap/issues/202)
* **LESS:** when installing ember-bootstrap and ember-cli-less is present, an `@import` statement is automatically added to app.less, the static CSS is not imported (regardless of importBootstrapCSS setting) ([992b65f](https://github.com/kaliber5/ember-bootstrap/commit/992b65f))
* **NavItem:** calls onClick action ([5188c80](https://github.com/kaliber5/ember-bootstrap/commit/5188c80)), closes [#196](https://github.com/kaliber5/ember-bootstrap/issues/196)
* **SASS:** when installing ember-bootstrap and ember-cli-sass is present, the SASS port of Bootstrap 3 is installed and an `@import` statement is automatically added to app.sass ([5666a06](https://github.com/kaliber5/ember-bootstrap/commit/5666a06)), closes [#178](https://github.com/kaliber5/ember-bootstrap/issues/178)
* **SASS/LESS:** Add warnings when required dependencies are missing ([2d2ff5f](https://github.com/kaliber5/ember-bootstrap/commit/2d2ff5f))



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/kaliber5/ember-bootstrap/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-01-10)


### Bug Fixes

* **FormElement:** input elements also trigger on change event as well as on input event ([62600fc](https://github.com/kaliber5/ember-bootstrap/commit/62600fc))
* **Modal:** Fixed missing close button for header yielded by bs-modal ([1100e3f](https://github.com/kaliber5/ember-bootstrap/commit/1100e3f))



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/kaliber5/ember-bootstrap/compare/v1.0.0-alpha...v1.0.0-alpha.1) (2017-01-02)


### Bug Fixes

* **Form:** Restore the label for a checkbox in vertical layout
* **Modal:** added guard to double invocation of show/hide methods ([eb63088](https://github.com/kaliber5/ember-bootstrap/commit/eb63088))


### Features

* **Dropdown:** menu item component is yielded as a contextual component from DropdownMenu ([55e508f](https://github.com/kaliber5/ember-bootstrap/commit/55e508f))
* **Form:** FormGroup component is yielded as a contextual component from Form ([0941946](https://github.com/kaliber5/ember-bootstrap/commit/0941946)), closes [#186](https://github.com/kaliber5/ember-bootstrap/issues/186)
* **Nav:** added contextual link-to component ([8c7d2b5](https://github.com/kaliber5/ember-bootstrap/commit/8c7d2b5))



<a name="1.0.0-alpha"></a>
# [1.0.0-alpha](https://github.com/kaliber5/ember-bootstrap/compare/v0.11.3...v1.0.0-alpha) (2016-12-27)

## Breaking Changes

Please note that the 1.0 release of ember-bootstrap will introduce several breaking changes to make use of modern Ember features, follow Data Down Actions Up (DDAU) best practises and to make its API consistent.
Most changes will fall into one of the following categories:

* Use contextual components for parent/child components
* Use one-way bindings for public properties to not violate DDAU
* renamed actions for consistency

Also ember-bootstrap 1.0 requires at least **Ember v2.3**!

See the following list for details.

### Features

* **Accordion:** binding to `selected` property is one-way, thus preventing DDAU violations ([a44ec7d](https://github.com/kaliber5/ember-bootstrap/commit/a44ec7d))
* **Accordion:** uses contectual components for items. Fires `onChange` action. ([bbab0f4](https://github.com/kaliber5/ember-bootstrap/commit/bbab0f4))
* **Accordion:** yield `change` action for adding custom behaviour ([e8936cd](https://github.com/kaliber5/ember-bootstrap/commit/e8936cd))
* **Alert:** Binding to visible property is one-way only (DDAU) ([d3ab2f3](https://github.com/kaliber5/ember-bootstrap/commit/d3ab2f3))
* **Alert:** renamed `dismissedAction` to `onDismissed`. Added `onDismiss` action, that prevents hiding the alert automatically when it returns false ([8460af4](https://github.com/kaliber5/ember-bootstrap/commit/8460af4))
* **Alert:** renamed `dismissedAction` to `onDismissed`. Added `onDismiss` action, that prevents hiding the alert automatically when it returns false ([99a139b](https://github.com/kaliber5/ember-bootstrap/commit/99a139b))
* **Button:** removed `toggle` property, `active` state is not changed by button itself anymore (DDAU). Changed default action to `onClick` closure action with changed signature ([14cd0bf](https://github.com/kaliber5/ember-bootstrap/commit/14cd0bf))
* **ButtonGroup:** refactored to make use of contextual components, does not change `value` (DDAU) ([603c67d](https://github.com/kaliber5/ember-bootstrap/commit/603c67d))
* **Collapse:** renamed actions to onShow/onShown/onHide/onHidden ([9dad149](https://github.com/kaliber5/ember-bootstrap/commit/9dad149))
* **Dropdown:** refactored to make use of contextual components, added onShow and onHide actions ([ae4d2af](https://github.com/kaliber5/ember-bootstrap/commit/ae4d2af))
* **Form:** FormElement component is yielded as contextual component ([2509620](https://github.com/kaliber5/ember-bootstrap/commit/2509620))
* **Form:** renamed actions to onBefore/onSubmit/onInvalid ([e1397a1](https://github.com/kaliber5/ember-bootstrap/commit/e1397a1))
* **FormElement:** support readonly attribute. Thanks to basz ([dec8e8c](https://github.com/kaliber5/ember-bootstrap/commit/dec8e8c))
* **FormElement:** the existing block params `id`, `value` and `validation` are yielded as hash properties ([c353154](https://github.com/kaliber5/ember-bootstrap/commit/c353154))
* **FormElement:** uses one-way controls thus supporting DDAU pattern. Calls onChange action when input values have changed. Form component initializes FormElement with default action that updates the models property, but can be overriden. ([dda8e36](https://github.com/kaliber5/ember-bootstrap/commit/dda8e36))
* **Input:** The `bs-input` and `bs-textarea` components have been removed, as they were based on the basic Ember input helpers that allow only two-way bindings. Use simple `<input class="form-control">` elements instead if needed. The form elements yielded by `bs-form` wrap these for you, so use them whenever possible. ([3e7d81f](https://github.com/kaliber5/ember-bootstrap/commit/3e7d81f))
* **Modal:** added `transitionDuration` and `backdropTransitionDuration`. ([d49c79a](https://github.com/kaliber5/ember-bootstrap/commit/d49c79a)), closes [#78](https://github.com/kaliber5/ember-bootstrap/issues/78)
* **Modal:** Binding to open property is one-way only (DDAU) ([c3869c9](https://github.com/kaliber5/ember-bootstrap/commit/c3869c9))
* **Modal:** dropped `autoClose` property. Preventing automatically closing the modal can now be done by returning false from `onHide` ([1bffd84](https://github.com/kaliber5/ember-bootstrap/commit/1bffd84))
* **Modal:** refactored to use contextual components for header, footer and body ([c3d449e](https://github.com/kaliber5/ember-bootstrap/commit/c3d449e))
* **Modal:** Renamed actions to onShow/onShown/onHide/onHidden/onSubmit for consistency ([91ec078](https://github.com/kaliber5/ember-bootstrap/commit/91ec078))
* **Modal:** Splitted in `bs-modal-simple` for default markup and `bs-modal` for custom markup. This replaces the previous `header`, `body` and `footer` flags ([3ef2bf7](https://github.com/kaliber5/ember-bootstrap/commit/3ef2bf7))
* **Nav:** refactored to yield nav item as a contextual component ([da7ef45](https://github.com/kaliber5/ember-bootstrap/commit/da7ef45))
* **NavBar:** refactored to use contextual components. Thanks to [srvance](https://github.com/srvance) ([1f49c28](https://github.com/kaliber5/ember-bootstrap/commit/1f49c28))
* **Progress:** Progress bar component is yielded as contextual component ([a237379](https://github.com/kaliber5/ember-bootstrap/commit/a237379))
* **Select:** removed deprecated select component and FromElement with controlType="select" ([9f04445](https://github.com/kaliber5/ember-bootstrap/commit/9f04445))
* **Tab:** Binding to activeId property is one-way only (DDAU) ([2e3e44a](https://github.com/kaliber5/ember-bootstrap/commit/2e3e44a))
* **Tab:** refactored to yield tab pane as a contextual component. Changed default action to `onChange` ([0185589](https://github.com/kaliber5/ember-bootstrap/commit/0185589))
* **Tab:** returning false from `onChange` prevents changing the active tab (DDAU) ([3ac6225](https://github.com/kaliber5/ember-bootstrap/commit/3ac6225))



<a name"0.11.3"></a>
### 0.11.3 (2016-11-30)


#### Features

* **Modal:** support custom class ([2b23316b](https://github.com/kaliber5/ember-bootstrap/commit/2b23316b))
* **Tooltips:** support custom class. Thanks to rstudner ([7877c5df](https://github.com/kaliber5/ember-bootstrap/commit/7877c5df), closes [#161](https://github.com/kaliber5/ember-bootstrap/issues/161))


<a name"0.11.2"></a>
### 0.11.2 (2016-11-08)


#### Bug Fixes

* **ButtonGroup:** null value sync with child buttons. Thanks to apokinsocha ([f96ff45a](https://github.com/kaliber5/ember-bootstrap/commit/f96ff45a))
* **Modal:** fixed Modal not closing when setting open=false in Ember 1.13 ([f59b94da](https://github.com/kaliber5/ember-bootstrap/commit/f59b94da))


#### Features

* **Button:** Addition/support for title attribute on buttons. Thanks to basz ([3d630874](https://github.com/kaliber5/ember-bootstrap/commit/3d630874), closes [#148](https://github.com/kaliber5/ember-bootstrap/issues/148))


<a name"0.11.1"></a>
### 0.11.1 (2016-10-27)


#### Bug Fixes

* **Alert:** added missing alert-dismissible class ([9c8f5ace](https://github.com/kaliber5/ember-bootstrap/commit/9c8f5ace), closes [#146](https://github.com/kaliber5/ember-bootstrap/issues/146))


<a name"0.11.0"></a>
## 0.11.0 (2016-10-08)


#### Features

* **Tooltips:** Added support for tooltips and popovers ([25d16ccd](https://github.com/kaliber5/ember-bootstrap/commit/25d16ccd), closes [#7](https://github.com/kaliber5/ember-bootstrap/issues/7))


<a name"0.10.0"></a>
## 0.10.0 (2016-09-15)


#### Bug Fixes

* **Accordion:** fixed use of private parentView property, breaking tests in Ember 2.8 ([9d7584ed](https://github.com/kaliber5/ember-bootstrap/commit/9d7584ed))
* **Modal:**
  * fixed "You modified ... twice in a single render" deprecation/assertion ([cdd35ac3](https://github.com/kaliber5/ember-bootstrap/commit/cdd35ac3))
  * Modal is rendered in place when no wormhole container is found. Fixes modals in Fastboot ([c4184f29](https://github.com/kaliber5/ember-bootstrap/commit/c4184f29))
  * added fixes for Glimmer2, including workaround for ember-wormhole ([ce9a2c25](https://github.com/kaliber5/ember-bootstrap/commit/ce9a2c25))


#### Features

* **Form:** model is passed as parameter to default and before actions ([6c9282a7](https://github.com/kaliber5/ember-bootstrap/commit/6c9282a7), closes [#126](https://github.com/kaliber5/ember-bootstrap/issues/126))


#### Breaking Changes

* **Form:** the signature of the default action that is called when submitting the form has changed.
    The form's model is always the first parameter, with an optional validation result as the second parameter

    Before:

        submit(validationResult) { ... }

    After:

        submit(model, validationResult) { ... }

 ([6c9282a7](https://github.com/kaliber5/ember-bootstrap/commit/6c9282a7))


<a name"0.9.1"></a>
### 0.9.1 (2016-08-20)


#### Bug Fixes

* **Modal:** perform cleanup when removing an opened modal from DOM without waiting for transition. Thanks to [sukima](https://github.com/sukima) ([e863f71f](https://github.com/kaliber5/ember-bootstrap/commit/e863f71f))


#### Features

* **FormElement:** adds `showValidationOn` events. Thanks to [jelhan](https://github.com/jelhan) (#127) ([2eb7ac07](https://github.com/kaliber5/ember-bootstrap/commit/2eb7ac07))


<a name"0.9.0"></a>
## 0.9.0 (2016-08-13)


#### Bug Fixes

* **Dropdown:** removed data-toggle="dropdown" attribute to prevent clash if original bootstrap is present. ([bf44d272](https://github.com/kaliber5/ember-bootstrap/commit/bf44d272), closes [#115](https://github.com/kaliber5/ember-bootstrap/issues/115))
* **Form:** fixed novalidate attribute being a string value of "false" or "true" ([45db61dd](https://github.com/kaliber5/ember-bootstrap/commit/45db61dd))
* **General:**
  * fix Ember.Array.contains deprecation in Ember 2.8+ ([700802f0](https://github.com/kaliber5/ember-bootstrap/commit/700802f0))
  * fix Ember.Handlebars.SafeString deprecation in Ember 2.8+ ([09d5a245](https://github.com/kaliber5/ember-bootstrap/commit/09d5a245))


#### Features

* **AccordionItem:** Add expanded class name for accordion item. ([268bc0d3](https://github.com/kaliber5/ember-bootstrap/commit/268bc0d3))
* **Dropdown:** support "dropup" style ([f7813087](https://github.com/kaliber5/ember-bootstrap/commit/f7813087), closes [#114](https://github.com/kaliber5/ember-bootstrap/issues/114))
* **Navbar:** added set of components for creating navbars. Thanks to [srvance](https://github.com/srvance) for implementation ([6065a0b4](https://github.com/kaliber5/ember-bootstrap/commit/6065a0b4), closes [#48](https://github.com/kaliber5/ember-bootstrap/issues/48))


<a name"0.8.0"></a>
## 0.8.0 (2016-07-02)


#### Bug Fixes

* **ButtonGroup:** allow value 0 (Number) as valid value for a bs-button (#105). Thanks to [arohr](https://github.com/arohr) ([d770cf67](https://github.com/kaliber5/ember-bootstrap/commit/d770cf67))


#### Features

* **Nav:** added components bs-nav and bs-nav-item for bootstrap navs ([dc66fe7b](https://github.com/kaliber5/ember-bootstrap/commit/dc66fe7b))
* **Tab:** added components bs-tab and bs-tab-pane for dynamic tabs ([d3e2725b](https://github.com/kaliber5/ember-bootstrap/commit/d3e2725b))
* **FormElement:** support validations with warning messages (supported by ember-cp-validations 3.0 ([cd324d16](https://github.com/kaliber5/ember-bootstrap/commit/cd324d16))


<a name"0.7.3"></a>
### 0.7.3 (2016-06-22)


#### Bug Fixes

* **ComponentChildMixin:** this.nearestOfType() is not reliable in willDestroyElement hook. Thanks to [jelhan](https://github.com/jelhan) ([44a9fa0f](https://github.com/kaliber5/ember-bootstrap/commit/44a9fa0f), closes [#99](https://github.com/kaliber5/ember-bootstrap/issues/99))
* **Build:** import map file along with bootstrap-theme.css. Thanks to [williamherry](https://github.com/williamherry)
* **Form:** update showValidations on form elements wrapped by another component. Thanks to [jelhan](https://github.com/jelhan)

#### Features

* **FormElement:** adds support for invisible (sr-only) label. Thanks to [jelhan](https://github.com/jelhan) ([8419f35e](https://github.com/kaliber5/ember-bootstrap/commit/8419f35e))
* **FormElement:** yield validation state. Thanks to [jelhan](https://github.com/jelhan) ([5f28d1e1](https://github.com/kaliber5/ember-bootstrap/commit/5f28d1e1))
* **FormElement:** adjust position of feedback items if there is input group. Thanks to [jelhan](https://github.com/jelhan)


<a name"0.7.2"></a>
### 0.7.2 (2016-05-29)

#### Bug Fixes

* **Alert:** fixed fade out animation
* **FormElement:** fixed overriding form model by setting bs-form-element model. Thanks to [jelhan](https://github.com/jelhan)

#### Features

* **Fastboot:** Fixed breaking apps in Fastboot environment. Thanks to [openhouse](https://github.com/openhouse). Fastboot is now officially supported and automatically tested.
* **Button:** add support for returning a promise from a closure action to support automatic state change ([fb8fa1e3](https://github.com/kaliber5/ember-bootstrap/commit/fb8fa1e3), closes [#87](https://github.com/kaliber5/ember-bootstrap/issues/87))
* **Form:** adds support for novalidate attribute. Thanks to [jelhan](https://github.com/jelhan)

<a name"0.7.1"></a>
### 0.7.1 (2016-05-11)


#### Bug Fixes

* **FormElement:** fixed validation property dependent keys ([16903155](https://github.com/kaliber5/ember-bootstrap/commit/16903155))


#### Features

* **Less Import:** import Bootstrap's less assets simply by importing 'ember-bootstrap/bootstrap' in your app.less ([ab38b9d5](https://github.com/kaliber5/ember-bootstrap/commit/ab38b9d5), closes [#80](https://github.com/kaliber5/ember-bootstrap/issues/80))


<a name"0.7.0"></a>
## 0.7.0 (2016-04-02)

#### Bug Fixes

* **Config:** fix config loader, closes [#68](https://github.com/kaliber5/ember-bootstrap/issues/68). Thanks to [Offir Golan](https://github.com/offirgolan)

#### Features

* **Form/FormElement:** Added validation hooks for external validation addons. See the Breaking Changes. Thanks to [Offir Golan](https://github.com/offirgolan)
* **FormElement:** Support disabled property. Thanks to [oswaldoacauan](https://github.com/oswaldoacauan)
* **FormElement:** Support required property. Thanks to [Offir Golan](https://github.com/offirgolan)
* **Form:** Add before submit action. Thanks to [Offir Golan](https://github.com/offirgolan)

#### Breaking Changes

Direct support for [ember-validations](https://github.com/DockYard/ember-validations) for validations your
ember-bootstrap forms has been removed in favor of an API that supports adding support for specific validation libraries
through additional addons. If you rely on ember-validations then install this addon when upgrading ember-bootstrap to
enable support for it:
[ember-bootstrap-validations](https://github.com/kaliber5/ember-bootstrap-validations)

Additional support for [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) has been added by [Offir Golan](https://github.com/offirgolan) through [ember-bootstrap-cp-validations](https://github.com/offirgolan/ember-bootstrap-cp-validations)

<a name"0.6.4"></a>
### 0.6.4 (2016-03-07)


#### Bug Fixes

* **Modal:**
  * fixed autofocus feature for whormholed modals ([c3cec755](https://github.com/kaliber5/ember-bootstrap/commit/c3cec755))
  * Expose modal to contained components. Thanks to [bendemboski](https://github.com/bendemboski) ([7d26d07d](https://github.com/kaliber5/ember-bootstrap/commit/7d26d07d), closes [#58](https://github.com/kaliber5/ember-bootstrap/issues/58))
  * Make modal-closer mixin less brittle (refs #58). Thanks to [bendemboski](https://github.com/bendemboski) ([4d32b08a](https://github.com/kaliber5/ember-bootstrap/commit/4d32b08a))


#### Features

* **Modal:** Implement openAction (refs #55). Thanks to [bendemboski](https://github.com/bendemboski) ([ab713eef](https://github.com/kaliber5/ember-bootstrap/commit/ab713eef))


<a name"0.6.3"></a>
### 0.6.3 (2016-03-04)


#### Bug Fixes

* **Accordion:** Fix toggling accordion items. ([925ee7d6](https://github.com/kaliber5/ember-bootstrap/commit/925ee7d6), closes [#56](https://github.com/kaliber5/ember-bootstrap/issues/56))
* **Alert:**
  * Alert is initially hidden when visible=false ([10aa8870](https://github.com/kaliber5/ember-bootstrap/commit/10aa8870), closes [#61](https://github.com/kaliber5/ember-bootstrap/issues/61))
  * missing fade out animation when clicking close button ([11acbccd](https://github.com/kaliber5/ember-bootstrap/commit/11acbccd), closes [#59](https://github.com/kaliber5/ember-bootstrap/issues/59))


#### Features

* **Modal:** Implement autofocus support. Thanks to [bendemboski](https://github.com/bendemboski) ([10f6d71f](https://github.com/kaliber5/ember-bootstrap/commit/10f6d71f), closes [#55](https://github.com/kaliber5/ember-bootstrap/issues/55))


<a name"0.6.2"></a>
### 0.6.2 (2016-02-25)


#### Bug Fixes

* **Addon:** Remove hardcoding of `isDevelopingAddon`. Thanks to [@rwjblue](https://github.com/rwjblue) ([015fa5f](https://github.com/kaliber5/ember-bootstrap/commit/015fa5f)
* **Addon:** Allow using ember-bootstrap within another addon ([a2e5b29f](https://github.com/kaliber5/ember-bootstrap/commit/a2e5b29f), closes [#50](https://github.com/kaliber5/ember-bootstrap/issues/50))
* **Modal:** Patch emulateTransitionEnd to support andThen() waiting for transition ([ae787626](https://github.com/kaliber5/ember-bootstrap/commit/ae787626), closes [#53](https://github.com/kaliber5/ember-bootstrap/issues/53))


<a name"0.6.1"></a>
### 0.6.1 (2016-02-06)


#### Bug Fixes

* **FormElement:** changing formLayout on parent form now correctly updates bootstrap markup ([5ff1c870](https://github.com/kaliber5/ember-bootstrap/commit/5ff1c870), closes [#47](https://github.com/kaliber5/ember-bootstrap/issues/47))


#### Features

* **Alert:** add a dismissed action ([760a2db5](https://github.com/kaliber5/ember-bootstrap/commit/760a2db5)), closes [#45](https://github.com/kaliber5/ember-bootstrap/issues/45))
* **FormElement:** support custom controls ([641d96e7](https://github.com/kaliber5/ember-bootstrap/commit/641d96e7), closes [#46](https://github.com/kaliber5/ember-bootstrap/issues/46))


<a name"0.6.0"></a>
## 0.6.0 (2016-01-12)

#### Bug Fixes

* **FormElement:** Fixed select box for form layouts other than vertical, had wrong property assignments ([2c15ec2c](https://github.com/kaliber5/ember-bootstrap/commit/2c15ec2c))

#### Features

* **ProgressBar:** Added support for progress bars as native ember components
* **I18nSupport:** Removed I18nSupport mixin as this is not needed anymore with ember-i18n 4.x help ([a5ade3c1](https://github.com/kaliber5/ember-bootstrap/commit/a5ade3c1))


#### Breaking Changes

* If you rely on ember-bootstrap components to use the old ember-i18n TranslatableProperties mixin, you should update ember-i18n to the latest version and use the "t" helper to supply already translated strings to ember-bootstrap component properties in your templates.

 ([a5ade3c1](https://github.com/kaliber5/ember-bootstrap/commit/a5ade3c1))


<a name"0.5.1"></a>
### 0.5.1 (2016-01-04)


#### Bug Fixes

* **Modal:** closing a modal left backdrop element in DOM on IE9 ([0e24f351](https://github.com/kaliber5/ember-bootstrap/commit/0e24f351))
* Fixed bootstrap theme inclusion order, thanks to [huberts](https://github.com/huberts) ([PR#31](https://github.com/kaliber5/ember-bootstrap/pull/31))

#### Features

* **Modal:** implemented scrollbar layout adjustments when opening modals, like the original bootstrap.js modals ([3e28b099](https://github.com/kaliber5/ember-bootstrap/commit/3e28b099))


<a name"0.5.0"></a>
## 0.5.0 (2015-11-12)


#### Features

* **Modal:**
  * added bs-modal component and sub components for creating Bootstrap modal dialogs

<a name"0.4.1"></a>
### 0.4.1 (2015-10-31)

* **FormElement:**
  * Wire up <label> for attribute used in form-element component, thanks to [cyk](https://github.com/cyk) ([3ed081a](https://github.com/kaliber5/ember-bootstrap/commit/3ed081a400f8a83524339bb71eda2d027e01bc05))

<a name"0.4.0"></a>
## 0.4.0 (2015-09-22)

* **Collapse:**
  * added bs-collapse component for collapsible content ([794b52d5](https://github.com/kaliber5/ember-bootstrap/commit/794b52d5f6ad1c53e6a468590d69c269d33c1da5))
  * refactored bs-accordion-item to use bs-collapse internally ([58b0d868](https://github.com/kaliber5/ember-bootstrap/commit/58b0d868c58c2c5f29f6dcc99e1eccb357280b9e))

<a name"0.3.0"></a>
## 0.3.0 (2015-09-09)


#### Features

* **Accordion:**
  * added accordion components ([f2bbaca8](https://github.com/kaliber5/ember-bootstrap/commit/f2bbaca8))

<a name"0.2.0"></a>
## 0.2.0 (2015-08-14)


#### Features

* **Ember:** Updated components to be compatible with Ember 1.13 (thanks to [jesenko](https://github.com/jesenko)) and 2.0. *NOTE: Ember 1.13 is the minimum required version for ember-bootstrap 0.2.0 and above*
* **Tests:** Refactored all component tests to use the new integration test style
* **Select:** added Ember.Select replacement component ([19144085](https://github.com/kaliber5/ember-bootstrap/commit/19144085))

<a name"0.1.4"></a>
### 0.1.4 (2015-08-05)


#### Bug Fixes

* **Components.FormElement:** Wrong classes for horizontal layout forms (14) ([1caba612](https://github.com/kaliber5/ember-bootstrap/commit/1caba612))


<a name"0.1.3"></a>
### 0.1.3 (2015-07-07)


#### Bug Fixes

* **Ember:** Updated to Ember-cli 0.2.7, fixed deprecation warnings in Ember 1.13 ([1fc78c4](https://github.com/kaliber5/ember-bootstrap/commit/1fc78c41cfd4f7f72095825e14c813d62d772dae)) 
* **Ember:** Updated to Ember-cli 0.2.5 / Ember.js 1.12. Fixed test failures because of missi ([45e59f03](https://github.com/kaliber5/ember-bootstrap/commit/45e59f03))


#### Features

* **Form:** submitOnEnter submits the form when user presses enter, even if no submit button ([fcc9898b](https://github.com/kaliber5/ember-bootstrap/commit/fcc9898b))


<a name"0.1.2"></a>
### 0.1.2 (2015-04-22)

#### Features

* **I18n:** support for ember-i18n added: selected components support translateable properties

<a name"0.1.1"></a>
### 0.1.1 (2015-04-21)

#### Bug Fixes

* **FormGroup:** fixed wrong form group validation class in Ember 1.11 ([ff72909e](https://github.com/kaliber5/ember-bootstrap/commit/ff72909e))


<a name"0.1.0"></a>
## 0.1.0 (2015-04-17)

#### Features

New form classes to support creating powerful forms:

* **Form:** base form class
* **FormGroup:** component for Bootstrap form-group elements with validation rendering
* **FormElement:** extends FormGroup to implement automatic markup generation and model based validations

<a name"0.0.9"></a>
### 0.0.9 (2015-04-08)

#### Bug Fixes

* **ButtonGroup:**
  * initial value did not set active buttons properly

<a name"0.0.8"></a>
### 0.0.8 (2015-04-08)


#### Bug Fixes

* **ButtonGroup:**
  * fixed radio button being clicked twice to deactivate itself ([6175e12d](https://github.com/kaliber5/ember-bootstrap/commit/6175e12d))
  * fixed broken button group value added separate button page to dummy app ([2c2dafc0](https://github.com/kaliber5/ember-bootstrap/commit/2c2dafc0))
* **bower:** fixed missing bootstrap dependency in bower.json. Did not affect the host ember  ([5c00c2b9](https://github.com/kaliber5/ember-bootstrap/commit/5c00c2b9))

<a name"0.0.7"></a>
### 0.0.7 (2015-03-14)

#### Features

* **Dropdown:** new component for Bootstrap dropdowns

#### Misc

* Enhanced API docs, with custom theme
* Updated to ember-cli 0.2.0, ember.js 1.10

<a name"0.0.6"></a>
### 0.0.6 (2015-03-10)

* **Alert:** component for dismissible Bootstrap alerts

<a name"0.0.5"></a>
### 0.0.5 (2015-02-2)

* **ButtonGroup:** component for groups of Buttons, with radio and checkbox style toggling

<a name"0.0.4"></a>
### 0.0.4 (2015-01-25)

* Initial release