import { classNameBindings } from '@ember-decorators/component';
import BaseProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classNameBindings('progressBarAnimate:active')
export default class ProgressBar extends BaseProgressBar {
  @typeClass('progress-bar', 'type')
  typeClass;
}
