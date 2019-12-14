import { notEmpty } from '@ember/object/computed';
import ObjectProxy from '@ember/object/proxy';
import { Promise as EmberPromise } from 'rsvp';
import BsForm from 'ember-bootstrap/components/bs-form';

export default BsForm.extend({
  hasValidator: notEmpty('model.validate'),

  validate(model) {
    return new EmberPromise((resolve, reject) => {
      let m = model;

      if (model instanceof ObjectProxy) {
        m = model.get('content');
      }

      m.validate().then(() => model.get('validations.isTruelyValid') ? resolve() : reject(), reject);
    });
  }
});