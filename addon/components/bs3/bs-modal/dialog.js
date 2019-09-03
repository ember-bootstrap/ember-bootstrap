import { classNameBindings } from '@ember-decorators/component';
import BaseModalDialog from 'ember-bootstrap/components/base/bs-modal/dialog';

@classNameBindings('showModal:in', 'inDom:show')
export default class ModalDialog extends BaseModalDialog {}
