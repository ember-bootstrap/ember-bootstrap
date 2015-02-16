import Ember from 'ember';
import ModalRouteMixin from 'ember-bootstrap/mixins/modal-route';

module('ModalRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var ModalRouteObject = Ember.Object.extend(ModalRouteMixin);
  var subject = ModalRouteObject.create();
  ok(subject);
});
