import Ember from 'ember';
import layout from '../templates/components/bs-navbar-brand';

export default Ember.Component.extend({
  layout,

  tagName: 'a',
  classNames: ['navbar-brand'],
  attributeBindings: ['href'],
  href: '#'
});
