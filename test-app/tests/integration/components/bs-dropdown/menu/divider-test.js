import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/menu/divider', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it has correct markup', async function (assert) {
    // Template inline usage:
    await render(hbs`<BsDropdown::Menu::Divider />`);

    assert
      .dom('div')
      .hasClass('dropdown-divider', 'renders as <div> with correct class');
  });

  test('it support custom html attributes', async function (assert) {
    // Template inline usage:
    await render(hbs`<BsDropdown::Menu::Divider data-custom-html-attribute />`);

    assert
      .dom('div[data-custom-html-attribute]')
      .exists({ count: 1 }, 'renders as <div> with custom html attributes');
  });
});
