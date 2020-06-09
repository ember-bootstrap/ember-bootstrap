import { layout as templateLayout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/errors';
import defaultValue from 'ember-bootstrap/utils/default-decorator';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

/**
 @class FormElementErrors
 @namespace Components
 @extends Ember.Component
 @private
 */
@templateLayout(layout)
@tagName('')
@deprecateSubclassing
export default class FormElementErrors extends Component {
  /**
   * @property show
   * @type {Boolean}
   * @public
   */
  @defaultValue
  show = false;

  /**
   * @property messages
   * @type {Ember.Array}
   * @public
   */

  /**
   * Whether or not should display several errors at the same time.
   *
   * @default false
   * @property showMultipleErrors
   * @public
   * @type {Boolean}
   */
  @defaultValue
  showMultipleErrors = false;
}
