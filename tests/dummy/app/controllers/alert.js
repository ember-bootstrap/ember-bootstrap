import Ember from 'ember';

export default Ember.Controller.extend({
  visible: true,
  fade: true,
  dismissible: true,
  type: Ember.computed.oneWay('typeChoices.firstObject'),
  typeChoices: Ember.A([
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
  ])
});
