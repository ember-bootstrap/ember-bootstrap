import { triggerEvent } from '@ember/test-helpers';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { module } from 'qunit';
import { test, testRequiringTransitions } from '../../helpers/bootstrap-test';

module('Unit | Utility | transition end', function () {
  testRequiringTransitions('it triggers on event', async function (assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, 0).then(cb);
    await triggerEvent(node, 'transitionend');
    assert.ok(cb.calledOnce);
  });

  test('it triggers on timeout', function (assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, 0).then(cb);

    let done = assert.async();
    setTimeout(() => {
      assert.ok(cb.calledOnce);
      done();
    }, 1);
  });

  test('it triggers just once', function (assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, 0).then(cb);

    let done = assert.async();
    triggerEvent(node, 'transitionend');

    setTimeout(() => {
      assert.ok(cb.calledOnce);
      done();
    }, 1);
  });
});
