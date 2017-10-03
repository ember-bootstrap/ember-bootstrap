import { oneWay } from '@ember/object/computed';
import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  visible: true,
  fade: true,
  dismissible: true,
  type: oneWay('typeChoices.firstObject'),
  typeChoices: A([
    'success',
    'info',
    'warning',
    'danger'
  ])
});
