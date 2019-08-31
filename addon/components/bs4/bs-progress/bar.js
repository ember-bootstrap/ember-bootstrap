import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

@classic
@classNameBindings('progressBarAnimate:progress-bar-animated')
export default class Bar extends ProgressBar {
  @typeClass('bg', 'type')
  typeClass;
}
