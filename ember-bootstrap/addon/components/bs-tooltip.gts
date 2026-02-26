import ContextualHelp, {
  type ContextualHelpSignature,
} from './bs-contextual-help';
import bsDefault from 'ember-bootstrap/helpers/bs-default';
import BsTooltipElement from 'ember-bootstrap/components/bs-tooltip/element';
import createRef from 'ember-ref-bucket/modifiers/create-ref';
import { hash } from '@ember/helper';
import didInsertHelper from 'ember-render-helpers/helpers/did-insert-helper';
import didUpdateHelper from 'ember-render-helpers/helpers/did-update-helper';

type BsTooltipSignature = ContextualHelpSignature & {
  Element: Element;
  Blocks: {
    default: [{ close: () => void }];
  };
};

/**
  Component that implements Bootstrap [tooltips](http://getbootstrap.com/javascript/#tooltips).

  By default, it will attach its listeners (mouseover and focus) to the parent DOM element to trigger
  the tooltip:

  ```hbs
  <button class="btn">
    <BsTooltip @title="This is a tooltip" />
  </button>
  ```

  You can also use the component in a block form to set the title:

  ```hbs
  <button class="btn">
    <BsTooltip>
      This is a tooltip
    </BsTooltip>
  </button>
  ```

  ### Trigger

  The trigger element is the DOM element that will cause the tooltip to be shown when one of the trigger events occur on
  that element. By default, the trigger element is the parent DOM element of the component, and the trigger events will be
  "hover" and "focus".

  The `triggerElement` property accepts any CSS selector to attach the tooltip to any other existing DOM element.

  To customize the events that will trigger the tooltip use the `triggerEvents` property, that accepts an array or a
  string of events, with "hover", "focus" and "click" being supported.

  ### Placement options

  By default, the tooltip will show up on top of the trigger element. Use the `placement` property to change that
  ("top", "bottom", "left" and "right"). To make sure the tooltip will not exceed the viewport (see Advanced customization)
  you can set `autoPlacement` to true. A tooltip with `placement="right" will be placed to the right if there is enough
  space, otherwise to the left.

  ### Advanced customization

  Several other properties allow for some advanced customization:
  * `visible` to show/hide the tooltip programmatically
  * `fade` to disable the fade in transition
  * `delay` (or `delayShow` and `delayHide`) to add a delay
  * `viewportSelector` and `viewportPadding` to customize the viewport that affects `autoPlacement`
  * a `close` action is yielded, that allows you to close the tooltip:

  ```hbs
  <BsTooltip as |tt|>This is a tooltip <button {{on "click" tt.close}}>Close</button></BsTooltip>
  ```

  See the individual API docs for each property.

  ### Actions

  When you want to react on the tooltip being shown or hidden, you can use one of the following supported actions:
  * `onShow`
  * `onShown`
  * `onHide`
  * `onHidden`

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Tooltip
  @namespace Components
  @extends Components.ContextualHelp
  @public
*/
export default class Tooltip extends ContextualHelp<BsTooltipSignature> {
  /**
   * @property elementComponent
   * @type {String}
   * @private
   */

  /**
   * The DOM element of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  get arrowElement() {
    return this.overlayElement.querySelector<HTMLElement>('.tooltip-arrow');
  }
  <template>
    {{! @glint-nocheck }}
    {{! template-lint-disable no-unbound }}
    {{unbound this._parentFinder}}
    {{#if this.inDom}}
      {{#let
        (bsDefault @elementComponent (component BsTooltipElement))
        as |Element|
      }}
        <Element
          @placement={{this.placement}}
          @fade={{this.fade}}
          @showHelp={{this.showHelp}}
          @renderInPlace={{this._renderInPlace}}
          @destinationElement={{this.destinationElement}}
          @popperTarget={{this.triggerTargetElement}}
          @autoPlacement={{this.autoPlacement}}
          @viewportElement={{this.viewportElement}}
          @viewportPadding={{this.viewportPadding}}
          {{createRef 'overlayElement'}}
          ...attributes
        >
          {{#if (has-block)}}
            {{yield (hash close=this.close)}}
          {{else}}
            {{@title}}
          {{/if}}
        </Element>
      {{/let}}
    {{/if}}
    {{didInsertHelper this.setup}}
    {{didUpdateHelper this.showOrHide @visible}}
  </template>
}
