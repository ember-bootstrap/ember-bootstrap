import Ember from 'ember';

const { computed, A } = Ember;

export default Ember.Controller.extend({
  type: computed.oneWay('typeChoices.lastObject'),
  typeChoices: A([
    'pills',
    'tabs'
  ]),
  badge: 5
});
