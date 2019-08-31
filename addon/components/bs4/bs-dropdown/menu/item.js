import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import DropDownMenuItem from 'ember-bootstrap/components/base/bs-dropdown/menu/item';

@classic
@tagName('')
export default class Item extends DropDownMenuItem {}
