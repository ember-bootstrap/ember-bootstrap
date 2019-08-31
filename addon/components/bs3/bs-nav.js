import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Nav from 'ember-bootstrap/components/base/bs-nav';

@classic
@classNameBindings('stacked:nav-stacked')
export default class BsNav extends Nav {}
