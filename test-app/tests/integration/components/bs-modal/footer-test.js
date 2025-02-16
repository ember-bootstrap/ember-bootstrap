import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import { defaultButtonClass, test } from '../../../helpers/bootstrap';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { defer } from '../../../helpers/defer';
import sinon from 'sinon';

module('Integration | Component | bs-modal/footer', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Footer has close button', async function (assert) {
    const close = this.set('close', sinon.stub());

    await render(
      hbs`<BsModal::Footer @onClose={{this.close}} @closeTitle='close' />`,
    );
    await click('.modal-footer button');

    assert.dom('.modal-footer').exists({ count: 1 }, 'Modal footer exists.');
    assert
      .dom('.modal-footer button')
      .exists({ count: 1 }, 'Modal has button.');
    assert
      .dom('.modal-footer button')
      .hasClass('btn-primary', 'Button is a primary button.');
    assert.ok(
      this.element.querySelector('.modal-footer button').getAttribute('type'),
      'button',
      'Submit button is of type submit.',
    );
    assert
      .dom('.modal-footer button')
      .hasText('close', 'Button title is correct.');
    assert.strictEqual(close.callCount, 1, '@onClose is called exactly once');
  });

  test('Footer can have submit button', async function (assert) {
    const submit = this.set('submit', sinon.stub());

    await render(
      hbs`<BsModal::Footer
  @onSubmit={{this.submit}}
  @closeTitle='close'
  @submitTitle='submit'
/>`,
    );
    await click('.modal-footer button:last-child');

    assert
      .dom('.modal-footer button')
      .exists({ count: 2 }, 'Modal footer has two button.');
    assert
      .dom('.modal-footer button:first-child')
      .hasClass(defaultButtonClass(), 'Close button is a default button.');
    assert.ok(
      this.element
        .querySelector('.modal-footer button:first-child')
        .getAttribute('type'),
      'button',
      'Submit button is of type submit.',
    );
    assert
      .dom('.modal-footer button:first-child')
      .hasText('close', 'Close button title is correct.');
    assert
      .dom('.modal-footer button:last-child')
      .hasClass('btn-primary', 'Submit button is a primary button.');
    assert.ok(
      this.element
        .querySelector('.modal-footer button:last-child')
        .getAttribute('type'),
      'submit',
      'Submit button is of type submit.',
    );
    assert
      .dom('.modal-footer button:last-child')
      .hasText('submit', 'Submit button title is correct.');
    assert.strictEqual(submit.callCount, 1, '@onSubmit is called exactly once');
  });

  test('Footer submit button gets disabled when `onSubmit` returns a pending promise', async function (assert) {
    const { promise, resolve } = defer();
    const submit = this.set('submit', sinon.stub().returns(promise));

    await render(
      hbs`<BsModal::Footer
  @onSubmit={{this.submit}}
  @closeTitle='close'
  @submitTitle='submit'
/>`,
    );
    await click('.modal-footer button:last-child');
    assert
      .dom('.modal-footer button:last-child')
      .isDisabled('Submit button is disabled');

    resolve();
    await settled();
    assert
      .dom('.modal-footer button:last-child')
      .isNotDisabled('Submit button is active');

    assert.strictEqual(submit.callCount, 1, '@onSubmit is called exactly once');
  });

  test('Footer can have a custom submitButtonType', async function (assert) {
    await render(
      hbs`<BsModal::Footer
  @closeTitle='close'
  @submitTitle='submit'
  @submitButtonType='danger'
/>`,
    );
    assert
      .dom('.modal-footer button:last-child')
      .hasClass('btn-danger', 'Submit button is a danger button.');
  });

  test('Footer can have custom block content', async function (assert) {
    await render(
      hbs`<BsModal::Footer
  @closeTitle='close'
  @submitTitle='submit'
>custom</BsModal::Footer>`,
    );

    assert
      .dom('.modal-footer button')
      .doesNotExist('Modal footer has no buttons.');
    assert.dom('.modal-footer').hasText('custom', 'Block content is shown.');
  });

  test('submitDisabled disables submit button', async function (assert) {
    this.set('disabled', true);
    await render(
      hbs`<BsModal::Footer
  @closeTitle='close'
  @submitTitle='submit'
  @submitDisabled={{this.disabled}}
/>`,
    );

    assert
      .dom('.modal-footer button')
      .exists({ count: 2 }, 'Modal footer has two button.');
    assert.notOk(
      this.element.querySelector('.modal-footer button:first-child').disabled,
      'Close button is not disabled.',
    );
    assert.ok(
      this.element.querySelector('.modal-footer button:last-child').disabled,
      'Submit button is disabled.',
    );

    this.set('disabled', false);

    assert.notOk(
      this.element.querySelector('.modal-footer button:last-child').disabled,
      'Submit button is not disabled.',
    );
  });
});
