import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';

const { computed } = Ember;

/**

 Component to display a Bootstrap progress bar, see http://getbootstrap.com/components/#progress.

 ### Usage

 Always wrap the progress bar in a [Components.Progress](Components.Progress.html) component. Use the `value`
 property to control the progress bar's width. To apply the different styling options supplied by Bootstrap, use the
 appropriate properties like `type`, `showLabel`, `striped` or `animate`.

 ```hbs
 {{#bs-progress}}
   {{bs-progress-bar value=progressValue minValue=0 maxValue=10 showLabel=true type="danger"}}
 {{/bs-progress}}
 ```

 ### Stacked

 You can place multiple progress bar components in a single [Components.Progress](Components.Progress.html) to
 create a stack of progress bars as seen in http://getbootstrap.com/components/#progress-stacked.

 ```hbs
 {{#bs-progress}}
   {{bs-progress-bar value=progressValue1 type="success"}}
   {{bs-progress-bar value=progressValue2 type="warning"}}
   {{bs-progress-bar value=progressValue3 type="danger"}}
 {{/bs-progress}}
 ```

 @class ProgressBar
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @public
 */
export default Ember.Component.extend(TypeClass, {
  classNames: ['progress-bar'],
  classNameBindings: ['progressBarStriped', 'active'],

  attributeBindings: ['style', 'ariaValuenow', 'ariaValuemin', 'ariaValuemax'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'progress-bar'
   * @protected
   */
  classTypePrefix: 'progress-bar',

  /**
   * The lower limit of the value range
   *
   * @property minValue
   * @type number
   * @default 0
   * @public
   */
  minValue: 0,

  /**
   * The upper limit of the value range
   *
   * @property maxValue
   * @type number
   * @default 100
   * @public
   */
  maxValue: 100,

  /**
   * The value the progress bar should represent
   *
   * @property value
   * @type number
   * @default 0
   * @public
   */
  value: 0,

  /**
   If true a label will be shown inside the progress bar.

   By default it will be the percentage corresponding to the `value` property, rounded to `roundDigits` digits.
   You can customize it by using the component with a block template, which the component yields the percentage
   value to:

   ```hbs
   {{#bs-progress}}
     {{#bs-progress-bar value=progressValue as |percent|}}{{progressValue}} ({{percent}}%){{/bs-progress-bar}}
   {{/bs-progress}}
   ```

   @property showLabel
   @type boolean
   @default false
   @public
   */
  showLabel: false,

  /**
   * Create a striped effect, see http://getbootstrap.com/components/#progress-striped
   *
   * @property striped
   * @type boolean
   * @default false
   * @public
   */
  striped: false,

  /**
   * Animate the stripes, see http://getbootstrap.com/components/#progress-animated
   *
   * @property animate
   * @type boolean
   * @default false
   * @public
   */
  animate: false,

  /**
   * Specify to how many digits the progress bar label should be rounded.
   *
   * @property roundDigits
   * @type number
   * @default 0
   * @public
   */
  roundDigits: 0,

  progressBarStriped: computed.alias('striped'),
  active: computed.alias('animate'),

  ariaValuenow: computed.alias('value'),
  ariaValuemin: computed.alias('minValue'),
  ariaValuemax: computed.alias('maxValue'),

  /**
   * The percentage of `value`
   *
   * @property percent
   * @type number
   * @protected
   * @readonly
   */
  percent: computed('value', 'minValue', 'maxValue', function() {
    let value = parseFloat(this.get('value'));
    let minValue = parseFloat(this.get('minValue'));
    let maxValue = parseFloat(this.get('maxValue'));

    return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1) * 100;
  }),

  /**
   * The percentage of `value`, rounded to `roundDigits` digits
   *
   * @property percentRounded
   * @type number
   * @protected
   * @readonly
   */
  percentRounded: computed('percent', 'roundDigits', function() {
    let roundFactor = Math.pow(10, this.get('roundDigits'));
    return Math.round(this.get('percent') * roundFactor) / roundFactor;
  }),

  /**
   * @property style
   * @type string
   * @private
   * @readonly
   */
  style: computed('percent', function() {
    let percent = this.get('percent');
    return new Ember.String.htmlSafe(`width: ${percent}%`);
  })

});
