import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-progress';

/**
 Component to display a Bootstrap progress bar, see http://getbootstrap.com/components/#progress.

 ### Usage

 The component yields a [Components.ProgressBar)(Components.ProgressBar.html) component that represents a single bar.
 Use the `value` property to control the progress bar's width. To apply the different styling options supplied by
 Bootstrap, use the appropriate properties like `type`, `showLabel`, `striped` or `animate`.

 ```hbs
 <BsProgress as |P| >
  <P.bar @value={{this.progressValue}} @minValue=0 @maxValue=10 @showLabel={{true}} @type="dange" />
 </BsProgress>
 ```

 ### Stacked

 You can place multiple progress bar components in a single progress component to
 create a stack of progress bars as seen in http://getbootstrap.com/components/#progress-stacked.

 ```hbs
 <BsProgress as |P| >
  <P.bar @value={{this.progressValue1}} @type="success" />
  <P.bar @value={{this.progressValue2}} @type="warning" />
  <P.bar @value={{this.progressValue3}} @type="danger" />
 </BsProgress>
 ```

 @class Progress
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Component.extend({
  layout,
  classNames: ['progress'],

  /**
   * @property progressBarComponent
   * @type {String}
   * @private
   */
  progressBarComponent: 'bs-progress/bar'
});
