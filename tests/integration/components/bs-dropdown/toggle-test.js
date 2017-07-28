import { click, find } from 'ember-native-dom-helpers';
import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-dropdown/toggle', 'Integration | Component | bs-dropdown/toggle', {
  integration: true
});

test('toggle has correct default markup', function(assert) {
  this.render(hbs`{{#bs-dropdown/toggle}}Test{{/bs-dropdown/toggle}}`);

  assert.equal(find(':first-child').tagName, 'A', 'toggle is an anchor tag by default');
  assert.equal(find(':first-child').getAttribute('href'), '#', 'has href attribute');
  assert.equal(find(':first-child').classList.contains('dropdown-toggle'), true, 'has dropdown-toggle class');
  assert.equal(find(':first-child').getAttribute('role'), 'button', 'has role=button');
});

test('toggle as button does not have href', function(assert) {
  this.render(hbs`{{#bs-dropdown/toggle tagName="button"}}Test{{/bs-dropdown/toggle}}`);

  assert.equal(find(':first-child').tagName, 'BUTTON', 'toggle is a button');
  assert.notOk(find(':first-child').hasAttribute('href'), 'does not have href attribute');
});

test('clicking toggle sends onClick action', async function(assert) {
  let action = this.spy();
  this.on('click', action);
  this.render(hbs`{{#bs-dropdown/toggle onClick=(action "click")}}Test{{/bs-dropdown/toggle}}`);
  await click('a');
  assert.ok(action.calledOnce, 'onClick action has been called.');
});

