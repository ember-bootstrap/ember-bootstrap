import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { formHelpTextClass } from '../../../../helpers/bootstrap';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/help text', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders help text', async function (assert) {
    await render(hbs`<BsForm::Element::HelpText @text='foo bar' />`);

    assert.dom(`.${formHelpTextClass()}`).exists();
    assert.dom('*').hasText('foo bar');
  });
});
