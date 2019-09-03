import { classNameBindings } from '@ember-decorators/component';
import BaseDropDown from 'ember-bootstrap/components/base/bs-dropdown';

@classNameBindings('inNav:nav-item', 'isOpen:show')
export default class Dropdown extends BaseDropDown {}
