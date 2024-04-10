import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled, waitFor } from '@ember/test-helpers';
import {
  closeButtonClass,
  test,
  testRequiringTransitions,
} from '../../helpers/bootstrap';
import { hbs } from 'ember-cli-htmlbars';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import sinon from 'sinon';

module('Integration | Component | bs-alert', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('alert has correct CSS classes', async function (assert) {
    await render(
      hbs`<BsAlert @type='success' @dismissible={{true}}>Test</BsAlert>`,
    );

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
    assert
      .dom('.alert')
      .hasClass('alert-dismissible', 'alert has dismissible class');
  });

  test('dismissible alert can be hidden by clicking close button with fade=false', async function (assert) {
    await render(hbs`<BsAlert @type='success' @fade={{false}}>Test</BsAlert>`);

    assert
      .dom(`button.${closeButtonClass()}`)
      .exists({ count: 1 }, 'alert has close button');
    await click(`button.${closeButtonClass()}`);

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  testRequiringTransitions(
    'dismissible alert can be hidden by clicking close button with fade=true',
    async function (assert) {
      await render(hbs`<BsAlert @type='success' @fade={{true}}>Test</BsAlert>`);

      assert
        .dom(`button.${closeButtonClass()}`)
        .exists({ count: 1 }, 'alert has close button');
      let promise = click(`button.${closeButtonClass()}`);
      await waitFor('.alert:not(.in)');

      assert.dom('.alert').exists('alert has alert class');
      assert.dom('.alert').hasNoClass('in', 'alert has no in class');

      await promise;
      assert.dom('.alert').doesNotExist('alert has no alert class');
      assert.dom('*').hasText('', 'alert has no content');
    },
  );

  test('alert can be hidden by setting visible property', async function (assert) {
    this.set('visible', true);
    await render(
      hbs`<BsAlert
  @type='success'
  @fade={{false}}
  @visible={{this.visible}}
>Test</BsAlert>`,
    );

    this.set('visible', false);

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('onDismiss is called when clicking the close button', async function (assert) {
    let action = sinon.spy();
    this.actions.dismiss = action;
    await render(
      hbs`<BsAlert
  @type='success'
  @fade={{false}}
  @onDismiss={{action 'dismiss'}}
>Test</BsAlert>`,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(action.calledOnce, 'onDismiss has been called.');
  });

  test('alert is not hidden after clicking the close button when onDismiss action return false', async function (assert) {
    let action = sinon.stub();
    action.returns(false);
    this.actions.dismiss = action;
    await render(
      hbs`<BsAlert
  @type='success'
  @fade={{false}}
  @onDismiss={{action 'dismiss'}}
>Test</BsAlert>`,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(action.calledOnce, 'onDismiss has been called.');

    assert.dom('.alert').exists('alert is still visible');
  });

  test('onDismissed is called after modal is closed', async function (assert) {
    let action = sinon.spy();
    this.actions.dismissed = action;
    await render(
      hbs`<BsAlert
  @type='success'
  @fade={{false}}
  @onDismissed={{action 'dismissed'}}
>Test</BsAlert>`,
    );
    await click(`button.${closeButtonClass()}`);
    assert.ok(action.calledOnce, 'onDismissed has been called.');
  });

  test('When fade is true, onDismissed is called once when visible changes from true to false', async function (assert) {
    let action = sinon.spy();
    this.dismissed = action;
    this.isAlertShown = true;

    await render(
      hbs`<BsAlert
  @fade={{true}}
  @onDismissed={{this.dismissed}}
  @visible={{this.isAlertShown}}
>Test</BsAlert>`,
    );

    this.set('isAlertShown', false);
    await settled();

    assert.ok(action.calledOnce, 'onDismissed is called once.');
  });

  test('When fade is false, onDismissed is called once when visible changes from true to false', async function (assert) {
    let action = sinon.spy();
    this.dismissed = action;
    this.isAlertShown = true;

    await render(
      hbs`<BsAlert
  @fade={{false}}
  @onDismissed={{this.dismissed}}
  @visible={{this.isAlertShown}}
>Test</BsAlert>`,
    );

    this.set('isAlertShown', false);
    await settled();

    assert.ok(action.calledOnce, 'onDismissed is called once.');
  });

  test('When fade is false, onDismissed is not called when visible changes from false to false', async function (assert) {
    let action = sinon.spy();
    this.dismissed = action;
    this.isAlertShown = false;

    await render(
      hbs`<BsAlert
  @fade={{false}}
  @onDismissed={{this.dismissed}}
  @visible={{this.isAlertShown}}
>Test</BsAlert>`,
    );

    this.set('isAlertShown', false);
    await settled();

    assert.ok(action.notCalled, 'onDismissed is not called.');
  });

  test('alert is initially hidden when visible=false', async function (assert) {
    await render(
      hbs`<BsAlert @type='success' @fade={{false}} @visible={{false}}>Test</BsAlert>`,
    );

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('alert can be made visible when setting visible=true', async function (assert) {
    this.set('visible', false);
    await render(
      hbs`<BsAlert
  @type='success'
  @visible={{this.visible}}
  @fade={{false}}
>Test</BsAlert>`,
    );
    this.set('visible', true);

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
  });

  test('alert can be made visible when setting visible=true after manually dismissing it', async function (assert) {
    this.set('visible', true);

    this.set('handleOnDismissed', () => {
      this.set('visible', false);
    });

    await render(hbs`<BsAlert
  @type='success'
  @fade={{false}}
  @visible={{this.visible}}
  @onDismissed={{this.handleOnDismissed}}
>
  Test
</BsAlert>`);

    assert.dom('.alert').exists('alert has alert class');

    await click(`button.${closeButtonClass()}`);
    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');

    this.set('visible', true);

    assert.dom('.alert').exists('alert has alert class');
  });

  test('dismissing alert does not change public visible property (DDAU)', async function (assert) {
    this.set('visible', true);
    await render(
      hbs`<BsAlert
  @type='success'
  @visible={{this.visible}}
  @fade={{false}}
>Test</BsAlert>`,
    );

    await click(`button.${closeButtonClass()}`);

    assert.true(this.visible, 'Does not modify visible property');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`<BsAlert @type='success'>Test</BsAlert>`);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });

  test('it allows to set a header using named blocks', async function (assert) {
    await render(hbs`<BsAlert>
  <:header>Warning</:header>
  <:body><p>Some content</p></:body>
</BsAlert>`);

    assert.dom('.alert .alert-heading').exists({ count: 1 }, 'header exists');
    assert
      .dom('.alert .alert-heading')
      .hasText('Warning', 'block content is rendered inside header');
    assert
      .dom('.alert .alert-heading')
      .hasTagName('h4', 'header uses a h4 tag');
    assert
      .dom('.alert .alert-heading + p')
      .exists({ count: 1 }, 'body is rendered a as silbing of header');
  });

  test('tagName used for header element can be customized with headerTag argument', async function (assert) {
    await render(hbs`<BsAlert @headerTag='h1'>
  <:header>Warning</:header>
  <:body><p>Some content</p></:body>
</BsAlert>`);
    assert.dom('.alert .alert-heading').hasTagName('h1');
  });
});
