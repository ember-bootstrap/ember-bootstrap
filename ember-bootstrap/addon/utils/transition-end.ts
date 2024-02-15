import Ember from 'ember';
import { cancel, later, type Timer } from '@ember/runloop';

let _skipTransition: boolean | undefined;

export function skipTransition(bool?: boolean) {
  _skipTransition = bool;
}

function _isSkipped() {
  return (
    _skipTransition === true || (_skipTransition !== false && Ember.testing)
  );
}

export default function waitForTransitionEnd(
  node: HTMLElement,
  duration = 0,
): Promise<void> {
  if (!node) {
    return Promise.reject();
  }
  let backup: Timer | null;

  if (_isSkipped()) {
    duration = 0;
  }

  return new Promise(function (this: unknown, resolve) {
    const done = function () {
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
