import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/element/errors';

/**
 @class FormElementErrors
 @namespace Components
 @extends Ember.Component
 @private
 */
@classic
@templateLayout(layout)
@tagName('')
export default class Errors extends Component {
 /**
  * @property show
  * @type {Boolean}
  * @public
  */
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
 showMultipleErrors = false;
}
