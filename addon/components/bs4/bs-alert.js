import { classNameBindings } from '@ember-decorators/component';
import BaseAlert from 'ember-bootstrap/components/base/bs-alert';

@classNameBindings('showAlert:show')
export default class Alert extends BaseAlert {}
