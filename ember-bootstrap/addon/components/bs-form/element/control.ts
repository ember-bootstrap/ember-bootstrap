import Component from '@glimmer/component';
import formValidationClass, {
  type ValidationType,
} from 'ember-bootstrap/utils/form-validation-class';

export interface FormElementControlSignature<T> {
  Args: {
    ariaDescribedBy?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    validationType: ValidationType;
    value: T;
  };
}

/**
 @class FormElementControl
 @namespace Components
 @extends Ember.Component
 @private
 */
export default class FormElementControl<
  SIGNATURE extends FormElementControlSignature<VALUE>,
  VALUE,
> extends Component<SIGNATURE> {
  /**
   * @property value
   * @public
   */

  get formValidationClass() {
    return formValidationClass(this.args.validationType);
  }

  /**
   * This action is called whenever the `value` changes
   *
   * @event onChange
   * @param {*} value
   * @public
   */
}
