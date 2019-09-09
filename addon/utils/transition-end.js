import Ember from 'ember';
import { cancel, later } from '@ember/runloop';
import { Promise, reject } from 'rsvp';

export default function waitForTransitionEnd(node, duration = 0) {
  if (!node) {
    return reject();
  }
  let backup;

  if (Ember.testing) {
    duration = 0;
  }

  return new Promise(function(resolve) {
    let done = function() {
      if (backup) {
        cancel(backup);
        backup = null;
      }
      node.removeEventListener('transitionend', done);
      resolve();
    };

    node.addEventListener('transitionend', done, false);
    backup = later(this, done, duration);
  });
}
