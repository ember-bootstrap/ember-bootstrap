/* globals alert */
import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import { next } from '@ember/runloop';

export default Controller.extend({
  modal1: false,
  modal2: true,
  modal3: false,
  hasModal3: false,

  title: 'Simple Modal',
  sizes: A(['', 'sm', 'lg']),
  size: oneWay('sizes.firstObject'),
  closeButton: true,
  closeTitle: 'Ok',
  submitTitle: null,
  backdrop: true,
  backdropClose: true,
  fade: true,

  _ignoreClose: false,

  actions: {
    addModal3() {
      this.set('hasModal3', true);
      this.set('modal3', true);
    },
    removeModal3() {
      this.set('hasModal3', false);
    },
    submit() {
      alert('Modal submitted!');
    },
    close() {
      if (!this._ignoreClose) {
        this.set('modal2', false);
        alert('Modal closed!');
      }
    },
    open() {
      this.set('modal2', true);
    },
    backdropChange(backdrop) {
      this._ignoreClose = true;
      let fade = this.get('fade');
      this.set('fade', false);
      this.set('modal2', false);
      next(() => {
        this.set('backdrop', backdrop);
        this.set('modal2', true);
        next(() => {
          this.set('fade', fade);
          this._ignoreClose = false;
        });
      });
    }
  }
});