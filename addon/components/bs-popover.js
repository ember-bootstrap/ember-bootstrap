import Ember from 'ember';
import ContextualHelp from './bs-contextual-help';
import layout from '../templates/components/bs-popover';

const {
  computed
} = Ember;

/**
 Component that implements Bootstrap [popovers](http://getbootstrap.com/javascript/#popovers).

 By default it will attach its listeners (click) to the parent DOM element to trigger
 the popover:

 ```hbs
 <button class="btn">
   {{#bs-popover title="This is a title"}}and this the body{{/bs-popover}}
 </button>
 ```

 ### Trigger

 The trigger element is the DOM element that will cause the popover to be shown when one of the trigger events occur on
 that element. By default the trigger element is the parent DOM element of the component, and the trigger event will be
 "click".

 The `triggerElement` property accepts any jQuery selector to attach the popover to any other existing DOM element.
 With the special value "parentView" you can attach the popover to the DOM element of the parent component:

 ```hbs
 {{#my-component}}
   {{#bs-popover triggerElement="parentView"}}This is a popover{{/bs-popover}}
 {{/my-component}}
 ```

 To customize the events that will trigger the popover use the `triggerEvents` property, that accepts an array or a
 string of events, with "hover", "focus" and "click" being supported.

 ### Placement options

 By default the popover will show up to the right of the trigger element. Use the `placement` property to change that
 ("top", "bottom", "left" and "right"). To make sure the popover will not exceed the viewport (see Advanced customization)
 you can set `autoPlacement` to true. A popover with `placement="right" will be placed to the right if there is enough
 space, otherwise to the left.

 ### Advanced customization

 Several other properties allow for some advanced customization:
 * `visible` to show/hide the popover programmatically
 * `fade` to disable the fade in transition
 * `delay` (or `delayShow` and `delayHide`) to add a delay
 * `viewportSelector` and `viewportPadding` to customize the viewport that affects `autoPlacement`

 See the individual API docs for each property.

 ### Actions

 When you want to react on the popover being shown or hidden, you can use one of the following supported actions:
 * `onShow`
 * `onShown`
 * `onHide`
 * `onHidden`

 @class Popover
 @namespace Components
 @extends Components.ContextualHelp
 @public
 */
export default ContextualHelp.extend({
  layout,

  /**
   * @property placement
   * @type string
   * @default 'right'
   * @public
   */
  placement: 'right',

  /**
   * @property triggerEvents
   * @type array|string
   * @default 'click'
   * @public
   */
  triggerEvents: 'click',

  /**
   * The jQuery object of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  arrowElement: computed('overlayElement', function() {
    return this.get('overlayElement').find('.arrow');
  })
});
