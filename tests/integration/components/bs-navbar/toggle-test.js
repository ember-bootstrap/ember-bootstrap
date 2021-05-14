import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { test, testBS3, testNotBS3, versionDependent } from '../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-navbar/toggle', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS3('it renders inline usage', async function (assert) {
    await render(hbs`<BsNavbar::Toggle />`);

    assert.dom('*').hasText('Toggle navigation');
  });

  testNotBS3('it renders inline usage', async function (assert) {
    await render(hbs`<BsNavbar::Toggle />`);

    assert.dom('.navbar-toggler > span').hasClass('navbar-toggler-icon');
  });

  test('it renders block usage', async function (assert) {
    await render(hbs`
      <BsNavbar::Toggle>
        template block text
      </BsNavbar::Toggle>
    `);

    assert.dom('*').hasText('template block text');
  });

  test('it has correct markup', async function (assert) {
    await render(hbs`<BsNavbar::Toggle />`);

    assert.dom('button').exists({ count: 1 }, 'there is exactly one button element');
    assert
      .dom('button')
      .hasClass(versionDependent('navbar-toggle', 'navbar-toggler'), 'the toggle has the appropriate toggle class');
    assert.dom('button').hasClass('collapsed', 'the toggle has the collapsed class');
    assert.dom('button').doesNotHaveClass('btn', 'the toggle is a simple button without .btn');
  });
});
