import BaseModal from 'ember-bootstrap/components/base/bs-modal';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class Modal extends BaseModal {
  @defaultValue
  showClass = 'show';
}
