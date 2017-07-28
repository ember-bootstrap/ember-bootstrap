import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { module } from 'qunit';
import { test } from '../../helpers/bootstrap-test';
import { triggerEvent } from 'ember-native-dom-helpers';

module('Unit | Utility | transition end');

test('it triggers on event', async function(assert) {
  let cb = this.spy();
  let node = document.createElement('div');

  transitionEnd(node, cb, this, 100);
  await triggerEvent(node, 'tramnsitionEnd');
  assert.ok(cb.calledOnce);
});

test('it triggers on timeout', async function(assert) {
  let cb = this.spy();
  let node = document.createElement('div');

  transitionEnd(node, cb, this, 100);

  let done = assert.async();
  setTimeout(() => {
    assert.ok(cb.calledOnce);
    done();
  }, 101);
});

test('it triggers just once', function(assert) {
  let cb = this.spy();
  let node = document.createElement('div');

  transitionEnd(node, cb, this, 100);

  let done = assert.async();
  triggerEvent(node, 'tramnsitionEnd');

  setTimeout(() => {
    assert.ok(cb.calledOnce);
    done();
  }, 101);
});