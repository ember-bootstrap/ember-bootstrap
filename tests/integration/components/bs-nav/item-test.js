import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { testBS4 } from '../../../helpers/bootstrap-test';

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

  test('[DEPRECATED] active link-to makes nav item active', async function(assert) {

    await render(hbs`
      {{#bs-nav/item}}
        {{#bs-nav/link-to "application" active="foo"}}Test{{/bs-nav/link-to}}
      {{/bs-nav/item}}
    `);
    assert.dom('li').hasClass('active', 'has active class');
    assert.deprecations();
  });

  test('[DEPRECATED] disabled link makes nav item disabled', async function(assert) {

    await render(hbs`
      {{#bs-nav/item}}
        {{#bs-nav/link-to "application" disabled="foo"}}Test{{/bs-nav/link-to}}
      {{/bs-nav/item}}
    `);
    assert.dom('li').hasClass('disabled', 'has disabled class');
    assert.deprecations();
  });

  test('clicking item calls onClick action', async function(assert) {
    let action = this.spy();
    this.actions.click = action;
    await render(hbs`{{bs-nav/item onClick=(action "click")}}`);
    await click('li');

    assert.ok(action.calledOnce, 'action has been called');
  });

  module('link', function() {
    test('simple route link', async function(assert) {
      await render(hbs`<BsNav::item @route="index" />`);

      assert.dom('li a').exists({ count: 1 });
      assert.dom('li a').hasAttribute('href', '/');
    });

    test('link with model', async function(assert) {
      await render(hbs`<BsNav::item @route="acceptance.link" @model="1" @query={{hash foo="bar"}} />`);

      assert.dom('li a').exists({ count: 1 });
      assert.dom('li a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    test('link with models', async function(assert) {
      await render(hbs`<BsNav::item @route="acceptance.link" @models={{array "1"}} @query={{hash foo="bar"}} />`);

      assert.dom('li a').exists({ count: 1 });
      assert.dom('li a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    testBS4('link has nav-link class', async function(assert) {
      await render(hbs`<BsNav::item @route="index" />`);

      assert.dom('li a').hasClass('nav-link');
    });

    test('disabled link', async function(assert) {
      await render(hbs`<BsNav::item @route="index" @disabled={{true}} />`);

      assert.dom('li a').hasClass('disabled');
    });
  });
});
