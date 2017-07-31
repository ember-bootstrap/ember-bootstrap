import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
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
