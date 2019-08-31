import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import TabPane from 'ember-bootstrap/components/base/bs-tab/pane';

@classic
@classNameBindings('showContent:show')
export default class Pane extends TabPane {}
