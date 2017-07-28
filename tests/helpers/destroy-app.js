import Ember from 'ember';

export default function destroyApp(application) {
  Ember.run(application, 'destroy');
  let el = document.getElementById('ember-bootstrap-modal-container');
  if (el) {
    el.remove();
  }
}
