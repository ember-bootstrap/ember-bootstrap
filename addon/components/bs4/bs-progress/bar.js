import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';
import typeClass from 'ember-bootstrap/utils/type-class';

export default ProgressBar.extend({
  classNameBindings: ['progressBarAnimate:progress-bar-animated'],
  typeClass: typeClass('bg')
});
