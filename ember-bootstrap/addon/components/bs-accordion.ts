import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { ComponentLike } from '@glint/template';
import AccordionItem, { type ItemSignature } from './bs-accordion/item';

interface AccordionSignature {
  Args: {
    itemComponent?: ComponentLike<ItemSignature>;
    selected?: unknown;
    onChange?: (newValue: unknown, oldValue: unknown) => boolean;
  };
  Blocks: {
    default: [
      {
        item: ComponentLike<ItemSignature>;
        change: (newValue: unknown) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

/**
  Bootstrap-style [accordion group](http://getbootstrap.com/javascript/#collapse-example-accordion),
  with collapsible/expandable items.

  ### Usage

  Use as a block level component with any number of yielded [Components.AccordionItem](Components.AccordionItem.html)
  components as children:

  ```handlebars
  <BsAccordion as |acc|>
    <acc.item @value={{1}} @title="First item">
      <p>Lorem ipsum...</p>
      <button {{on "click" (fn acc.change 2)}}>
        Next
      </button>
    </acc.item>
    <acc.item @value={{2}} @title="Second item">
      <p>Lorem ipsum...</p>
    </acc.item>
    <acc.item @value={{3}} @title="Third item">
      <p>Lorem ipsum...</p>
    </acc.item>
  </BsAccordion>
  ```

  In the example above the first accordion item utilizes the yielded `change` action to add some custom behaviour.

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Accordion
  @namespace Components
  @extends Glimmer.Component
  @public
*/
export default class Accordion extends Component<AccordionSignature> {
  /**
   * The value of the currently selected accordion item. Set this to change selection programmatically.
   *
   * When the selection is changed by user interaction this property will not update by using two-way bindings in order
   * to follow DDAU best practices. If you want to react to such changes, subscribe to the `onChange` action
   *
   * @property selected
   * @public
   */

  /**
   * @property itemComponent
   * @type {String}
   * @private
   */

  // Updates to `@selected` argument are observed implicitly. See `isSelected`
  // getter and setter for details.
  //
  // We should evaluate if we can refactor to localCopy decorator from the tracked-toolbox
  // to reduce complexity.
  //
  // eslint-disable-next-line ember/no-tracked-properties-from-args
  @tracked
  _isSelected?: unknown = this.args.selected;
  _isSelectedNonTracked?: unknown = this.args.selected;

  _prevSelected?: unknown = this.args.selected;

  get itemComponent(): ComponentLike<ItemSignature> {
    return this.args.itemComponent ?? AccordionItem;
  }

  /**
   * The value of the currently selected accordion item
   *
   * @property isSelected
   * @private
   */
  get isSelected(): unknown {
    // ideally we would have used @localCopy here, but unfortunately this fails for Ember 3.16 in this special case
    // see https://github.com/pzuraq/tracked-toolbox/issues/17
    // So don't look at this, it is going to get ugly...
    this._isSelected; // just consume this to invalidate the getter when this changes

    if (this.args.selected && this._prevSelected !== this.args.selected) {
      // eslint-disable-next-line ember/no-side-effects
      this._isSelectedNonTracked = this._prevSelected = this.args.selected;
    }

    return this._isSelectedNonTracked;
  }
  set isSelected(value: unknown) {
    this._isSelectedNonTracked = value;
    this._isSelected = value;
  }

  /**
   * Action when the selected accordion item is about to be changed.
   *
   * You can return false to prevent changing the active item, and do that in your action by
   * setting the `selected` accordingly.
   *
   * @event onChange
   * @param newValue
   * @param oldValue
   * @public
   */

  @action
  doChange(newValue?: unknown) {
    const oldValue = this.isSelected;
    if (oldValue === newValue) {
      newValue = null;
    }
    if (this.args.onChange?.(newValue, oldValue) !== false) {
      this.isSelected = newValue;
    }
  }
}
