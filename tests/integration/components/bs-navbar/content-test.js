import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-navbar/content', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<BsNavbar::Content />`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <BsNavbar::Content>
        template block text
      </BsNavbar::Content>
    `);

    assert.dom('*').hasText('template block text');
  });

  test('it has correct markup', async function (assert) {
    await render(hbs`
      <BsNavbar::Content>
        Content
      </BsNavbar::Content>
    `);

    assert.dom('*').hasText('Content');
    assert.dom('.navbar-collapse').exists({ count: 1 }, 'there is only one element with the navbar-collapse class');
    assert
      .dom('.navbar-collapse')
      .hasClass('collapse', 'it has the collapse class indicating it derives from bs-collapse');
  });
});
