import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/control/textarea', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{bs-form/element/control/textarea}}`);

    assert.dom('textarea').exists({ count: 1 });
  });
});
