import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import FormElementLabel from 'ember-bootstrap/components/base/bs-form/element/label';

@classic
@tagName('')
export default class Label extends FormElementLabel {}
