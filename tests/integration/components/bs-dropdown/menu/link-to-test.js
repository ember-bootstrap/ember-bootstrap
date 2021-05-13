import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testNotBS3 } from '../../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/menu/link-to', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.owner.setupRouter();
  });

  testBS3('it has correct markup', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-dropdown/menu/link-to "index"}}
        template block text
      {{/bs-dropdown/menu/link-to}}
    `);

    assert.dom('*').hasText('template block text');
    assert.dom('a.dropdown-item').doesNotExist('renders as plain element with no dropdown item class');
  });

  testNotBS3('it has correct markup', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#bs-dropdown/menu/link-to "index"}}
        template block text
      {{/bs-dropdown/menu/link-to}}
    `);

    assert.dom('*').hasText('template block text');
    assert.dom('a.dropdown-item').exists({ count: 1 }, 'renders as plain element with dropdown item class');
  });

  module('positional params', function () {
    test('simple route link', async function (assert) {
      await render(hbs`{{#bs-dropdown/menu/link-to "index"}}Link{{/bs-dropdown/menu/link-to}}`);

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasText('Link');
      assert.dom('a').hasAttribute('href', '/');
    });

    test('link with model', async function (assert) {
      await render(
        hbs`{{#bs-dropdown/menu/link-to "acceptance.link" "1" (query-params foo="bar")}}Link{{/bs-dropdown/menu/link-to}}`
      );

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    test('disabled link', async function (assert) {
      await render(hbs`{{#bs-dropdown/menu/link-to "index" disabled=true}}Link{{/bs-dropdown/menu/link-to}}`);

      assert.dom('a').hasClass('disabled');
    });
  });

  module('<LinkTo> properties', function (hooks) {
    setupNoDeprecations(hooks);

    test('simple route link', async function (assert) {
      await render(hbs`<BsDropdown::menu::link-to @route="index">Link</BsDropdown::menu::link-to>`);

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasText('Link');
      assert.dom('a').hasAttribute('href', '/');
    });

    test('link with model', async function (assert) {
      await render(
        hbs`<BsDropdown::menu::link-to @route="acceptance.link" @model="1" @query={{hash foo="bar"}}>Link</BsDropdown::menu::link-to>`
      );

      assert.dom('a').exists({ count: 1 });
      assert.dom('a').hasAttribute('href', '/acceptance/link/1?foo=bar');
    });

    test('disabled link', async function (assert) {
      await render(hbs`<BsDropdown::menu::link-to @route="index" @disabled={{true}}>Link</BsDropdown::menu::link-to>`);

      assert.dom('a').hasClass('disabled');
    });
  });
});
