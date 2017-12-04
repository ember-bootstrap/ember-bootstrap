import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { formHelpTextClass } from '../../../../helpers/bootstrap-test';

module('Integration | Component | bs form/element/help text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders help text', async function(assert) {
    await render(hbs`
      {{bs-form/element/help-text text="foo bar"}}
    `);

    assert.dom('div').hasClass(formHelpTextClass());
    assert.dom('div').hasText('foo bar');
  });
});
