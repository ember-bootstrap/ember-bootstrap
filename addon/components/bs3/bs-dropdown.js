import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import DropDown from 'ember-bootstrap/components/base/bs-dropdown';

@classic
@classNameBindings('isOpen:open')
export default class BsDropdown extends DropDown {}
