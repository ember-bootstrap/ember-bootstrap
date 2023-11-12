import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/menu/item', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it has correct markup', async function (assert) {
    // Template block usage:
    await render(hbs`<span>
  <BsDropdown::Menu::Item>
    template block text
  </BsDropdown::Menu::Item>
</span>`);

    assert.dom('span > div').doesNotExist('renders as no element');
    assert.dom('*').hasText('template block text');
  });
});
