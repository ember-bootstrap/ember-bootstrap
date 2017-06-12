import { find, click } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import { test, defaultButtonClass } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('bs-button', 'Integration | Component | bs-button', {
  integration: true
});

test('button has correct default markup', function(assert) {
  this.render(hbs`{{#bs-button}}Test{{/bs-button}}`);

  assert.equal(find('button').classList.contains('btn'), true, 'button has btn class');
  assert.equal(find('button').classList.contains(defaultButtonClass()), true, 'button has type class');
});

test('button has correct size', function(assert) {
  this.render(hbs`{{#bs-button size="lg"}}Test{{/bs-button}}`);

  assert.equal(find('button').classList.contains('btn-lg'), true, 'button has size class');
});

test('button has correct type', function(assert) {
  this.render(hbs`{{#bs-button type="primary"}}Test{{/bs-button}}`);

  assert.equal(find('button').classList.contains('btn'), true, 'button has btn class');
  assert.equal(find('button').classList.contains('btn-primary'), true, 'button has type class');
});

test('button can be active', function(assert) {
  this.render(hbs`{{#bs-button active=true}}Test{{/bs-button}}`);

  assert.equal(find('button').classList.contains('active'), true, 'button has active class');
});

test('button can be block', function(assert) {
  this.render(hbs`{{#bs-button block=true}}Test{{/bs-button}}`);

  assert.equal(find('button').classList.contains('btn-block'), true, 'button has block class');
});

test('button has HTML attributes', function(assert) {
  this.render(hbs`{{#bs-button id="test" disabled=true title="title"}}Test{{/bs-button}}`);

  assert.equal(find('button').getAttribute('id'), 'test');
  assert.equal(find('button').getAttribute('disabled'), '');
  assert.equal(find('button').getAttribute('title'), 'title');
});

test('button has default label', function(assert) {
  this.render(hbs`{{bs-button defaultText="test"}}`);
  assert.equal(find('button').textContent, 'test');
});

test('button has default type "button"', function(assert) {
  this.render(hbs`{{bs-button}}`);
  assert.equal(find('button').type, 'button');
});

test('buttonType property allows changing button type', function(assert) {
  this.render(hbs`{{bs-button buttonType="submit"}}`);
  assert.equal(find('button').type, 'submit');
});

test('button with icon property shows icon', function(assert) {
  this.render(hbs`{{bs-button icon="fa fa-check"}}`);

  assert.equal(find('button i').classList.contains('fa'), true);
  assert.equal(find('button i').classList.contains('fa-check'), true);
});

test('button with iconActive and iconInactive properties shows icon depending on active state', function(assert) {
  this.set('active', false);
  this.render(hbs`{{bs-button active=active iconInactive="fa fa-plus" iconActive="fa fa-minus"}}`);

  assert.equal(find('button i').classList.contains('fa'), true);
  assert.equal(find('button i').classList.contains('fa-plus'), true);

  this.set('active', true);

  assert.equal(find('button i').classList.contains('fa'), true);
  assert.equal(find('button i').classList.contains('fa-minus'), true);

  this.set('active', false);

  assert.equal(find('button i').classList.contains('fa'), true);
  assert.equal(find('button i').classList.contains('fa-plus'), true);
});

test('clicking a button sends onClick action with "value" property as a parameter', async function(assert) {
  let action = this.spy();
  this.on('testAction', action);
  this.render(hbs`{{bs-button onClick=(action "testAction") value="dummy"}}`);

  await click('button');
  assert.ok(action.calledWith('dummy'), 'onClick action has been called with button value');
});

test('button text is changed according to button state', function(assert) {

  this.render(hbs`{{bs-button defaultText="text1" loadingText="text2" textState=textState}}`);
  assert.equal(find('button').textContent, 'text1');

  this.set('textState', 'loading');

  assert.equal(find('button').textContent, 'text2');

  this.set('textState', 'default');

  assert.equal(find('button').textContent, 'text1');
});

test('setting reset to true resets button state', function(assert) {
  this.render(hbs`{{bs-button defaultText="text1" loadingText="text2" textState=textState reset=reset}}`);
  this.set('textState', 'loading');

  assert.equal(find('button').textContent, 'text2');

  this.set('reset', true);

  assert.equal(find('button').textContent, 'text1');
});

test('clicking a button sends onclick action, if promise is returned from closure action button state is changed according to promise state', async function(assert) {
  let promise, resolvePromise;

  this.on('testAction', () => {
    promise = new Ember.RSVP.Promise(function(resolve) {
      resolvePromise = resolve;
    });
    return promise;
  });

  this.render(hbs`{{bs-button onClick=(action "testAction") textState=textState defaultText="default" pendingText="pending" resolvedText="resolved" rejectedText="rejected"}}`);

  assert.expect(2);
  await click('button');
  assert.equal(find('button').textContent, 'pending');

  Ember.run(resolvePromise);

  assert.equal(find('button').textContent, 'resolved');

});

test('clicking a button with onClick action will prevent event to bubble up', async function(assert) {
  let buttonClick = this.spy();
  this.on('buttonClick', buttonClick);
  let parentClick = this.spy();
  this.on('parentClick', parentClick);

  this.render(hbs`<div {{action "parentClick"}}>{{#bs-button onClick=(action "buttonClick")}}Button{{/bs-button}}</div>`);

  await click('button');
  assert.ok(buttonClick.called);
  assert.notOk(parentClick.called);
});

test('clicking a button without onClick action will cause event to bubble up', async function(assert) {
  let parentClick = this.spy();
  this.on('parentClick', parentClick);

  this.render(hbs`<div {{action "parentClick"}}>{{#bs-button}}Button{{/bs-button}}</div>`);

  await click('button');
  assert.ok(parentClick.called);
});
