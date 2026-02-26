import Component from '@glimmer/component';
import arg from '../utils/decorators/arg';
import bsSizeClass from '../helpers/bs-size-class';
import bsTypeClass from '../helpers/bs-type-class';
import { macroCondition } from '@embroider/macros';

// @embroider/macros does not export the helpers. The macro helpers do not exist at runtime and do not need to be
// imported for the preprocessor to work. Adding this type only serves to keep TypeScript happy with the missing import.
// See: https://github.com/embroider-build/embroider/issues/2674
declare function macroGetOwnConfig(path: string): boolean;

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
            (macroCondition (macroGetOwnConfig 'isBS5'))
            'visually-hidden'
            'sr-only'
          }}
        >{{yield}}</span>
      {{/if}}
    </div>
  </template>
}
