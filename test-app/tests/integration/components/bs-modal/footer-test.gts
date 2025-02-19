import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import { defaultButtonClass, test } from '../../../helpers/bootstrap';
import setupNoDeprecations from '../../../helpers/setup-no-deprecations';
import { defer } from '../../../helpers/defer';
import sinon from 'sinon';
import BsModalFooter from 'ember-bootstrap/components/bs-modal/footer';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | bs-modal/footer', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('Footer has close button', async function (assert) {
    const close = sinon.stub();

    await render(
      <template>
        <BsModalFooter @onClose={{close}} @closeTitle='close' />
      </template>,
    );
    await click('.modal-footer button');

    assert.dom('.modal-footer').exists({ count: 1 }, 'Modal footer exists.');
    assert
      .dom('.modal-footer button')
      .exists({ count: 1 }, 'Modal has button.');
    assert
      .dom('.modal-footer button')
      .hasClass('btn-primary', 'Button is a primary button.');
    assert
      .dom('.modal-footer button')
      .hasProperty('type', 'button', 'Submit button is of type submit.');
    assert
      .dom('.modal-footer button')
      .hasText('close', 'Button title is correct.');
    assert.strictEqual(close.callCount, 1, '@onClose is called exactly once');
  });

  test('Footer can have submit button', async function (assert) {
    const submit = sinon.stub();

    await render(
      <template>
        <BsModalFooter
          @onSubmit={{submit}}
          @closeTitle='close'
          @submitTitle='submit'
        />
      </template>,
    );
    await click('.modal-footer button:last-child');

    assert
      .dom('.modal-footer button')
      .exists({ count: 2 }, 'Modal footer has two button.');
    assert
      .dom('.modal-footer button:first-child')
      .hasClass(defaultButtonClass(), 'Close button is a default button.');
    assert
      .dom('.modal-footer button:first-child')
      .hasProperty('type', 'button', 'Submit button is of type submit.');

    assert
      .dom('.modal-footer button:first-child')
      .hasText('close', 'Close button title is correct.');
    assert
      .dom('.modal-footer button:last-child')
      .hasClass('btn-primary', 'Submit button is a primary button.');
    assert
      .dom('.modal-footer button:last-child')
      .hasProperty('type', 'button', 'Submit button is of type button.');
    assert
      .dom('.modal-footer button:last-child')
      .hasText('submit', 'Submit button title is correct.');
    assert.strictEqual(submit.callCount, 1, '@onSubmit is called exactly once');
  });

  test('Footer submit button gets disabled when `onSubmit` returns a pending promise', async function (assert) {
    const { promise, resolve } = defer();
    const submit = sinon.stub().returns(promise);

    await render(
      <template>
        <BsModalFooter
          @onSubmit={{submit}}
          @closeTitle='close'
          @submitTitle='submit'
        />
      </template>,
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
      <template>
        <BsModalFooter
          @closeTitle='close'
          @submitTitle='submit'
          @submitButtonType='danger'
        />
      </template>,
    );
    assert
      .dom('.modal-footer button:last-child')
      .hasClass('btn-danger', 'Submit button is a danger button.');
  });

  test('Footer can have custom block content', async function (assert) {
    await render(
      <template>
        <BsModalFooter
          @closeTitle='close'
          @submitTitle='submit'
        >custom</BsModalFooter>
      </template>,
    );

    assert
      .dom('.modal-footer button')
      .doesNotExist('Modal footer has no buttons.');
    assert.dom('.modal-footer').hasText('custom', 'Block content is shown.');
  });

  test('submitDisabled disables submit button', async function (assert) {
    class State {
      @tracked disabled = true;
    }
    const state = new State();
    await render(
      <template>
        <BsModalFooter
          @closeTitle='close'
          @submitTitle='submit'
          @submitDisabled={{state.disabled}}
        />
      </template>,
    );

    assert
      .dom('.modal-footer button')
      .exists({ count: 2 }, 'Modal footer has two button.');
    assert
      .dom('.modal-footer button:first-child')
      .isNotDisabled('Close button is not disabled.');
    assert
      .dom('.modal-footer button:last-child')
      .isDisabled('Submit button is disabled');

    state.disabled = false;
    await settled();

    assert
      .dom('.modal-footer button:last-child')
      .isNotDisabled('Submit button is not disabled.');
  });
});
