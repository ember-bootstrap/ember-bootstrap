import BaseFormElementErrors from 'ember-bootstrap/components/base/bs-form/element/errors';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class FormElementErrors extends BaseFormElementErrors {
  @defaultValue
  feedbackClass = 'help-block';
}
