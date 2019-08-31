import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classic
@classNameBindings('progressBarAnimate:active')
export default class Bar extends ProgressBar {
  @typeClass('progress-bar', 'type')
  typeClass;
}
