import { find, findAll, click } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-alert', 'Integration | Component | bs-alert', {
  integration: true
});

test('alert has correct CSS classes', function(assert) {
  this.render(hbs`{{#bs-alert type="success" dismissible=true}}Test{{/bs-alert}}`);

  assert.equal(find(':first-child').classList.contains('alert'), true, 'alert has alert class');
  assert.equal(find(':first-child').classList.contains('alert-success'), true, 'alert has type class');
  assert.equal(find(':first-child').classList.contains('alert-dismissible'), true, 'alert has dismissible class');
});

test('dismissible alert can be hidden by clicking close button with fade=false', async function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=false}}Test{{/bs-alert}}`);

  assert.equal(findAll('button.close').length, 1, 'alert has close button');
  await click('button.close');

  assert.equal(find(':first-child').classList.contains('alert'), false, 'alert has no alert class');
  assert.equal(find(':first-child').textContent.trim(), '', 'alert has no content');

});

test('dismissible alert can be hidden by clicking close button with fade=true', async function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=true}}Test{{/bs-alert}}`);

  assert.equal(findAll('button.close').length, 1, 'alert has close button');
  let promise = click('button.close');

  assert.equal(find(':first-child').classList.contains('alert'), true, 'alert has alert class');
  assert.equal(find(':first-child').classList.contains('in'), false, 'alert has no in class');

  await promise;
  assert.equal(find(':first-child').classList.contains('alert'), false, 'alert has no alert class');
  assert.equal(find(':first-child').textContent.trim(), '', 'alert has no content');
});

test('alert can be hidden by setting visible property', function(assert) {
  this.set('visible', true);
  this.render(hbs`{{#bs-alert type="success" fade=false visible=visible}}Test{{/bs-alert}}`);

  this.set('visible', false);

  assert.equal(find(':first-child').classList.contains('alert'), false, 'alert has no alert class');
  assert.equal(find(':first-child').textContent.trim(), '', 'alert has no content');

});

test('onDismiss is called when clicking the close button', async function(assert) {
  let action = this.spy();
  this.on('dismiss', action);
  this.render(hbs`{{#bs-alert type="success" fade=false onDismiss=(action "dismiss")}}Test{{/bs-alert}}`);
  await click('button.close');
  assert.ok(action.calledOnce, 'onDismiss has been called.');
});

test('alert is not hidden after clicking the close button when onDismiss action return false', async function(assert) {
  let action = this.stub();
  action.returns(false);
  this.on('dismiss', action);
  this.render(hbs`{{#bs-alert type="success" fade=false onDismiss=(action "dismiss")}}Test{{/bs-alert}}`);
  await click('button.close');
  assert.ok(action.calledOnce, 'onDismiss has been called.');

  assert.equal(find(':first-child').classList.contains('alert'), true, 'alert is still visible');
});

test('onDismissed is called after modal is closed', async function(assert) {
  let action = this.spy();
  this.on('dismissed', action);
  this.render(hbs`{{#bs-alert type="success" fade=false onDismissed=(action "dismissed")}}Test{{/bs-alert}}`);
  await click('button.close');
  assert.ok(action.calledOnce, 'onDismissed has been called.');
});

test('alert is initially hidden when visible=false', function(assert) {
  this.render(hbs`{{#bs-alert type="success" fade=false visible=false}}Test{{/bs-alert}}`);

  assert.equal(find(':first-child').classList.contains('alert'), false, 'alert has no alert class');
  assert.equal(find(':first-child').textContent.trim(), '', 'alert has no content');
});

test('alert can be made visible when setting visible=true', function(assert) {
  this.set('visible', false);
  this.render(hbs`{{#bs-alert type="success" visible=visible fade=false}}Test{{/bs-alert}}`);
  this.set('visible', true);

  assert.equal(find(':first-child').classList.contains('alert'), true, 'alert has alert class');
  assert.equal(find(':first-child').classList.contains('alert-success'), true, 'alert has type class');
});

test('dismissing alert does not change public visible property (DDAU)', async function(assert) {
  this.set('visible', true);
  this.render(hbs`{{#bs-alert type="success" visible=visible fade=false}}Test{{/bs-alert}}`);

  await click('button.close');

  assert.equal(this.get('visible'), true, 'Does not modify visible property');
});