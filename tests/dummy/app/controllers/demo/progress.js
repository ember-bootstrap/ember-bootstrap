import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  value: 50,
  minValue: 0,
  maxValue: 100,
  showLabel: false,
  type: null,
  striped: false,
  animate: false,
  roundDigits: 0,
  typeChoices: [
    '',
    'success',
    'info',
    'warning',
    'danger'
  ],
  notStriped: computed.not('striped')
});
