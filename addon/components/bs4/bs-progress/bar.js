import ProgressBar from 'ember-bootstrap/components/base/bs-progress/bar';

export default ProgressBar.extend({
  classNameBindings: ['progressBarAnimate:progress-bar-animated'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'bg'
   * @protected
   */
  classTypePrefix: 'bg'
});
