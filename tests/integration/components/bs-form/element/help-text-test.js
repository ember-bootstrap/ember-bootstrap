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

    assert.dom(`.${formHelpTextClass()}`).exists();
    assert.dom('*').hasText('foo bar');
  });
});
