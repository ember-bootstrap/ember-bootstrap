import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Collapse from 'ember-bootstrap/components/base/bs-collapse';

@classic
@classNameBindings('showContent:in')
export default class BsCollapse extends Collapse {}
