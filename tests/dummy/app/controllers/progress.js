import Ember from 'ember';

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
    {
      id: ''
    },
    {
      id: 'success'
    },
    {
      id: 'info'
    },
    {
      id: 'warning'
    },
    {
      id: 'danger'
    }
  ]
});
