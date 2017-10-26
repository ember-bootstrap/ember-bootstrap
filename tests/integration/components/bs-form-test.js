import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { resolve, reject } from 'rsvp';
import {
  click,
  findAll,
  find,
  fillIn,
  keyEvent,
  triggerEvent
} from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import {
  formFeedbackClass,
  test,
  testRequiringFocus,
  testBS3,
  testBS4,
  validationErrorClass,
  formFeedbackElement
} from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-form', 'Integration | Component | bs-form', {
  integration: true
});

testBS3('form has correct CSS class', function(assert) {

  let classSpec = {
    vertical: 'form',
    horizontal: 'form-horizontal',
    inline: 'form-inline'
  };

  for (let layout in classSpec) {
    this.set('formLayout', layout);
    this.render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);
    assert.equal(find('form').classList.contains(classSpec[layout]), true, `form has expected class for ${layout}`);
  }
});

testBS4('form has correct markup', function(assert) {
  this.render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);

  let classSpec = {
    vertical: ['form', false],
    horizontal: ['form-horizontal', false],
    inline: ['form-inline', true]
  };

  for (let layout in classSpec) {
    this.set('formLayout', layout);
    let expectation = classSpec[layout];
    assert.equal(find('form').classList.contains(expectation[0]), expectation[1], `form has expected markup for ${layout}`);
  }
});

test('it yields form element component', function(assert) {
  this.render(hbs`{{#bs-form as |form|}}{{form.element}}{{/bs-form}}`);

  assert.equal(findAll('.form-group').length, 1, 'form has element');
});

test('Submitting the form calls onBeforeSubmit and onSubmit action', async function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.render(hbs`{{#bs-form model=model onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid")}}Test{{/bs-form}}`);

  await triggerEvent('form', 'submit');
  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(submit.calledWith(model), 'onSubmit action has been called with model as parameter');
  assert.notOk(invalid.called, 'onInvalid action has not been called');
});

test('Clicking a submit button submits the form', async function(assert) {
  let submit = this.spy();
  this.on('submit', submit);
  this.render(hbs`{{#bs-form onSubmit=(action "submit")}}{{#bs-button buttonType="submit"}}Submit{{/bs-button}}{{/bs-form}}`);

  await click('button');
  assert.ok(submit.called, 'onSubmit action has been called');
});

test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', async function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.set('validateStub', function() {
    return resolve('SUCCESS');
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`);

  await triggerEvent('form', 'submit');
  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(submit.calledWith(model, 'SUCCESS'), 'onSubmit action has been called with model and validation result as parameter');
  assert.notOk(invalid.called, 'onInvalid action has not been called');
});

test('Submitting the form with invalid validation calls onBeforeSubmit and onInvalid action', async function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.set('validateStub', function() {
    return reject('ERROR');
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`);

  await triggerEvent('form', 'submit');

  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(invalid.calledWith(model, 'ERROR'), 'onInvalid action has been called with model and validation result');
  assert.notOk(submit.called, 'onSubmit action has not been called');
});

test('Submitting the form with invalid validation shows validation errors', async function(assert) {
  let model = {};
  this.set('model', model);
  this.set('errors', A(['There is an error']));
  this.set('validateStub', function() {
    return reject();
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub as |form|}}{{form.element hasValidator=true errors=errors}}{{/bs-form}}`);

  assert.notOk(
    find(formFeedbackElement()).classList.contains(validationErrorClass()),
    'validation errors aren\'t shown before user interaction'
  );
  await triggerEvent('form', 'submit');

  let done = assert.async();
  setTimeout(() => {
    assert.ok(
      find(formFeedbackElement()).classList.contains(validationErrorClass()),
      'validation errors are shown after form submission'
    );
    assert.equal(
      find(`.${formFeedbackClass()}`).textContent.trim(),
      'There is an error'
    );
    done();
  }, 1);

});

test('Adds default onChange action to form elements that updates model\'s property', async function(assert) {
  let model = EmberObject.create({
    name: 'foo'
  });
  this.set('model', model);
  this.render(hbs`{{#bs-form model=model as |form|}}
    {{form.element property="name"}}
  {{/bs-form}}`);

  assert.equal(find('input').value, 'foo', 'input has model property value');

  await fillIn('input', 'bar');
  await triggerEvent('input', 'input');
  assert.equal(model.get('name'), 'bar', 'model property was updated');
});

testRequiringFocus('Pressing enter on a form with submitOnEnter submits the form', async function(assert) {
  let submit = this.spy();
  this.on('submit', submit);
  this.render(hbs`{{#bs-form onSubmit=(action "submit") submitOnEnter=true as |form|}}{{/bs-form}}`);
  await keyEvent('form', 'keypress', 13);
  assert.ok(submit.calledOnce, 'onSubmit action has been called');
});

test('supports novalidate attribute', function(assert) {
  assert.expect(2);
  this.render(hbs`{{bs-form}}`);
  assert.equal(
    find('form').getAttribute('novalidate'),
    null,
    'defaults to false'
  );
  this.render(hbs`{{bs-form novalidate=true}}`);
  assert.ok(
    find('form').getAttribute('novalidate') === ''
  );
});
