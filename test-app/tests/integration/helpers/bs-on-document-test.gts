import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import sinon from 'sinon';
import bsOnDocument from 'ember-bootstrap/helpers/bs-on-document';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

module('Integration | Helper | bs-on-document', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it calls the callback for events on document', async function (assert) {
    const handler = sinon.spy();
    await render(<template>{{bsOnDocument 'click' handler}}</template>);

    document.dispatchEvent(new Event('click'));
    assert.ok(handler.calledOnce, 'callback was called');
    assert.strictEqual(
      (handler.firstCall.args[0] as Event).type,
      'click',
      'callback receives the event',
    );
  });

  test('it removes the listener when it is destroyed', async function (assert) {
    class State {
      @tracked show = true;
    }
    const state = new State();
    const handler = sinon.spy();
    await render(
      <template>
        {{#if state.show}}{{bsOnDocument 'click' handler}}{{/if}}
      </template>,
    );

    state.show = false;
    await settled();

    document.dispatchEvent(new Event('click'));
    assert.ok(handler.notCalled, 'callback was not called after teardown');
  });

  test('it replaces the listener when the event name changes', async function (assert) {
    class State {
      @tracked eventName: 'click' | 'keydown' = 'click';
    }
    const state = new State();
    const handler = sinon.spy();
    await render(<template>{{bsOnDocument state.eventName handler}}</template>);

    state.eventName = 'keydown';
    await settled();

    document.dispatchEvent(new Event('click'));
    assert.ok(handler.notCalled, 'old event is not listened to anymore');

    document.dispatchEvent(new Event('keydown'));
    assert.ok(handler.calledOnce, 'new event is listened to');
  });

  test('it replaces the listener when the callback changes', async function (assert) {
    const first = sinon.spy();
    const second = sinon.spy();
    class State {
      @tracked handler = first;
    }
    const state = new State();
    await render(<template>{{bsOnDocument 'click' state.handler}}</template>);

    state.handler = second;
    await settled();

    document.dispatchEvent(new Event('click'));
    assert.ok(first.notCalled, 'old callback is not called anymore');
    assert.ok(second.calledOnce, 'new callback is called');
  });

  test('it supports capture=true and removes the capturing listener', async function (assert) {
    class State {
      @tracked show = true;
    }
    const state = new State();
    const handler = sinon.spy();
    const stopPropagation = (e: Event) => e.stopPropagation();
    await render(
      <template>
        <button type='button' {{on 'click' stopPropagation}}>Button</button>
        {{#if state.show}}
          {{bsOnDocument 'click' handler capture=true}}
        {{/if}}
      </template>,
    );

    await click('button');
    assert.ok(
      handler.calledOnce,
      'capturing listener is called although the event does not bubble up',
    );

    state.show = false;
    await settled();

    await click('button');
    document.dispatchEvent(new Event('click'));
    assert.ok(handler.calledOnce, 'capturing listener was removed');
  });
});
