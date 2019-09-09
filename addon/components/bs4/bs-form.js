import { computed } from '@ember/object';
import BaseForm from 'ember-bootstrap/components/base/bs-form';

export default class Form extends BaseForm {
  @(computed('formLayout').readOnly())
  get layoutClass() {
    let layout = this.get('formLayout');
    return layout === 'inline' ? 'form-inline' : null;
  }
}
