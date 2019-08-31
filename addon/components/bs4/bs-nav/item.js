import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import NavItem from 'ember-bootstrap/components/base/bs-nav/item';

@classic
@classNames('nav-item')
export default class Item extends NavItem {
  linkClass = 'nav-link';
}
