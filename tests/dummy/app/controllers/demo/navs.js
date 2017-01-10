import Ember from 'ember';

const { computed, A } = Ember;

export default Ember.Controller.extend({
  type: computed.oneWay('typeChoices.firstObject'),
  stacked: false,
  justified: false,
  typeChoices: A([
    'pills',
    'tabs'
  ]),

  actions: {
    updateType(type) {
      let props = {
        type
      };
      if (type === 'tabs') {
        props.stacked = false;
      }
      this.setProperties(props);
    },
    updateStacked(stacked) {
      let props = {
        stacked
      };
      if (stacked) {
        props.justified = false;
      }
      this.setProperties(props);
    }
  }
});
