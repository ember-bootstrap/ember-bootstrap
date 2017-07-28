import Ember from 'ember';
import BsForm from 'ember-bootstrap/components/bs-form';

const {
  computed
} = Ember;

export default BsForm.extend({
  hasValidator: computed.notEmpty('model.validate'),

  validate(model) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      let m = model;

      if (model instanceof Ember.ObjectProxy) {
        m = model.get('content');
      }

      m.validate().then(() => model.get('validations.isTruelyValid') ? resolve() : reject(), reject);
    });
  }
});