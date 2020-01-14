import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-dropdown/button', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('dropdown button has correct default markup', async function(assert) {
    await render(hbs`<BsDropdown::Button>Test</BsDropdown::Button>`);

    assert.dom('button').exists('dropdown button is a button');
    assert.dom('.dropdown-toggle').exists('has dropdown-toggle class');
  });
});

