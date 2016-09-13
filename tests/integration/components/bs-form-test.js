import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
// import EmberValidations from 'ember-validations';

moduleForComponent('bs-form', 'Integration | Component | bs-form', {
  integration: true
});

test('form has correct CSS class', function(assert) {
  this.render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);

  let classSpec = {
    vertical: 'form',
    horizontal: 'form-horizontal',
    inline: 'form-inline'
  };

  for (let layout in classSpec) {
    this.set('formLayout', layout);
    assert.equal(this.$('form').hasClass(classSpec[layout]), true, 'form has expected class.');
  }
});

test('Submitting the form calls default action', function(assert) {
  let model = {};
  this.set('model', model)
  this.on('testAction', (m) => {
    assert.ok(true, 'Default action has been called.');
    assert.equal(m, model, 'Action invocation has model as parameter');
  });
  this.render(hbs`{{#bs-form model=model action=(action "testAction")}}Test{{/bs-form}}`);

  assert.expect(2);
  this.$('form').submit();
});

test('Submitting the form calls before submit action', function(assert) {
  let model = {};
  this.set('model', model)
  this.on('beforeAction', (m) => {
    assert.ok(true, 'Before action has been called.');
    assert.equal(m, model, 'Action invocation has model as parameter');
  });
  this.on('submitAction', (m) => {
    assert.ok(true, 'Default action has been called.');
    assert.equal(m, model, 'Action invocation has model as parameter');
  });
  this.render(hbs`{{#bs-form model=model before=(action "beforeAction") action=(action "submitAction")}}Test{{/bs-form}}`);

  assert.expect(4);
  this.$('form').submit();
});

/*

 Cannot test validations as expected in unit tests.
 See https://github.com/dockyard/ember-validations/issues/247

 test('Submitting the form with successful validation calls default action', function(assert) {
 var testController = Ember.Controller.extend({
 actions: {
 success: function() {
 ok(true, 'Default action has been called.');
 },
 error: function() {
 ok(false, 'Invalid action must not be called.');
 }
 }
 }).create(),
 model = Ember.Object.extend(EmberValidations,{
 test: 'someValue',
 validations: {
 test: {
 presence: true
 }
 }
 }).create(),
 component = this.subject({
 targetObject: testController,
 action: 'success',
 invalid: 'error',
 model: model
 });

 expect(1);

 this.$().submit();
 });




 test('Submitting the form with invalid validation calls invalid action', function(assert) {
 var testController = Ember.Controller.extend({
 actions: {
 success: function() {
 ok(false, 'Default action must not be called.');
 },
 error: function() {
 ok(true, 'Invalid action has been called called.');
 }
 }
 }).create(),
 model = Ember.Object.extend(EmberValidations,{
 test: null,
 validations: {
 test: {
 presence: true
 }
 }
 }).create(),
 component = this.subject({
 targetObject: testController,
 action: 'success',
 invalid: 'error',
 model: model
 });

 expect(1);

 this.$().submit();
 });

 */

test('Pressing enter on a form with submitOnEnter submits the form', function(assert) {
  this.on('testAction', () => {
    assert.ok(true, 'Default action has been called.');
  });
  this.render(hbs`{{#bs-form action=(action "testAction") submitOnEnter=true}}Test{{/bs-form}}`);
  let e = Ember.$.Event('keypress');
  e.which = e.keyCode = 13;
  assert.expect(1);

  this.$('form').trigger(e);
});

test('supports novalidate attribute', function(assert) {
  assert.expect(2);
  this.render(hbs`{{bs-form}}`);
  assert.ok(
    this.$('form').attr('novalidate') === undefined,
    'defaults to false'
  );
  this.render(hbs`{{bs-form novalidate=true}}`);
  assert.ok(
    this.$('form').attr('novalidate') === ''
  );
});

// test('shows validation errors on submit', function(assert) {
//   assert.expect(3);
//   this.set('model',
//     Ember.Object.extend(EmberValidations, {
//       name: null,
//       validations: {
//         name: {
//           presence: true
//         }
//       }
//     }).create({
//       container: this.get('container')
//     })
//   );
//   this.render(hbs`
//     {{#bs-form model=model}}
//       {{bs-form-element property='name' classNames='child'}}
//       {{#dummy-component}}
//         {{bs-form-element property='name' classNames='grandchild'}}
//       {{/dummy-component}}
//     {{/bs-form}}
//   `);
//   assert.ok(
//     this.$('form .has-error').length === 0,
//     'validation errors aren\'t shown before user interaction'
//   );
//   Ember.run(() => {
//     this.$('form').submit();
//   });
//   assert.ok(
//     this.$('form .form-group.child').hasClass('has-error'),
//     'validation errors are shown after form submission (child)'
//   );
//   assert.ok(
//     this.$('form .form-group.grandchild').hasClass('has-error'),
//     'validation errors are shown after form submission (grandchild)'
//   );
// });
