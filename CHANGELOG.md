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