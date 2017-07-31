import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Controller.extend({
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
