import classic from 'ember-classic-decorator';
import FormElementErrors from 'ember-bootstrap/components/base/bs-form/element/errors';

@classic
export default class Errors extends FormElementErrors {
  feedbackClass = 'help-block';
}
