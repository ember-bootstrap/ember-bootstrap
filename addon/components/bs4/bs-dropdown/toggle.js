import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import DropdownToggle from 'ember-bootstrap/components/base/bs-dropdown/toggle';

@classic
@classNameBindings('inNav:nav-link')
export default class Toggle extends DropdownToggle {}
