import Ember from 'ember';
import transitionEnd from './transition-support';

const { run: { join, cancel, later } } = Ember;

export default function onTransitionEnd(node, handler, context, duration = 0) {
  if (!node) {
    return;
  }
  let fakeEvent = {
    target: node,
    currentTarget: node
  };
  let backup;

  if (transitionEnd) {
    node.addEventListener(transitionEnd, done, false);

    backup = later(this, done, fakeEvent, duration);
  } else {
    later(this, done, fakeEvent, 0);
  }

  function done(event) {
    if (backup) {
      cancel(backup);
    }
    event.target.removeEventListener(transitionEnd, done);
    join(context, handler, event);
  }
}