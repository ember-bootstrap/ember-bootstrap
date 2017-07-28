import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';

export default ProgressBar.extend({
  classNameBindings: ['progressBarAnimate:active'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'progress-bar'
   * @protected
   */
  classTypePrefix: 'progress-bar'
});
