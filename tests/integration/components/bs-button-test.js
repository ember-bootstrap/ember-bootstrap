import { run } from '@ember/runloop';
import { defer, reject, resolve } from 'rsvp';
import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, click, settled, waitUntil } from '@ember/test-helpers';
import { test, defaultButtonClass } from '../../helpers/bootstrap-test';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bs-button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('button has correct default markup', async function(assert) {
    await render(hbs`{{#bs-button}}Test{{/bs-button}}`);

    assert.dom('button').hasClass('btn', 'button has btn class');
    assert.dom('button').hasClass(defaultButtonClass(), 'button has type class');
  });

  test('button has correct size', async function(assert) {
    await render(hbs`{{#bs-button size="lg"}}Test{{/bs-button}}`);

    assert.dom('button').hasClass('btn-lg', 'button has size class');
  });

  test('button has correct type', async function(assert) {
    await render(hbs`{{#bs-button type="primary"}}Test{{/bs-button}}`);

    assert.dom('button').hasClass('btn', 'button has btn class');
    assert.dom('button').hasClass('btn-primary', 'button has type class');
  });

  test('button can be active', async function(assert) {
    await render(hbs`{{#bs-button active=true}}Test{{/bs-button}}`);

    assert.dom('button').hasClass('active', 'button has active class');
  });

  test('button can be block', async function(assert) {
    await render(hbs`{{#bs-button block=true}}Test{{/bs-button}}`);

    assert.dom('button').hasClass('btn-block', 'button has block class');
  });

  test('button has HTML attributes', async function(assert) {
    await render(hbs`{{#bs-button id="test" disabled=true title="title"}}Test{{/bs-button}}`);

    assert.equal(this.element.querySelector('button').getAttribute('id'), 'test');
    assert.equal(this.element.querySelector('button').getAttribute('disabled'), '');
    assert.equal(this.element.querySelector('button').getAttribute('title'), 'title');
  });

  test('button has default label', async function(assert) {
    await render(hbs`{{bs-button defaultText="test"}}`);
    assert.dom('button').hasText('test');
  });

  test('button has default type "button"', async function(assert) {
    await render(hbs`{{bs-button}}`);
    assert.equal(this.element.querySelector('button').type, 'button');
  });

  test('buttonType property allows changing button type', async function(assert) {
    await render(hbs`{{bs-button buttonType="submit"}}`);
    assert.equal(this.element.querySelector('button').type, 'submit');
  });

  test('button with icon property shows icon', async function(assert) {
    await render(hbs`{{bs-button icon="fas fa-check"}}`);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-check');
  });

  test('button with iconActive and iconInactive properties shows icon depending on active state', async function(assert) {
    this.set('active', false);
    await render(hbs`{{bs-button active=active iconInactive="fas fa-plus" iconActive="fas fa-minus"}}`);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-plus');

    this.set('active', true);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-minus');

    this.set('active', false);

    assert.dom('button i').hasClass('fas');
    assert.dom('button i').hasClass('fa-plus');
  });

  test('clicking a button sends onClick action with "value" property as a parameter', async function(assert) {
    let action = this.spy();
    this.actions.testAction = action;
    await render(hbs`{{bs-button onClick=(action "testAction") value="dummy"}}`);

    await click('button');
    assert.ok(action.calledWith('dummy'), 'onClick action has been called with button value');
  });

  test('button text is changed according to button state', async function(assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });

    await render(
      hbs`{{bs-button
      defaultText="default text"
      pendingText="text for pending state"
      fulfilledText="text for fulfilled state"
      rejectedText="text for rejected state"
      onClick=clickAction
    }}`);
    assert.dom('button').hasText('default text');

    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for pending state';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('text for fulfilled state');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'text for pending state';
    });

    deferredClickAction.reject();
    await settled();
    assert.dom('button').hasText('text for rejected state');
  });

  test('button text remains to default if no state text wasn\'t set', async function (assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });

    await render(
      hbs`{{bs-button
      defaultText="default text"      
      onClick=clickAction
    }}`);
    assert.dom('button').hasText('default text');

    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'default text';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('default text');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'default text';
    });

    deferredClickAction.reject();
    await settled();
    assert.dom('button').hasText('default text');
  });

  test('setting reset to true resets button text', async function(assert) {
    this.set('clickAction', () => {
      return resolve();
    });

    await render(hbs`
      {{bs-button defaultText="default text" fulfilledText="text for fulfilled state" reset=reset onClick=clickAction}}
    `);
    assert.dom('button').hasText('default text');

    await click('button');
    assert.dom('button').hasText('text for fulfilled state');

    run(() => this.set('reset', true));
    assert.dom('button').hasText('default text');
  });

  test('isPending, isFulfilled and isRejected properties are yielded', async function (assert) {
    let deferredClickAction = defer();
    this.set('clickAction', () => {
      return deferredClickAction.promise;
    });
    await render(hbs`{{#bs-button reset=reset onClick=clickAction as |button|}}
      {{#if button.isPending}}isPending{{/if}}
      {{#if button.isFulfilled}}isFulfilled{{/if}}
      {{#if button.isRejected}}isRejected{{/if}}
    {{/bs-button}}`);
    assert.dom('button').hasText('');

    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'isPending';
    });

    deferredClickAction.resolve();
    await settled();
    assert.dom('button').hasText('isFulfilled');

    deferredClickAction = defer();
    click('button');
    await waitUntil(() => {
      return find('button').textContent.trim() === 'isPending';
    });

    deferredClickAction.reject();
    await settled();
    assert.dom('button').hasText('isRejected');

    run(() => this.set('reset', true));

    assert.dom('button').hasText('');
  });

  test('isSettled shorthand is yielded', async function (assert) {
    this.set('clickAction', () => {
      return resolve();
    });
    await render(hbs`{{#bs-button reset=reset onClick=clickAction as |button|}}
      {{#if button.isSettled}}isSettled{{/if}}
    {{/bs-button}}`);

    assert.dom('button').hasText('');

    await click('button');
    assert.dom('button').hasText('isSettled');

    run(() => this.set('reset', true));
    assert.dom('button').hasText('');

    this.set('clickAction', () => {
      return reject();
    });
    await click('button');
    assert.dom('button').hasText('isSettled');
  });

  test('clicking a button with onClick action will prevent event to bubble up', async function(assert) {
    let buttonClick = this.spy();
    this.actions.buttonClick = buttonClick;
    let parentClick = this.spy();
    this.actions.parentClick = parentClick;

    await render(
      hbs`<div {{action "parentClick"}}>{{#bs-button onClick=(action "buttonClick")}}Button{{/bs-button}}</div>`
    );

    await click('button');
    assert.ok(buttonClick.called);
    assert.notOk(parentClick.called);
  });

  test('clicking a button without onClick action will cause event to bubble up', async function(assert) {
    let parentClick = this.spy();
    this.actions.parentClick = parentClick;

    await render(hbs`<div {{action "parentClick"}}>{{#bs-button}}Button{{/bs-button}}</div>`);

    await click('button');
    assert.ok(parentClick.called);
  });

  test('clicking a button with onClick action and bubble=true will cause event to bubble up', async function(assert) {
    let buttonClick = this.spy();
    this.actions.buttonClick = buttonClick;
    let parentClick = this.spy();
    this.actions.parentClick = parentClick;

    await render(
      hbs`<div {{action "parentClick"}}>{{#bs-button bubble=true onClick=(action "buttonClick")}}Button{{/bs-button}}</div>`
    );

    await click('button');
    assert.ok(buttonClick.called);
    assert.ok(parentClick.called);
  });
});
