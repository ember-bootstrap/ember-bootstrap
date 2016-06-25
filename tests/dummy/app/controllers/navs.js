import Ember from 'ember';

const { computed, A } = Ember;

export default Ember.Controller.extend({
  type: computed.oneWay('typeChoices.firstObject'),
  stacked: false,
  justified: false,
  typeChoices: A([
    {
      id: 'pills'
    },
    {
      id: 'tabs'
    }
  ])
});
