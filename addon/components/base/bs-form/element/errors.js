import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/errors';

/**
 @class FormElementErrors
 @namespace Components
 @extends Ember.Component
 @private
 */
export default Component.extend({
  layout,
  tagName: '',

  /**
   * @property show
   * @type {Boolean}
   * @public
   */
  show: false,

  /**
   * @property messages
   * @type {Ember.Array}
   * @public
   */
  messages: null,

  /**
   * Whether or not should display several errors at the same time.
   *
   * @default false
   * @property showMultipleErrors
   * @public
   * @type {Boolean}
   */
  showMultipleErrors: false
});
