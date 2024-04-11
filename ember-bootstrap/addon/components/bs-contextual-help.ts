import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, later, next, schedule } from '@ember/runloop';
import transitionEnd from '../utils/transition-end';
import { getDestinationElement } from '../utils/dom';
import { assert } from '@ember/debug';
import Ember from 'ember';
import arg from '../utils/decorators/arg';
import { tracked } from '@glimmer/tracking';
import { ref } from 'ember-ref-bucket';
import isFastBoot from '../utils/is-fastboot';

import type { Timer } from '@ember/runloop';
import type { ComponentLike } from '@glint/template';

const HOVERSTATE_NONE = 'none';
const HOVERSTATE_IN = 'in';
const HOVERSTATE_OUT = 'out';

function noop() {}

export interface ContextualHelpSignature {
  Element: HTMLDivElement;
  Args: {
    title?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    autoPlacement?: boolean;
    visible?: boolean;
    fade?: boolean;
    delay?: number;
    delayShow?: number;
    delayHide?: number;
    transitionDuration?: number;
    viewportSelector?: string;
    viewportPadding?: number;
    triggerElement?: string;
    triggerEvents?: string | Array<'click' | 'hover' | 'focus'>;
    renderInPlace?: boolean;
    onShow?: () => unknown;
    onShown?: () => unknown;
    onHide?: () => unknown;
    onHidden?: () => unknown;
    elementComponent?: ComponentLike;
  };
  Blocks: {
    default: [
      {
        close: () => void;
      },
    ];
  };
}

/**
  @class ContextualHelp
  @namespace Components
  @extends Glimmer.Component
  @private
*/
export default abstract class ContextualHelp extends Component<ContextualHelpSignature> {
  /**
   * @property title
   * @type string
   * @public
   */

  /**
   * How to position the tooltip/popover - top | bottom | left | right
   *
   * @property title
   * @type string
   * @default 'top'
   * @public
   */
  @arg
  placement = 'top';

  /**
   * By default it will dynamically reorient the tooltip/popover based on the available space in the viewport. For
   * example, if `placement` is "left", the tooltip/popover will display to the left when possible, otherwise it will
   * display right. Set to `false` to force placement according to the `placement` property
   *
   * @property autoPlacement
   * @type boolean
   * @default true
   * @public
   */
  @arg
  autoPlacement = true;

  /**
   * You can programmatically show the tooltip/popover by setting this to `true`
   *
   * @property visible
   * @type boolean
   * @default false
   * @public
   */
  @arg
  visible = false;

  /**
   * @property inDom
   * @type boolean
   * @private
   */
  @tracked
  _inDom?: boolean;

  get inDom() {
    return this._inDom ?? !!(this.visible && this.triggerTargetElement);
  }
  set inDom(value) {
    if (this._inDom === value) {
      return;
    }

    this._inDom = value;
  }

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  @arg
  fade = true;

  /**
   * Used to apply Bootstrap's visibility class
   *
   * @property showHelp
   * @type boolean
   * @default false
   * @private
   */
  @tracked
  showHelp = this.visible;

  /**
   * Delay showing and hiding the tooltip/popover (ms). Individual delays for showing and hiding can be specified by using the
   * `delayShow` and `delayHide` properties.
   *
   * @property delay
   * @type number
   * @default 0
   * @public
   */
  @arg
  delay = 0;

  /**
   * Delay showing the tooltip/popover. This property overrides the general delay set with the `delay` property.
   *
   * @property delayShow
   * @type number
   * @default 0
   * @public
   */
  @arg
  delayShow = this.args.delay ?? 0;

  /**
   * Delay hiding the tooltip/popover. This property overrides the general delay set with the `delay` property.
   *
   * @property delayHide
   * @type number
   * @default 0
   * @public
   */
  @arg
  delayHide = this.args.delay ?? 0;

  /**
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 150
   * @public
   */
  @arg
  transitionDuration = 150;

  /**
   * Keeps the tooltip/popover within the bounds of this element when `autoPlacement` is true. Can be any valid CSS selector.
   *
   * @property viewportSelector
   * @type string
   * @default 'body'
   * @see viewportPadding
   * @see autoPlacement
   * @public
   */
  @arg
  viewportSelector = 'body';

  /**
   * Take a padding into account for keeping the tooltip/popover within the bounds of the element given by `viewportSelector`.
   *
   * @property viewportPadding
   * @type number
   * @default 0
   * @see viewportSelector
   * @see autoPlacement
   * @public
   */
  @arg
  viewportPadding = 0;

  _parent?: HTMLElement;

  _parentFinder = self.document ? self.document.createTextNode('') : undefined;

  /**
   * The DOM element of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  abstract arrowElement?: HTMLElement | null;

  /**
   * The wormhole destinationElement
   *
   * @property destinationElement
   * @type object
   * @readonly
   * @private
   */
  get destinationElement() {
    return getDestinationElement(this);
  }

  /**
   * The DOM element of the viewport element.
   *
   * @property viewportElement
   * @type object
   * @readonly
   * @private
   */
  get viewportElement() {
    return document.querySelector(this.viewportSelector);
  }

  /**
   * The DOM element that triggers the tooltip/popover. By default it is the parent element of this component.
   * You can set this to any CSS selector to have any other element trigger the tooltip/popover.
   *
   * @property triggerElement
   * @type string | null
   * @public
   */
  @arg
  triggerElement: string | null = null;

  triggerTargetElement?: HTMLElement;

  /**
   * @method getTriggerTargetElement
   * @private
   */
  getTriggerTargetElement() {
    const triggerElement = this.triggerElement;
    let el: HTMLElement | null | undefined;

    if (!triggerElement) {
      el = this._parent;
    } else {
      el = document.querySelector<HTMLHtmlElement>(triggerElement);
    }

    assert('Could not find trigger element for tooltip/popover component', el);
    return el;
  }

  /**
   * The event(s) that should trigger the tooltip/popover - click | hover | focus.
   * You can set this to a single event or multiple events, given as an array or a string separated by spaces.
   *
   * @property triggerEvents
   * @type array|string
   * @default 'hover focus'
   * @public
   */
  @arg
  triggerEvents: NonNullable<ContextualHelpSignature['Args']['triggerEvents']> =
    'hover focus';

  get _triggerEvents() {
    const { triggerEvents } = this;
    const events = Array.isArray(triggerEvents)
      ? triggerEvents
      : triggerEvents.split(' ');

    return events.map((event) => {
      switch (event) {
        case 'hover':
          return ['mouseenter', 'mouseleave'] as const;
        case 'focus':
          return ['focusin', 'focusout'] as const;
        default:
          return event;
      }
    });
  }

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  get _renderInPlace() {
    return this.args.renderInPlace || !this.destinationElement;
  }

  /**
   * Current hover state, 'in', 'out' or null
   *
   * @property hoverState
   * @type number
   * @private
   */
  hoverState = HOVERSTATE_NONE;

  /**
   * Current state for events
   */
  hover = false;
  focus = false;
  click = false;

  get shouldShowHelp() {
    return this.hover || this.focus || this.click;
  }

  /**
   * Ember.run timer
   *
   * @property timer
   * @private
   */
  timer: Timer | null = null;

  /**
   * Use CSS transitions?
   *
   * @property usesTransition
   * @type boolean
   * @readonly
   * @private
   */
  get usesTransition() {
    return !isFastBoot(this) && this.args.fade !== false;
  }

  /**
   * The DOM element of the overlay element.
   *
   * @property overlayElement
   * @type object
   * @readonly
   * @private
   */
  @ref('overlayElement')
  declare overlayElement?: HTMLDivElement;

  /**
   * This action is called immediately when the tooltip/popover is about to be shown.
   *
   * @event onShow
   * @public
   */

  /**
   * This action will be called when the tooltip/popover has been made visible to the user (will wait for CSS transitions to complete).
   *
   * @event onShown
   * @public
   */

  /**
   * This action is called immediately when the tooltip/popover is about to be hidden.
   *
   * @event onHide
   * @public
   */

  /**
   * This action is called when the tooltip/popover has finished being hidden from the user (will wait for CSS transitions to complete).
   *
   * @event onHidden
   * @public
   */

  /**
   * Called when a show event has been received
   *
   * @method enter
   * @param e
   * @private
   */
  enter(e?: Event) {
    if (e) {
      const eventType = e.type === 'focusin' ? 'focus' : 'hover';
      this[eventType] = true;
    }

    if (this.showHelp || this.hoverState === HOVERSTATE_IN) {
      this.hoverState = HOVERSTATE_IN;
      return;
    }

    if (this.timer) {
      cancel(this.timer);
    }

    this.hoverState = HOVERSTATE_IN;

    if (!this.delayShow) {
      return this.show();
    }

    this.timer = later(
      this,
      function () {
        if (this.hoverState === HOVERSTATE_IN) {
          this.show();
        }
      },
      this.delayShow,
    );
  }

  /**
   * Called when a hide event has been received
   *
   * @method leave
   * @param e
   * @private
   */
  leave(e?: Event) {
    if (e) {
      const eventType = e.type === 'focusout' ? 'focus' : 'hover';
      this[eventType] = false;
    }

    if (this.shouldShowHelp) {
      return;
    }

    if (this.timer) {
      cancel(this.timer);
    }

    this.hoverState = HOVERSTATE_OUT;

    if (!this.delayHide) {
      return this.hide();
    }

    this.timer = later(() => {
      if (this.hoverState === HOVERSTATE_OUT) {
        this.hide();
      }
    }, this.delayHide);
  }

  /**
   * Called for a click event
   *
   * @method toggle
   * @private
   */
  toggle() {
    this.click = !this.click;
    if (this.shouldShowHelp) {
      this.enter();
    } else {
      this.leave();
    }
  }

  /**
   * Show the tooltip/popover
   *
   * @method show
   * @private
   */
  show() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    if (false === this.args.onShow?.()) {
      return;
    }

    this.inDom = true;
    schedule('afterRender', this, this._show);
  }

  _show(skipTransition = false) {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }
    this.showHelp = true;

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

    // See https://github.com/twbs/bootstrap/pull/22481
    if ('ontouchstart' in document.documentElement) {
      const { children } = document.body;
      for (const child of children) {
        child.addEventListener('mouseover', noop);
      }
    }

    const tooltipShowComplete = () => {
      if (this.isDestroyed) {
        return;
      }
      const prevHoverState = this.hoverState;

      this.args.onShown?.();
      this.hoverState = HOVERSTATE_NONE;

      if (prevHoverState === HOVERSTATE_OUT) {
        this.leave();
      }
    };

    if (
      skipTransition === false &&
      this.usesTransition &&
      this.overlayElement
    ) {
      transitionEnd(this.overlayElement, this.transitionDuration).then(
        tooltipShowComplete,
      );
    } else {
      tooltipShowComplete();
    }
  }

  /**
   * Hide the tooltip/popover
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.isDestroyed) {
      return;
    }

    if (false === this.args.onHide?.()) {
      return;
    }

    const tooltipHideComplete = () => {
      if (this.isDestroyed) {
        return;
      }
      if (this.hoverState !== HOVERSTATE_IN) {
        this.inDom = false;
      }
      this.args.onHidden?.();
    };

    this.showHelp = false;

    // if this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      const { children } = document.body;
      for (const child of children) {
        child.removeEventListener('mouseover', noop);
      }
    }

    if (this.usesTransition && this.overlayElement) {
      transitionEnd(this.overlayElement, this.transitionDuration).then(
        tooltipHideComplete,
      );
    } else {
      tooltipHideComplete();
    }

    this.hoverState = HOVERSTATE_NONE;
  }

  /**
   * @method addListeners
   * @private
   */
  addListeners() {
    const target = this.triggerTargetElement;
    assert('triggerTargetElement expected.', target);

    this._triggerEvents.forEach((event) => {
      if (typeof event === 'string') {
        target.addEventListener(event, this._handleToggle);
      } else {
        const [inEvent, outEvent] = event;
        target.addEventListener(inEvent, this._handleEnter);
        target.addEventListener(outEvent, this._handleLeave);
      }
    });
  }

  /**
   * @method removeListeners
   * @private
   */
  removeListeners() {
    try {
      const target = this.triggerTargetElement;
      assert('triggerTargetElement expected.', target);

      this._triggerEvents.forEach((event) => {
        if (typeof event === 'string') {
          target.removeEventListener(event, this._handleToggle);
        } else {
          const [inEvent, outEvent] = event;
          target.removeEventListener(inEvent, this._handleEnter);
          target.removeEventListener(outEvent, this._handleLeave);
        }
      });
    } catch (e) {} // eslint-disable-line no-empty
  }

  /**
   * @method handleTriggerEvent
   * @private
   */
  handleTriggerEvent(handler: (e: Event) => void, e: Event) {
    const overlayElement = this.overlayElement;
    if (overlayElement && overlayElement.contains(e.target as Element)) {
      return;
    }
    return handler.call(this, e);
  }

  @action
  _handleEnter(e: Event) {
    this.handleTriggerEvent(this.enter, e);
  }

  @action
  _handleLeave(e: Event) {
    this.handleTriggerEvent(this.leave, e);
  }

  @action
  _handleToggle(e: Event) {
    this.handleTriggerEvent(this.toggle, e);
  }

  @action
  close() {
    // Make sure our click state is off, otherwise the next click would
    // close the already-closed tooltip/popover. We don't need to worry
    // about this for hover/focus because those aren't "stateful" toggle
    // events like click.
    this.click = false;
    this.hide();
  }

  @action
  setup() {
    if (typeof FastBoot !== 'undefined') {
      // ember-render-helpers calls this also in FastBoot, so guard against this
      return;
    }
    let parent = this._parentFinder?.parentNode as HTMLElement | undefined;
    // In the rare case of using FastBoot w/ rehydration, the parent finder TextNode rendered by FastBoot will be reused,
    // so our own instance on the component is not rendered, only exists here as detached from DOM and thus has no parent.
    // In this case we try to use Ember's private API as a fallback.
    // Related: https://github.com/emberjs/rfcs/issues/168
    if (!parent) {
      try {
        // @ts-expect-error getViewBounds' type does not allow passing a Glimmer component
        parent = Ember.ViewUtils.getViewBounds(this).parentElement;
      } catch (e) {
        // we catch the possibly broken private API call, the component can still work if the trigger element is defined
        // using a CSS selector.
      }
    }
    this._parent = parent;

    // Look for target element after rendering has finished, in case the target DOM element is rendered *after* us
    // see https://github.com/kaliber5/ember-bootstrap/issues/1329
    schedule('afterRender', () => {
      this.triggerTargetElement = this.getTriggerTargetElement();
      this.addListeners();
      if (this.visible) {
        next(this, this.show);
      }
    });
  }

  @action
  showOrHide() {
    if (this.args.visible) {
      next(this, this.show);
    } else {
      next(this, this.hide);
    }
  }

  willDestroy() {
    super.willDestroy();
    this.removeListeners();
  }
}
