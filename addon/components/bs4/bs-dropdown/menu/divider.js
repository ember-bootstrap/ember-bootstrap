import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Divider from 'ember-bootstrap/components/base/bs-dropdown/menu/divider';

@classic
@classNames('dropdown-divider')
export default class _Divider extends Divider {}
