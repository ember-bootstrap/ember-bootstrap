import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-progress';

/**
 Component to display a Bootstrap progress bar, see http://getbootstrap.com/components/#progress.

 ### Usage

 The component yields a [Components.ProgressBar)(Components.ProgressBar.html) component that represents a single bar.
 Use the `value` property to control the progress bar's width. To apply the different styling options supplied by
 Bootstrap, use the appropriate properties like `type`, `showLabel`, `striped` or `animate`.

 ```hbs
 {{#bs-progress as |p|}}
   {{p.bar value=progressValue minValue=0 maxValue=10 showLabel=true type="danger"}}
 {{/bs-progress}}
 ```

 ### Stacked

 You can place multiple progress bar components in a single progress component to
 create a stack of progress bars as seen in http://getbootstrap.com/components/#progress-stacked.

 ```hbs
 {{#bs-progress as |p|}}
   {{p.bar value=progressValue1 type="success"}}
   {{p.bar value=progressValue2 type="warning"}}
   {{p.bar value=progressValue3 type="danger"}}
 {{/bs-progress}}
 ```

 @class Progress
 @namespace Components
 @extends Ember.Component
 @public
 */
export default Ember.Component.extend({
  layout,
  classNames: ['progress']
});
