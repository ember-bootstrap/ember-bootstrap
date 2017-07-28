import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-progress/bar';
import TypeClass from 'ember-bootstrap/mixins/type-class';

const { computed, String: { htmlSafe } } = Ember;

/**

 Component for a single progress bar, see [Components.Progress](Components.Progress.html) for more examples.

 @class ProgressBar
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @public
 */
export default Ember.Component.extend(TypeClass, {
  layout,
  classNames: ['progress-bar'],
  classNameBindings: ['progressBarStriped'],

  attributeBindings: ['style', 'ariaValuenow', 'ariaValuemin', 'ariaValuemax'],

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

  progressBarStriped: computed.readOnly('striped'),
  progressBarAnimate: computed.readOnly('animate'),

  ariaValuenow: computed.readOnly('value'),
  ariaValuemin: computed.readOnly('minValue'),
  ariaValuemax: computed.readOnly('maxValue'),

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
  }).readOnly(),

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
  }).readOnly(),

  /**
   * @property style
   * @type string
   * @private
   * @readonly
   */
  style: computed('percent', function() {
    let percent = this.get('percent');
    return htmlSafe(`width: ${percent}%`);
  })

});
