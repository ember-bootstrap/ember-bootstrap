import FormElementLabel from 'ember-bootstrap/components/bs-form/element/label';
import deprecateSubclassing from 'ember-bootstrap/utils/deprecate-subclassing';

@deprecateSubclassing
export default class FormElementLegend extends FormElementLabel {
  '__ember-bootstrap_subclass' = true;
}
