import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cancel, later, next, schedule, type Timer } from '@ember/runloop';
import transitionEnd from 'ember-bootstrap/utils/transition-end';
import { getDestinationElement } from 'ember-bootstrap/utils/dom';
import usesTransition from 'ember-bootstrap/utils/decorators/uses-transition';
import { assert } from '@ember/debug';
import { getViewBounds } from '@ember/-internals/views';
import arg from '../utils/decorators/arg';
import { tracked } from '@glimmer/tracking';
import { ref } from 'ember-ref-bucket';
import type { View } from '@ember/-internals/glimmer/lib/renderer';
import type { Placement } from '@popperjs/core';
import type { SimpleElement } from '@simple-dom/interface';

const HOVERSTATE_NONE = 'none';
const HOVERSTATE_IN = 'in';
const HOVERSTATE_OUT = 'out';

function noop() {}

export interface ContextualHelpSignature {
  Args: {
    autoPlacement?: boolean;
    delay?: number;
    delayHide?: number;
    delayShow?: number;
    fade?: boolean;
    onHide?: <T extends ContextualHelpSignature>(
      self: ContextualHelp<T>,
    ) => unknown;
    onHidden?: <T extends ContextualHelpSignature>(
      self: ContextualHelp<T>,
    ) => unknown;
    onShow?: <T extends ContextualHelpSignature>(
      self: ContextualHelp<T>,
    ) => unknown;
    onShown?: <T extends ContextualHelpSignature>(
      self: ContextualHelp<T>,
    ) => unknown;
    placement?: Placement;
    renderInPlace?: boolean;
    transitionDuration?: number;
    title?: string;
    triggerElement?: string | null;
    triggerEvents?: string | string[];
    viewportPadding?: number;
    viewportSelector?: string;
    visible?: boolean;
  };
}

/**
  @class ContextualHelp
  @namespace Components
  @extends Glimmer.Component
  @private
*/
export default abstract class ContextualHelp<
  Signature extends ContextualHelpSignature,
> extends Component<Signature> {
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
   * By default, it will dynamically reorient the tooltip/popover based on the available space in the viewport. For
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
  @tracked _inDom?: boolean;

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

  _parent?: Element | SimpleElement | null;

  _parentFinder = self.document ? self.document.createTextNode('') : '';

  /**
   * The DOM element of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  abstract get arrowElement(): HTMLElement | null;

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
   * The DOM element that triggers the tooltip/popover. By default, it is the parent element of this component.
   * You can set this to any CSS selector to have any other element trigger the tooltip/popover.
   *
   * @property triggerElement
   * @type string | null
   * @public
   */
  @arg
  triggerElement = null;

  triggerTargetElement?: Element | SimpleElement | null;

  /**
   * @method getTriggerTargetElement
   * @private
   */
  getTriggerTargetElement(): Element | SimpleElement | undefined | null {
    const triggerElement = this.triggerElement;
    let el;

    if (!triggerElement) {
      el = this._parent;
    } else {
      el = document.querySelector(triggerElement);
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
  triggerEvents: string[] | string = 'hover focus';

  get _triggerEvents() {
    let events = this.triggerEvents;
    if (typeof events === 'string') {
      events = events.split(' ');
    }

    return events.map((event) => {
      switch (event) {
        case 'hover':
          return ['mouseenter', 'mouseleave'];
        case 'focus':
          return ['focusin', 'focusout'];
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
  @usesTransition('fade')
  declare usesTransition: boolean;

  /**
   * The DOM element of the overlay element.
   *
   * @property overlayElement
   * @type object
   * @readonly
   * @private
   */
  @ref('overlayElement') declare overlayElement: HTMLElement;

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

    cancel(this.timer ?? undefined);

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

    cancel(this.timer ?? undefined);

    this.hoverState = HOVERSTATE_OUT;

    if (!this.delayHide) {
      return this.hide();
    }

    this.timer = later((): void => {
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

    if (false === this.args.onShow?.(this)) {
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
      for (const child of document.body.children) {
        child.addEventListener('mouseover', noop);
      }
    }

    const tooltipShowComplete = () => {
      if (this.isDestroyed) {
        return;
      }
      const prevHoverState = this.hoverState;

      this.args.onShown?.(this);
      this.hoverState = HOVERSTATE_NONE;

      if (prevHoverState === HOVERSTATE_OUT) {
        this.leave();
      }
    };

    if (!skipTransition && this.usesTransition && this.overlayElement) {
      transitionEnd(this.overlayElement, this.transitionDuration).then(
        tooltipShowComplete,
      );
    } else {
      tooltipShowComplete();
    }
  }

  /**
   * Position the tooltip/popover's arrow
   *
   * @method replaceArrow
   * @param delta
   * @param dimension
   * @param isVertical
   * @private
   */
  replaceArrow(delta: number, dimension: number, isVertical: boolean) {
    const el = this.arrowElement;
    if (!el) {
      return;
    }
    el.style[isVertical ? 'left' : 'top'] = `${50 * (1 - delta / dimension)}%`;
    el.style[isVertical ? 'top' : 'left'] = '';
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

    if (false === this.args.onHide?.(this)) {
      return;
    }

    const tooltipHideComplete = () => {
      if (this.isDestroyed) {
        return;
      }
      if (this.hoverState !== HOVERSTATE_IN) {
        this.inDom = false;
      }
      this.args.onHidden?.(this);
    };

    this.showHelp = false;

    // if this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      for (const child of document.body.children) {
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

    if (!target || !(target instanceof Element)) {
      return;
    }

    this._triggerEvents.forEach((event) => {
      if (typeof event === 'string') {
        target.addEventListener(event, this._handleToggle);
      } else {
        const [inEvent, outEvent] = event;
        if (inEvent) {
          target.addEventListener(inEvent, this._handleEnter);
        }
        if (outEvent) {
          target.addEventListener(outEvent, this._handleLeave);
        }
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

      if (!target || !(target instanceof Element)) {
        return;
      }

      this._triggerEvents.forEach((event) => {
        if (typeof event === 'string') {
          target.removeEventListener(event, this._handleToggle);
        } else {
          const [inEvent, outEvent] = event;
          if (inEvent) {
            target.removeEventListener(inEvent, this._handleEnter);
          }
          if (outEvent) {
            target.removeEventListener(outEvent, this._handleLeave);
          }
        }
      });
    } catch (e) {} // eslint-disable-line no-empty
  }

  /**
   * @method handleTriggerEvent
   * @private
   */
  handleTriggerEvent(handler: (event: Event) => unknown, e: Event) {
    const overlayElement = this.overlayElement;
    if (
      overlayElement &&
      e.target instanceof Node &&
      overlayElement.contains(e.target)
    ) {
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

    if (typeof this._parentFinder === 'string') {
      return;
    }

    let parent: ParentNode | SimpleElement | null =
      this._parentFinder.parentNode;
    if (!(parent instanceof Element)) {
      return;
    }
    // In the rare case of using FastBoot w/ rehydration, the parent finder TextNode rendered by FastBoot will be reused,
    // so our own instance on the component is not rendered, only exists here as detached from DOM and thus has no parent.
    // In this case we try to use Ember's private API as a fallback.
    // Related: https://github.com/emberjs/rfcs/issues/168
    if (!parent) {
      try {
        parent = getViewBounds(this as unknown as View).parentElement;
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
