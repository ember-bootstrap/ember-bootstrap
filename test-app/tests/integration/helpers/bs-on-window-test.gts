import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import sinon from 'sinon';
import bsOnWindow from 'ember-bootstrap/helpers/bs-on-window';
import setupNoDeprecations from '../../helpers/setup-no-deprecations';

module('Integration | Helper | bs-on-window', function (hooks) {
  setupRenderingTest(hooks);
  setupNoDeprecations(hooks);

  test('it calls the callback for events on window', async function (assert) {
    const handler = sinon.spy();
    await render(<template>{{bsOnWindow 'resize' handler}}</template>);

    window.dispatchEvent(new Event('resize'));
    assert.ok(handler.calledOnce, 'callback was called');
    assert.strictEqual(
      (handler.firstCall.args[0] as Event).type,
      'resize',
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
        {{#if state.show}}{{bsOnWindow 'resize' handler}}{{/if}}
      </template>,
    );

    state.show = false;
    await settled();

    window.dispatchEvent(new Event('resize'));
    assert.ok(handler.notCalled, 'callback was not called after teardown');
  });
});
