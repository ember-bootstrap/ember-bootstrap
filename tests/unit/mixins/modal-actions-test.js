import Ember from 'ember';
import ModalActionsMixin from 'ember-bootstrap/mixins/modal-actions';

module('ModalActionsMixin');

// Replace this with your real tests.
test('it works', function() {
  var ModalActionsObject = Ember.Object.extend(ModalActionsMixin);
  var subject = ModalActionsObject.create();
  ok(subject);
});
