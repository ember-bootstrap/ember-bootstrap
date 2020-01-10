import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor } from '@ember/test-helpers';
import { test, testRequiringTransitions } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';
import a11yAudit from 'ember-a11y-testing/test-support/audit'

module('Integration | Component | bs-alert', function(hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('alert has correct CSS classes', async function(assert) {
    await render(hbs`<BsAlert @type="success" @dismissible={{true}}>Test</BsAlert>`);

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
    assert.dom('.alert').hasClass('alert-dismissible', 'alert has dismissible class');
  });

  test('dismissible alert can be hidden by clicking close button with fade=false', async function(assert) {
    await render(hbs`<BsAlert @type="success" @fade={{false}}>Test</BsAlert>`);

    assert.dom('button.close').exists({ count: 1 }, 'alert has close button');
    await click('button.close');

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');

  });

  testRequiringTransitions('dismissible alert can be hidden by clicking close button with fade=true', async function(assert) {
    await render(hbs`<BsAlert @type="success" @fade={{true}}>Test</BsAlert>`);

    assert.dom('button.close').exists({ count: 1 }, 'alert has close button');
    let promise = click('button.close');
    await waitFor('.alert:not(.in)');

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasNoClass('in', 'alert has no in class');

    await promise;
    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('alert can be hidden by setting visible property', async function(assert) {
    this.set('visible', true);
    await render(hbs`<BsAlert @type="success" @fade={{false}} @visible={{visible}}>Test</BsAlert>`);

    this.set('visible', false);

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');

  });

  test('onDismiss is called when clicking the close button', async function(assert) {
    let action = this.spy();
    this.actions.dismiss = action;
    await render(hbs`<BsAlert @type="success" @fade={{false}} @onDismiss={{action "dismiss"}}>Test</BsAlert>`);
    await click('button.close');
    assert.ok(action.calledOnce, 'onDismiss has been called.');
  });

  test('alert is not hidden after clicking the close button when onDismiss action return false', async function(assert) {
    let action = this.stub();
    action.returns(false);
    this.actions.dismiss = action;
    await render(hbs`<BsAlert @type="success" @fade={{false}} @onDismiss={{action "dismiss"}}>Test</BsAlert>`);
    await click('button.close');
    assert.ok(action.calledOnce, 'onDismiss has been called.');

    assert.dom('.alert').exists('alert is still visible');
  });

  test('onDismissed is called after modal is closed', async function(assert) {
    let action = this.spy();
    this.actions.dismissed = action;
    await render(hbs`<BsAlert @type="success" @fade={{false}} @onDismissed={{action "dismissed"}}>Test</BsAlert>`);
    await click('button.close');
    assert.ok(action.calledOnce, 'onDismissed has been called.');
  });

  test('alert is initially hidden when visible=false', async function(assert) {
    await render(hbs`<BsAlert @type="success" @fade={{false}} @visible={{false}}>Test</BsAlert>`);

    assert.dom('.alert').doesNotExist('alert has no alert class');
    assert.dom('*').hasText('', 'alert has no content');
  });

  test('alert can be made visible when setting visible=true', async function(assert) {
    this.set('visible', false);
    await render(hbs`<BsAlert @type="success" @visible={{visible}} @fade={{false}}>Test</BsAlert>`);
    this.set('visible', true);

    assert.dom('.alert').exists('alert has alert class');
    assert.dom('.alert').hasClass('alert-success', 'alert has type class');
  });

  test('dismissing alert does not change public visible property (DDAU)', async function(assert) {
    this.set('visible', true);
    await render(hbs`<BsAlert @type="success" @visible={{visible}} @fade={{false}}>Test</BsAlert>`);

    await click('button.close');

    assert.equal(this.get('visible'), true, 'Does not modify visible property');
  });

  test('it passes accessibility checks', async function (assert) {
    await render(hbs`<BsAlert @type="success">Test</BsAlert>`);

    await a11yAudit();
    assert.ok(true, 'A11y audit passed');
  });
});
