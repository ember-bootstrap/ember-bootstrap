import Ember from 'ember';
import { cancel, later } from '@ember/runloop';

let _skipTransition;

export function skipTransition(bool) {
  _skipTransition = bool;
}

function _isSkipped() {
  return (_skipTransition === true) | (_skipTransition !== false) && Ember.testing;
}

export default function waitForTransitionEnd(node, duration = 0) {
  if (!node) {
    return Promise.reject();
  }
  let backup;

  if (_isSkipped()) {
    duration = 0;
  }

  return new Promise(function (resolve) {
    let done = function () {
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
