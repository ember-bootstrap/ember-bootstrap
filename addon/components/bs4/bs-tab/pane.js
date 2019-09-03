import { classNameBindings } from '@ember-decorators/component';
import BaseTabPane from 'ember-bootstrap/components/base/bs-tab/pane';

@classNameBindings('showContent:show')
export default class TabPane extends BaseTabPane {}
