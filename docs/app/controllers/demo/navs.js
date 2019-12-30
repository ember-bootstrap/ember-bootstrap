import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  type: oneWay('typeChoices.firstObject'),
  stacked: false,
  justified: false,
  fill: false,
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
