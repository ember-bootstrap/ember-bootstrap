/* global macroCondition */
/* global macroGetOwnConfig */
import Component from '@glimmer/component';
import arg from '../utils/decorators/arg.ts';
import bsSizeClass from '../helpers/bs-size-class.ts';
import bsTypeClass from '../helpers/bs-type-class.ts';

interface BsSpinnerSignature {
  Element: HTMLDivElement;
  Args: {
    size?: 'sm' | null;
    type?: string;
    spinnerType?: 'border' | 'grow';
  };
  Blocks: {
    default: [];
  };
}

/**
  Implements a [Spinner element](https://getbootstrap.com/docs/5.2/components/spinners/).

  ### Basic Usage

  ```hbs
  <BsSpinner/>
  <BsSpinner>Loading...</BsSpinner>
  ```

  The (optional) component's block will render as visually invisible but accessible text for assistive technology like screen readers.

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
export default class BsSpinner extends Component<BsSpinnerSignature> {
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

  get spinnerClass() {
    return `spinner-${this.spinnerType}`;
  }

  <template>
    <div
      class='{{this.spinnerClass}}
        {{if @size (bsSizeClass this.spinnerClass @size)}}
        {{bsTypeClass "text" @type default='primary' outline=false}}'
      role='status'
      ...attributes
    >
      {{#if (has-block)}}
        <span
          class={{if
            (macroCondition (macroGetOwnConfig 'isBS4'))
            'sr-only'
            'visually-hidden'
          }}
        >{{yield}}</span>
      {{/if}}
    </div>
  </template>
}
