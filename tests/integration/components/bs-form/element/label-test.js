import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { testBS3, testNotBS3, testBS4, testBS5 } from '../../../../helpers/bootstrap';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../../../helpers/setup-no-deprecations';

module('Integration | Component | bs form/element/label', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`<BsForm::Element::Label />`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <BsForm::Element::Label>
        template block text
      </BsForm::Element::Label>
    `);

    assert.dom('*').hasText('template block text');
  });

  testBS3('label has control-label class', async function (assert) {
    await render(hbs`<BsForm::Element::Label />`);
    assert.dom('label').hasClass('control-label', 'label has control-label class');
  });

  testBS5('label has form-label class', async function (assert) {
    await render(hbs`<BsForm::Element::Label />`);
    assert.dom('label').hasClass('form-label', 'label has form-label class');
  });

  testNotBS3('label has col-form-label class when using horizontal forms', async function (assert) {
    await render(hbs`<BsForm::Element::Label @formLayout="horizontal" />`);
    assert.dom('label').hasClass('col-form-label', 'label has col-form-label class');
  });

  testNotBS3('label has form-check-label class when using control type checkbox', async function (assert) {
    await render(hbs`<BsForm::Element::Label @controlType="checkbox" />`);
    assert.dom('label').hasClass('form-check-label', 'label has form-check-label class');
  });

  testBS4('label has custom-control-label class when using control type switch', async function (assert) {
    await render(hbs`
      <BsForm as |form|>
        <form.element @label="Switch" @controlType="switch" />
      </BsForm>
    `);

    assert
      .dom('label')
      .hasClass('custom-control-label', 'label has custom-control-label class')
      .doesNotHaveClass('form-check-label', 'label does not have form-check-label class');
  });

  testNotBS3('support size classes when using horizontal forms', async function (assert) {
    await render(hbs`<BsForm::Element::Label @size="lg" @formLayout="horizontal" />`);
    assert.dom('label').hasClass('col-form-label-lg', 'label has large class');

    await render(hbs`<BsForm::Element::Label @size="sm" @formLayout="horizontal" />`);
    assert.dom('label').hasClass('col-form-label-sm', 'label has small class');

    await render(hbs`<BsForm::Element::Label @size="lg" />`);
    assert.dom('label').hasNoClass('col-form-label-lg', 'label does not have large class');

    await render(hbs`<BsForm::Element::Label @size="sm" />`);
    assert.dom('label').hasNoClass('col-form-label-sm', 'label does not have small class');
  });
});
