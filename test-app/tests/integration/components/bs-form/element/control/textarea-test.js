import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../../../helpers/setup-no-deprecations';

module(
  'Integration | Component | bs form/element/control/textarea',
  function (hooks) {
    setupRenderingTest(hooks);
    setupNoDeprecations(hooks);

    test('it renders', async function (assert) {
      await render(hbs`<BsForm::Element::Control::Textarea />`);

      assert.dom('textarea').exists({ count: 1 });
    });
  },
);
