import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';

module('Integration | Component | bs-progress/bar', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('has correct markup', async function(assert) {
    await render(hbs`
      {{bs-progress/bar}}
    `);

    assert.dom('div.progress-bar').exists({ count: 1 }, 'Has progress-bar class');

  });
});
