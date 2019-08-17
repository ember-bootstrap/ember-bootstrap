import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-nav/item', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
    this.owner.setupRouter();
  });

  test('it has correct markup', async function(assert) {
    await render(hbs`
      {{#bs-nav/item}}
        template block text
      {{/bs-nav/item}}
    `);

    assert.dom('*').hasText('template block text', 'Shows block content');
    assert.dom('li').exists({ count: 1 }, 'it is an list item');
    assert.ok(!this.element.querySelector('li').classList.contains('active'), 'has not active class');
    assert.ok(!this.element.querySelector('li').classList.contains('disabled'), 'has not disabled class');

  });

  test('it does not have aria role="presentation"', async function(assert) {
    // Should not have role="presentation" even so Bootstrap 3 docs have it.
    // This was discussed at https://github.com/kaliber5/ember-bootstrap/pull/782.
    await render(hbs`{{bs-nav/item disabled=true}}`);

    assert.dom('li').doesNotHaveAttribute('role');
  });

  test('can be disabled', async function(assert) {
    await render(hbs`{{bs-nav/item disabled=true}}`);

    assert.dom('li').hasClass('disabled', 'has disabled class');
  });

  test('can be active', async function(assert) {
    await render(hbs`{{bs-nav/item active=true}}`);

    assert.dom('li').hasClass('active', 'has active class');
  });

  test('disabled link makes nav item disabled', async function(assert) {

    await render(hbs`
      {{#bs-nav/item}}
        {{#bs-nav/link-to "application" disabled=true}}Test{{/bs-nav/link-to}}
      {{/bs-nav/item}}
    `);
    assert.dom('li').hasClass('disabled', 'has disabled class');
  });

  test('clicking item calls onClick action', async function(assert) {
    let action = this.spy();
    this.actions.click = action;
    await render(hbs`{{bs-nav/item onClick=(action "click")}}`);
    await click('li');

    assert.ok(action.calledOnce, 'action has been called');
  });
});
