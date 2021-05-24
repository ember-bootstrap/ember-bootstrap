import { not } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  value: 50,
  minValue: 0,
  maxValue: 100,
  showLabel: false,
  type: 'default',
  striped: false,
  animate: false,
  roundDigits: 0,
  /* eslint-disable ember/avoid-leaking-state-in-ember-objects */
  typeChoices: ['default', 'success', 'info', 'warning', 'danger'],
  notStriped: not('striped'),
});
