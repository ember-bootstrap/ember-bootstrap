import BaseForm from 'ember-bootstrap/components/base/bs-form';
import { computed } from '@ember/object';

export default class Form extends BaseForm {
  @(computed('formLayout').readOnly())
  get layoutClass() {
    let layout = this.get('formLayout');
    return layout === 'vertical' ? 'form' : `form-${layout}`;
  }
}
