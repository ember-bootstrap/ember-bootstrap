import { run } from '@ember/runloop';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, settled, waitUntil } from '@ember/test-helpers';
import {
  defaultButtonClass,
  test,
  testForBootstrap,
} from '../../helpers/bootstrap';
import { defer } from '../../helpers/defer';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import { setupAssertionsForErrorsNotHandledByEmberOnError } from '../../helpers/assert-errors';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon, { type SinonSpy } from 'sinon';
import type { CustomTestContext } from '../../helpers';

module('Integration | Component | bs-button', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);
  setupAssertionsForErrorsNotHandledByEmberOnError(hooks);

  test('button has correct default markup', async function (assert) {
    await render(hbs`<BsButton>Test</BsButton>`);

    assert.dom('button').hasClass('btn', 'button has btn class');
    assert
      .dom('button')
      .hasClass(defaultButtonClass(), 'button has type class');
  });

  test('button has correct size', async function (assert) {
    await render(hbs`<BsButton @size='lg'>Test</BsButton>`);

    assert.dom('button').hasClass('btn-lg', 'button has size class');
  });

  test('button has correct type', async function (assert) {
    await render(hbs`<BsButton @type='primary'>Test</BsButton>`);

    assert.dom('button').hasClass('btn', 'button has btn class');
    assert.dom('button').hasClass('btn-primary', 'button has type class');
    assert
      .dom('button')
      .doesNotHaveClass(
        'btn-outline-primary',
        'button does not have outline class',
      );
  });

  test('button can be active', async function (assert) {
    await render(hbs`<BsButton @active={{true}}>Test</BsButton>`);

    assert.dom('button').hasClass('active', 'button has active class');
  });

  testForBootstrap([3, 4], 'button can be block', async function (assert) {
    await render(hbs`{{! template-lint-disable no-capital-arguments }}
<BsButton @block={{true}}>Test</BsButton>`);

    assert.dom('button').hasClass('btn-block', 'button has block class');
  });

  test('button has HTML attributes', async function (assert) {
    await render(
      hbs`<BsButton
  id='test'
  disabled={{true}}
  title='title'
  type='submit'
>Test</BsButton>`,
    );

    assert.equal(
      this.element.querySelector('button')?.getAttribute('id'),
      'test',
    );
    assert.equal(
      this.element.querySelector('button')?.getAttribute('disabled'),
      '',
    );
    assert.equal(
      this.element.querySelector('button')?.getAttribute('title'),
      'title',
    );
    // assert.equal(this.element.querySelector('button')?.getAttribute('type'), 'submit');
  });

  test('button has default label', async function (assert) {
    await render(hbs`<BsButton @defaultText='test' />`);
    assert.dom('button').hasText('test');
  });

  test('button has default type "button"', async function (assert) {
    await render(hbs`<BsButton />`);
    assert.equal(this.element.querySelector('button')?.type, 'button');
  });

  test('button with icon property shows icon', async function (assert) {
    await render(hbs`<BsButton @icon='fas fa-check' />`);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-check');
  });

  test('button with outline property shows as outline', async function (assert) {
    await render(hbs`<BsButton @type='primary' @outline={{true}} />`);
    assert.dom('button').hasClass('btn-outline-primary');
    assert.dom('button').doesNotHaveClass('btn-primary');
  });

  test<
    CustomTestContext & { active: boolean }
  >('button with iconActive and iconInactive properties shows icon depending on active state', async function (assert) {
    this.active = false;
    await render<typeof this>(
      hbs`<BsButton
  @active={{this.active}}
  @iconInactive='fas fa-plus'
  @iconActive='fas fa-minus'
/>`,
    );

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-plus');

    this.set('active', true);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-minus');

    this.set('active', false);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-plus');
  });

  test<
    CustomTestContext & { action: SinonSpy }
  >('clicking a button sends onClick action with "value" property as a parameter', async function (this, assert) {
    this.action = sinon.spy();
    await render<typeof this>(
      hbs`<BsButton @onClick={{this.action}} @value='dummy' />`,
    );

    await click('button');
    assert.ok(
      this.action.calledWith('dummy'),
      'onClick action has been called with button value',
    );
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('button text is changed according to button state', async function (assert) {
    let deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };

    await render<typeof this>(hbs`<BsButton
  @defaultText='default text'
  @pendingText='text for pending state'
  @fulfilledText='text for fulfilled state'
  @rejectedText='text for rejected state'
  @onClick={{this.clickAction}}
/>`);
    assert.dom('button').hasText('default text');

    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'text for pending state';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('text for fulfilled state');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'text for pending state';
    });

    const expectedError = new Error('error thrown for testing');
    await assert.rejectsErrorNotHandledByEmberOnError?.(async () => {
      deferredClickAction.reject(expectedError);
      await settled();
    }, expectedError);
    assert.dom('button').hasText('text for rejected state');
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >("button text remains to default if no state text wasn't set", async function (assert) {
    let deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };

    await render<typeof this>(
      hbs`<BsButton @defaultText='default text' @onClick={{this.clickAction}} />`,
    );
    assert.dom('button').hasText('default text');

    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'default text';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('default text');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'default text';
    });

    const expectedError = new Error('error thrown for testing');
    await assert.rejectsErrorNotHandledByEmberOnError?.(async () => {
      deferredClickAction.reject(expectedError);
      await settled();
    }, expectedError);
    assert.dom('button').hasText('default text');
  });

  test<
    CustomTestContext & { clickAction: () => void; reset?: boolean }
  >('setting reset to true resets button text', async function (assert) {
    this.clickAction = () => {
      return Promise.resolve();
    };

    await render<typeof this>(hbs`<BsButton
  @defaultText='default text'
  @fulfilledText='text for fulfilled state'
  @reset={{this.reset}}
  @onClick={{this.clickAction}}
/>`);
    assert.dom('button').hasText('default text');

    await click('button');
    assert.dom('button').hasText('text for fulfilled state');

    run(() => this.set('reset', true));
    assert.dom('button').hasText('default text');
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('button is disabled while in pending state', async function (assert) {
    const deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };

    await render<typeof this>(hbs`<BsButton @onClick={{this.clickAction}} />`);
    assert.dom('button').isNotDisabled();

    await click('button');
    assert.dom('button').isDisabled();

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').isNotDisabled();
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('button is not disabled while in pending state if preventConcurrency is false', async function (assert) {
    const deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };

    await render<typeof this>(
      hbs`<BsButton @onClick={{this.clickAction}} @preventConcurrency={{false}} />`,
    );
    await click('button');
    assert.dom('button').isNotDisabled();

    deferredClickAction.resolve();
    await settled();
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('setting disabled HTML attribute to false prevents button from being disabled while in pending state', async function (assert) {
    const deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };

    await render<typeof this>(
      hbs`<BsButton @onClick={{this.clickAction}} disabled={{false}} />`,
    );
    await click('button');
    assert.dom('button').isNotDisabled();

    deferredClickAction.resolve();
    await settled();
  });

  test<
    CustomTestContext & { clickAction: () => void; reset?: boolean }
  >('isPending, isFulfilled and isRejected properties are yielded', async function (assert) {
    let deferredClickAction = defer();
    this.clickAction = () => {
      return deferredClickAction.promise;
    };
    await render<
      typeof this
    >(hbs`<BsButton @reset={{this.reset}} @onClick={{this.clickAction}} as |button|>
  {{#if button.isPending}}isPending{{/if}}
  {{#if button.isFulfilled}}isFulfilled{{/if}}
  {{#if button.isRejected}}isRejected{{/if}}
</BsButton>`);
    assert.dom('button').hasText('');

    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'isPending';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('isFulfilled');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button')?.textContent?.trim() === 'isPending';
    });

    const expectedError = new Error('error thrown for testing');
    await assert.rejectsErrorNotHandledByEmberOnError?.(async () => {
      deferredClickAction.reject(expectedError);
      await settled();
    }, expectedError);
    assert.dom('button').hasText('isRejected');

    run(() => this.set('reset', true));

    assert.dom('button').hasText('');
  });

  test<
    CustomTestContext & { clickAction: () => void; reset?: boolean }
  >('isSettled shorthand is yielded', async function (assert) {
    this.clickAction = () => {
      return Promise.resolve();
    };
    await render<
      typeof this
    >(hbs`<BsButton @reset={{this.reset}} @onClick={{this.clickAction}} as |button|>
  {{#if button.isSettled}}isSettled{{/if}}
</BsButton>`);

    assert.dom('button').hasText('');

    await click('button');
    assert.dom('button').hasText('isSettled');

    run(() => this.set('reset', true));
    assert.dom('button').hasText('');

    const expectedError = new Error('error thrown for testing');
    this.set('clickAction', async () => {
      throw expectedError;
    });
    await assert.rejectsErrorNotHandledByEmberOnError?.(async () => {
      await click('button');
    }, expectedError);
    assert.dom('button').hasText('isSettled');
  });

  test<
    CustomTestContext & { parentClick: () => void; buttonClick: () => void }
  >('clicking a button with onClick action will prevent event to bubble up', async function (assert) {
    const buttonClick = sinon.spy();
    this.buttonClick = buttonClick;
    const parentClick = sinon.spy();
    this.parentClick = parentClick;

    await render<typeof this>(
      hbs`{{! template-lint-disable no-invalid-interactive }}
<div {{on 'click' this.parentClick}}>!
  <BsButton @onClick={{this.buttonClick}}>Button</BsButton>
</div>`,
    );

    await click('button');
    assert.ok(buttonClick.called);
    assert.notOk(parentClick.called);
  });

  test<
    CustomTestContext & { parentClick: () => void; buttonClick: () => void }
  >('clicking a button without onClick action will cause event to bubble up', async function (assert) {
    const parentClick = sinon.spy();
    this.parentClick = parentClick;

    await render<typeof this>(
      hbs`{{! template-lint-disable no-invalid-interactive }}
<div {{on 'click' this.parentClick}}>!
  <BsButton>Button</BsButton>
</div>`,
    );

    await click('button');
    assert.ok(parentClick.called);
  });

  test<
    CustomTestContext & { parentClick: () => void; buttonClick: () => void }
  >('clicking a button with onClick action and bubble=true will cause event to bubble up', async function (assert) {
    const buttonClick = sinon.spy();
    this.buttonClick = buttonClick;
    const parentClick = sinon.spy();
    this.parentClick = parentClick;

    await render<
      typeof this
    >(hbs`{{! template-lint-disable no-invalid-interactive }}
<div {{on 'click' this.parentClick}}>
  <BsButton @bubble={{true}} @onClick={{this.buttonClick}}>Button</BsButton>
</div>`);

    await click('button');
    assert.ok(buttonClick.called);
    assert.ok(parentClick.called);
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('prevents onClick action to be fired concurrently', async function (assert) {
    const deferredClickAction = defer();
    let clickActionHasBeenExecuted = false;
    this.clickAction = () => {
      clickActionHasBeenExecuted = true;
      return deferredClickAction.promise;
    };

    await render<typeof this>(hbs`<BsButton @onClick={{this.clickAction}} />`);
    click('button');
    await waitUntil(() => clickActionHasBeenExecuted);

    this.clickAction = () => {
      assert.ok(false, 'onClick action is not executed concurrently');
    };
    try {
      await click('button');
    } catch (e) {
      // click helper will throw on a disabled button
    }

    deferredClickAction.resolve();
    await settled();

    this.set('clickAction', () => {
      assert.step('onClick action');
    });
    await click('button');
    assert.verifySteps(
      ['onClick action'],
      'onClick action is fired again after pending click action is settled',
    );
  });

  test<
    CustomTestContext & { clickAction: () => void }
  >('preventConcurrency=false allows onClick action to be fired concurrently', async function (assert) {
    const deferredClickAction = defer();
    let clickActionExecutionCount = 0;

    this.clickAction = () => {
      clickActionExecutionCount++;
      return deferredClickAction.promise;
    };
    await render<typeof this>(
      hbs`<BsButton @onClick={{this.clickAction}} @preventConcurrency={{false}} />`,
    );

    await click('button');
    assert.equal(clickActionExecutionCount, 1);

    await click('button');
    assert.equal(clickActionExecutionCount, 2);

    deferredClickAction.resolve();
  });

  test<
    CustomTestContext & { clickHandler: () => void }
  >('it does not catch errors throws by @onClick event handlers', async function (assert) {
    const expectedError = new Error('error thrown for testing');

    this.clickHandler = async () => {
      throw expectedError;
    };

    await render<typeof this>(hbs`<BsButton @onClick={{this.clickHandler}} />`);

    await assert.rejectsErrorNotHandledByEmberOnError?.(async () => {
      await click('button');
    }, expectedError);
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`<BsButton>Test</BsButton>`);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
