import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-navbar/nav', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<BsNavbar::Nav />`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <BsNavbar::Nav>
        template block text
      </BsNavbar::Nav>
    `);

    assert.dom('*').hasText('template block text');
  });

  test('it has correct markup', async function (assert) {
    await render(hbs`
      <BsNavbar::Nav>
        Nav
      </BsNavbar::Nav>
    `);

    assert.dom('*').hasText('Nav');
    assert
      .dom('.navbar-nav')
      .exists({ count: 1 }, 'there is only one element with the navbar-nav class');
    assert
      .dom('.navbar-nav')
      .hasClass('nav', 'it has the nav class indicating it derives from bs-nav');
  });

  test('it no longer supports the justified option', async function (assert) {
    await render(hbs`<BsNavbar::Nav @justified={{true}} />`);

    assert.dom('.navbar-justified').doesNotExist('the justified class was not applied');
  });
});
