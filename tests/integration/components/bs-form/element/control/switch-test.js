import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS4, testBS5 } from '../../../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/control/switch', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  testBS4('it renders', async function (assert) {
    await render(hbs`
      <BsForm as |form|>
        <form.element @controlType="switch" />
      </BsForm>
    `);

    assert.dom('input[type=checkbox]').hasClass('custom-control-input', 'component has custom-control-input class');
  });

  testBS5('it renders', async function (assert) {
    await render(hbs`
      <BsForm as |form|>
        <form.element @controlType="switch" />
      </BsForm>
    `);

    assert.dom('input[type=checkbox]').hasClass('form-check-input', 'component has form-check-input class');
  });
});
