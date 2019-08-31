import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import DropdownMenuItem from 'ember-bootstrap/components/base/bs-dropdown/menu/item';

@classic
@tagName('li')
export default class Item extends DropdownMenuItem {}
