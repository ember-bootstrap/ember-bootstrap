import BaseButton from 'ember-bootstrap/components/base/bs-button';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

export default class Button extends BaseButton {
  @defaultValue
  type = 'default';
}
