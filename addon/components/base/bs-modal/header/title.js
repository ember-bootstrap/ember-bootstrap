import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-modal/header/title';

/**

 @class ModalHeaderTitle
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Ember.Component.extend({
  layout,
  tagName: 'h4',
  classNames: ['modal-title']
});
