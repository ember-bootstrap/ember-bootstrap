import Component from '@glimmer/component';
import arg from '../utils/decorators/arg';

/**
 Implements a [Spinner element](https://getbootstrap.com/docs/5.2/components/spinners/).

 ### Basic Usage

 ```hbs
 <BsSpinner/>
 ```

 ### Advanced Usage

 ```hbs
 <BsSpinner @spinnerType="grow" @size="sm" @type="warning"/>
 ```

 ### Usage with `BsButton`

  ```hbs
  <BsButton @onClick={{this.download}} as |button|>
   Download
   {{#if button.isPending}}
     <BsSpinner @size="sm"/>
   {{/if}}
  </BsButton>
  ```

 @class Spinner
 @namespace Components
 @extends Glimmer.Component
 @public
*/
export default class SpinnerComponent extends Component {
  /**
   * Property for size styling, set to 'sm'
   *
   * Also see the [Bootstrap docs](https://getbootstrap.com/docs/5.2/components/spinners/#size)
   *
   * @property size
   * @type String
   * @public
   */

  /**
   * Property for type styling
   *
   * For the available types see the [Bootstrap docs](https://getbootstrap.com/docs/5.2/components/spinners/#colors)
   *
   * @property type
   * @type String
   * @default 'primary'
   * @public
   */

  /**
   * Spinner type - 'border' or 'grow'
   *
   * @property spinnerType
   * @type string
   * @default 'border'
   * @public
   */
  @arg
  spinnerType = 'border';

  /**
   * @property accessibilityText
   * @type string
   * @public
   */
  @arg
  accessibilityText = 'Loading...';

  get spinnerClass() {
    return `spinner-${this.spinnerType}`;
  }
}
