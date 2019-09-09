import {
  attributeBindings,
  classNameBindings,
  classNames,
  layout as templateLayout
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import layout from 'ember-bootstrap/templates/components/bs-progress/bar';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

/**

 Component for a single progress bar, see [Components.Progress](Components.Progress.html) for more examples.

 @class ProgressBar
 @namespace Components
 @extends Ember.Component
 @public
 */
@templateLayout(layout)
@classNames('progress-bar')
@classNameBindings('progressBarStriped', 'typeClass')
@attributeBindings('ariaValuenow', 'ariaValuemin', 'ariaValuemax')
export default class ProgressBar extends Component {
  /**
   * The lower limit of the value range
   *
   * @property minValue
   * @type number
   * @default 0
   * @public
   */
  @defaultValue
  minValue = 0;

  /**
   * The upper limit of the value range
   *
   * @property maxValue
   * @type number
   * @default 100
   * @public
   */
  @defaultValue
  maxValue = 100;

  /**
   * The value the progress bar should represent
   *
   * @property value
   * @type number
   * @default 0
   * @public
   */
  @defaultValue
  value = 0;

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
  @defaultValue
  showLabel = false;

  /**
   * Create a striped effect, see http://getbootstrap.com/components/#progress-striped
   *
   * @property striped
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  striped = false;

  /**
   * Animate the stripes, see http://getbootstrap.com/components/#progress-animated
   *
   * @property animate
   * @type boolean
   * @default false
   * @public
   */
  @defaultValue
  animate = false;

  /**
   * Specify to how many digits the progress bar label should be rounded.
   *
   * @property roundDigits
   * @type number
   * @default 0
   * @public
   */
  @defaultValue
  roundDigits = 0;

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/4.3/components/progress/#backgrounds)
   *
   * @property type
   * @type String
   * @default 'default'
   * @public
   */
  @defaultValue
  type = 'default';

  @readOnly('striped')
  progressBarStriped;

  @readOnly('animate')
  progressBarAnimate;

  @readOnly('value')
  ariaValuenow;

  @readOnly('minValue')
  ariaValuemin;

  @readOnly('maxValue')
  ariaValuemax;

  /**
   * The percentage of `value`
   *
   * @property percent
   * @type number
   * @protected
   * @readonly
   */
  @(computed('value', 'minValue', 'maxValue').readOnly())
  get percent() {
    let value = parseFloat(this.get('value'));
    let minValue = parseFloat(this.get('minValue'));
    let maxValue = parseFloat(this.get('maxValue'));

    return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1) * 100;
  }

  /**
   * The percentage of `value`, rounded to `roundDigits` digits
   *
   * @property percentRounded
   * @type number
   * @protected
   * @readonly
   */
  @(computed('percent', 'roundDigits').readOnly())
  get percentRounded() {
    let roundFactor = Math.pow(10, this.get('roundDigits'));
    return Math.round(this.get('percent') * roundFactor) / roundFactor;
  }

  /**
   * @method updateStyles
   * @return void
   * @private
   */
  updateStyles() {
    let percent = parseFloat(this.get('percent'));
    this.element.style.width = !isNaN(percent) ? `${percent}%` : '';
  }

  didInsertElement() {
    this.updateStyles();
  }

  didUpdateAttrs() {
    this.updateStyles();
  }
}
