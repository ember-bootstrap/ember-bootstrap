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