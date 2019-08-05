import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';
import typeClass from 'ember-bootstrap/utils/cp/type-class';

export default ProgressBar.extend({
  classNameBindings: ['progressBarAnimate:active'],
  typeClass: typeClass('progress-bar', 'type')
});
