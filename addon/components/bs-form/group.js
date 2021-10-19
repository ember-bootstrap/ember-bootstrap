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
import templateOnly from '@ember/component/template-only';

export default templateOnly();
