import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';

import Form from 'ember-bootstrap/components/base/bs-form';

@classic
export default class BsForm extends Form {
  @(computed('formLayout').readOnly())
  get layoutClass() {
    let layout = this.get('formLayout');
    return layout === 'vertical' ? 'form' : `form-${layout}`;
  }
}
