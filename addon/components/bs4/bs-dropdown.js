import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import DropDown from 'ember-bootstrap/components/base/bs-dropdown';

@classic
@classNameBindings('inNav:nav-item', 'isOpen:show')
export default class BsDropdown extends DropDown {}
