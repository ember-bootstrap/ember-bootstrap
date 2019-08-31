import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import DropdownMenuLinkTo from 'ember-bootstrap/components/base/bs-dropdown/menu/link-to';

@classic
@classNames('dropdown-item')
export default class LinkTo extends DropdownMenuLinkTo {}
