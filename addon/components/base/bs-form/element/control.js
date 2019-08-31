import classic from 'ember-classic-decorator';
import Component from '@ember/component';

/**

 @class FormElementControl
 @namespace Components
 @extends Ember.Component
 @private
 */
@classic
export default class Control extends Component {
 /**
  * @property value
  * @public
  */
 value = null;

 /**
  * @property ariaDescribedBy
  * @type {string}
  * @public
  */
 ariaDescribedBy = null;

 /**
  * This action is called whenever the `value` changes
  *
  * @event onChange
  * @param {*} value
  * @public
  */
 onChange() {}
}
