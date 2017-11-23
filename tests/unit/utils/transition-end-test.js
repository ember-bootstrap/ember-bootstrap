import transitionEnd from 'ember-bootstrap/utils/transition-end';
import transitionEvent from 'ember-bootstrap/utils/transition-support';
import { module } from 'qunit';
import { test, testRequiringTransitions } from '../../helpers/bootstrap-test';
import { triggerEvent } from 'ember-native-dom-helpers';

module('Unit | Utility | transition end', function() {
  testRequiringTransitions('it triggers on event', function(assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, cb, this, 100);
    triggerEvent(node, transitionEvent);
    assert.ok(cb.calledOnce);
  });

  test('it triggers on timeout', function(assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, cb, this, 100);

    let done = assert.async();
    setTimeout(() => {
      assert.ok(cb.calledOnce);
      done();
    }, 150);
  });

  test('it triggers just once', function(assert) {
    let cb = this.spy();
    let node = document.createElement('div');

    transitionEnd(node, cb, this, 100);

    let done = assert.async();
    triggerEvent(node, transitionEvent);

    setTimeout(() => {
      assert.ok(cb.calledOnce);
      done();
    }, 150);
  });
});