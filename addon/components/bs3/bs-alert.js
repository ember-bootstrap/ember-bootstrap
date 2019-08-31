import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Alert from 'ember-bootstrap/components/base/bs-alert';

@classic
@classNameBindings('showAlert:in')
export default class BsAlert extends Alert {}
