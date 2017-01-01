import Ember from 'ember';

const { A, computed } = Ember;

export default Ember.Controller.extend({
  visible: true,
  fade: true,
  dismissible: true,
  type: computed.oneWay('typeChoices.firstObject'),
  typeChoices: A([
    'success',
    'info',
    'warning',
    'danger'
  ])
});
