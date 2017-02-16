import { moduleForComponent } from 'ember-qunit';
import { formFeedbackClass, test, testBS3, testBS4 } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-form', 'Integration | Component | bs-form', {
  integration: true
});

testBS3('form has correct CSS class', function(assert) {
  this.render(hbs`{{#bs-form formLayout=formLayout}}Test{{/bs-form}}`);

  let classSpec = {
    vertical: 'form',
    horizontal: 'form-horizontal',
    inline: 'form-inline'
  };

  for (let layout in classSpec) {
    this.set('formLayout', layout);
    assert.equal(this.$('form').hasClass(classSpec[layout]), true, `form has expected class for ${layout}`);
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
    assert.equal(this.$('form').hasClass(expectation[0]), expectation[1], `form has expected markup for ${layout}`);
  }
});

test('it yields form element component', function(assert) {
  this.render(hbs`{{#bs-form as |form|}}{{form.element}}{{/bs-form}}`);

  assert.equal(this.$('.form-group').length, 1, 'form has element');
});

test('Submitting the form calls onBeforeSubmit and onSubmit action', function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.render(hbs`{{#bs-form model=model onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid")}}Test{{/bs-form}}`);

  this.$('form').submit();
  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(submit.calledWith(model), 'onSubmit action has been called with model as parameter');
  assert.notOk(invalid.called, 'onInvalid action has not been called');
});

test('Submitting the form with valid validation calls onBeforeSubmit and onSubmit action', function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.set('validateStub', function() {
    return Ember.RSVP.resolve('SUCCESS');
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`);

  this.$('form').submit();
  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(submit.calledWith(model, 'SUCCESS'), 'onSubmit action has been called with model and validation result as parameter');
  assert.notOk(invalid.called, 'onInvalid action has not been called');
});

test('Submitting the form with invalid validation calls onBeforeSubmit and onInvalid action', function(assert) {
  let submit = this.spy();
  let before = this.spy();
  let invalid = this.spy();
  let model = {};
  this.set('model', model);
  this.on('before', before);
  this.on('submit', submit);
  this.on('invalid', invalid);
  this.set('validateStub', function() {
    return Ember.RSVP.reject('ERROR');
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub onBefore=(action "before") onSubmit=(action "submit") onInvalid=(action "invalid") as |form|}}Test{{/bs-form}}`);

  this.$('form').submit();

  assert.ok(before.calledWith(model), 'onBefore action has been called with model as parameter');
  assert.ok(invalid.calledWith(model, 'ERROR'), 'onInvalid action has been called with model and validation result');
  assert.notOk(submit.called, 'onSubmit action has not been called');
});

test('Submitting the form with invalid validation shows validation errors', function(assert) {
  let model = {};
  this.set('model', model);
  this.set('errors', Ember.A(['There is an error']));
  this.set('validateStub', function() {
    return Ember.RSVP.reject();
  });
  this.render(hbs`{{#bs-form model=model hasValidator=true validate=validateStub as |form|}}{{form.element hasValidator=true errors=errors}}{{/bs-form}}`);

  assert.notOk(
    this.$('form .form-group').hasClass('has-error'),
    'validation errors aren\'t shown before user interaction'
  );
  this.$('form').submit();

  let done = assert.async();
  setTimeout(() => {
    assert.ok(
      this.$('form .form-group').hasClass('has-error'),
      'validation errors are shown after form submission'
    );
    assert.equal(
      this.$(`form .form-group .${formFeedbackClass()}`).text().trim(),
      'There is an error'
    );
    done();
  }, 1);

});

test('Adds default onChange action to form elements that updates model\'s property', function(assert) {
  let model = Ember.Object.create({
    name: 'foo'
  });
  this.set('model', model);
  this.render(hbs`{{#bs-form model=model as |form|}}
    {{form.element property="name"}}
  {{/bs-form}}`);

  assert.equal(this.$('input').val(), 'foo', 'input has model property value');

  this.$('input').val('bar').trigger('input');
  assert.equal(model.get('name'), 'bar', 'model property was updated');
});

test('Pressing enter on a form with submitOnEnter submits the form', function(assert) {
  let submit = this.spy();
  this.on('submit', submit);
  this.render(hbs`{{#bs-form onSubmit=(action "submit") submitOnEnter=true}}Test{{/bs-form}}`);
  let e = new Ember.$.Event('keypress');
  e.which = e.keyCode = 13;
  this.$('form').trigger(e);
  assert.ok(submit.calledOnce, 'onSubmit action has been called');
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
