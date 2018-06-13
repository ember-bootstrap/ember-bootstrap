import { later, cancel } from '@ember/runloop';
import { Promise, reject } from 'rsvp';

export default function waitForTransitionEnd(node, duration = 0) {
  if (!node) {
    return reject();
  }
  let backup;

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
