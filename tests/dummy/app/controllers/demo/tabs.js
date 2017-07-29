import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
  type: computed.oneWay('typeChoices.lastObject'),
  typeChoices: A([
    'pills',
    'tabs'
  ]),
  badge: 5
});
