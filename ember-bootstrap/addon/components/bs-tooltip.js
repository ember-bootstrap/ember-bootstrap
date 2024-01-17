import ContextualHelp from './bs-contextual-help';

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
  <BsTooltip as |tt|>This is a tooltip <button onclick={{action tt.close}}>Close</button></BsTooltip>
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
export default class Tooltip extends ContextualHelp {
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
    return this.overlayElement.querySelector('.tooltip-arrow');
  }
}
