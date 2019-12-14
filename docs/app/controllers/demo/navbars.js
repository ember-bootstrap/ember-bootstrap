/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
import Controller from '@ember/controller';

export default Controller.extend({
  type: 'light',
  bg: 'light',
  typeChoices: ['light', 'dark'],
  bgChoices: ['light', 'dark', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
  collapsed: true
});
