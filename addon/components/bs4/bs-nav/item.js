import { classNames } from '@ember-decorators/component';
import BaseNavItem from 'ember-bootstrap/components/base/bs-nav/item';

@classNames('nav-item')
export default class NavItem extends BaseNavItem {
  linkClass = 'nav-link';
}
