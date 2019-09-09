import { layout as templateLayout } from '@ember-decorators/component';
import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-form/group';

/**
  This component renders a `<div class="form-group">` element, with support for validation states and feedback icons (only for BS3).
  You can use it as a block level component. The following shows Bootstrap 3 usage for the internal markup.

  ```hbs
  <BsForm as |form|>
    <form.group @validation={{this.firstNameValidation}}>
      <label class="control-label">First name</label>
      <input value={{this.firstname}} class="form-control" oninput={{action (mut this.firstname) value="target.value"}} type="text">
    </form.group>
  </bs-form>
  ```

  If the `validation` property is set to some state (usually Bootstrap's predefined states "success",
  "warning" or "error"), the appropriate styles will be added, together with a feedback icon.
  See http://getbootstrap.com/css/#forms-control-validation

  @class FormGroup
  @namespace Components
  @extends Ember.Component
  @public
*/
@templateLayout(layout)
export default class FormGroup extends Component {
  /**
   * @property classTypePrefix
   * @type String
   * @default 'form-group' (BS3) or 'form-control' (BS4)
   * @private
   */

  /**
   * Computed property which is true if the form group is in a validation state
   *
   * @property hasValidation
   * @type boolean
   * @private
   * @readonly
   */
  @(notEmpty('validation').readOnly())
  hasValidation;

  /**
   * Set to a validation state to render the form-group with a validation style (only for BS3).
   * See http://getbootstrap.com/css/#forms-control-validation
   *
   * The default states of "success", "warning" and "error" are supported by Bootstrap out-of-the-box.
   * But you can use custom states as well. This will set a has-<state> class, and (if `useIcons`is true)
   * a feedback whose class is taken from the <state>Icon property
   *
   * @property validation
   * @type string
   * @public
   */
}
