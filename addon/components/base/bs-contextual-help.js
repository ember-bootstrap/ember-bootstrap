import Ember from 'ember';
import TransitionSupport from 'ember-bootstrap/mixins/transition-support';
import getPosition from 'ember-bootstrap/utils/get-position';
import getCalculatedOffset from 'ember-bootstrap/utils/get-calculated-offset';
import getParent from 'ember-bootstrap/utils/get-parent';
import setOffset from 'ember-bootstrap/utils/set-offset';
import transitionEnd from 'ember-bootstrap/utils/transition-end';

const {
  assert,
  Component,
  computed,
  guidFor,
  isArray,
  isBlank,
  observer,
  run,
  run: {
    later,
    cancel,
    schedule,
    next
  }
} = Ember;

const InState = Ember.Object.extend({
  hover: false,
  focus: false,
  click: false,
  showHelp: computed.or('hover', 'focus', 'click')
});

/**

 @class Components.ContextualHelp
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TransitionSupport
 @private
 */
export default Component.extend(TransitionSupport, {
  tagName: '',

  /**
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * How to position the tooltip/popover - top | bottom | left | right
   *
   * @property title
   * @type string
   * @default 'top'
   * @public
   */
  placement: 'top',

  _placement: computed.reads('placement'),

  /**
   * When `true` it will dynamically reorient the tooltip/popover. For example, if `placement` is "left", the
   * tooltip/popover will display to the left when possible, otherwise it will display right.
   *
   * @property autoPlacement
   * @type boolean
   * @default false
   * @public
   */
  autoPlacement: false,

  /**
   * You can programmatically show the tooltip/popover by setting this to `true`
   *
   * @property visible
   * @type boolean
   * @default false
   * @public
   */
  visible: false,

  /**
   * @property inDom
   * @type boolean
   * @private
   */
  inDom: computed.reads('visible'),

  /**
   * Set to false to disable fade animations.
   *
   * @property fade
   * @type boolean
   * @default true
   * @public
   */
  fade: true,

  /**
   * Used to apply Bootstrap's visibility class
   *
   * @property showHelp
   * @type boolean
   * @default false
   * @private
   */
  showHelp: computed.reads('visible'),

  /**
   * Delay showing and hiding the tooltip/popover (ms). Individual delays for showing and hiding can be specified by using the
   * `delayShow` and `delayHide` properties.
   *
   * @property delay
   * @type number
   * @default 0
   * @public
   */
  delay: 0,

  /**
   * Delay showing the tooltip/popover. This property overrides the general delay set with the `delay` property.
   *
   * @property delayShow
   * @type number
   * @default 0
   * @public
   */
  delayShow: computed.reads('delay'),

  /**
   * Delay hiding the tooltip/popover. This property overrides the general delay set with the `delay` property.
   *
   * @property delayHide
   * @type number
   * @default 0
   * @public
   */
  delayHide: computed.reads('delay'),

  hasDelayShow: computed.gt('delayShow', 0),
  hasDelayHide: computed.gt('delayHide', 0),

  /**
   * The duration of the fade transition
   *
   * @property transitionDuration
   * @type number
   * @default 150
   * @public
   */
  transitionDuration: 150,

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
  viewportSelector: 'body',

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
  viewportPadding: 0,

  /**
   * The id of the overlay element.
   *
   * @property overlayId
   * @type string
   * @readonly
   * @private
   */
  overlayId: computed(function() {
    return `overlay-${guidFor(this)}`;
  }),

  /**
   * The DOM element of the overlay element.
   *
   * @property overlayElement
   * @type object
   * @readonly
   * @private
   */
  overlayElement: computed('overlayId', function() {
    return document.getElementById(this.get('overlayId'));
  }).volatile(),

  /**
   * The DOM element of the arrow element.
   *
   * @property arrowElement
   * @type object
   * @readonly
   * @private
   */
  arrowElement: null,

  /**
   * The DOM element of the viewport element.
   *
   * @property viewportElement
   * @type object
   * @readonly
   * @private
   */
  viewportElement: computed('viewportSelector', function() {
    return document.querySelector(this.get('viewportSelector'));
  }),

  /**
   * The DOM element that triggers the tooltip/popover. By default it is the parent element of this component.
   * You can set this to any CSS selector to have any other element trigger the tooltip/popover.
   * With the special value of "parentView" you can attach the tooltip/popover to the parent component's element.
   *
   * @property triggerElement
   * @type string
   * @public
   */
  triggerElement: null,

  /**
   * @property triggerTargetElement
   * @type {object}
   * @private
   */
  triggerTargetElement: computed('triggerElement', function() {
    let triggerElement = this.get('triggerElement');
    let el;

    if (isBlank(triggerElement)) {
      el = getParent(this);
    } else if (triggerElement === 'parentView') {
      el = this.get('parentView.element');
    } else {
      el = document.querySelector(triggerElement);
    }
    assert('Trigger element for tooltip/popover must be present', el);
    return el;
  }),

  /**
   * The event(s) that should trigger the tooltip/popover - click | hover | focus.
   * You can set this to a single event or multiple events, given as an array or a string separated by spaces.
   *
   * @property triggerEvents
   * @type array|string
   * @default 'hover focus'
   * @public
   */
  triggerEvents: 'hover focus',

  _triggerEvents: computed('triggerEvents', function() {
    let events = this.get('triggerEvents');
    if (!isArray(events)) {
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
  }),

  /**
   * If true component will render in place, rather than be wormholed.
   *
   * @property renderInPlace
   * @type boolean
   * @default false
   * @public
   */
  renderInPlace: false,

  /**
   * @property _renderInPlace
   * @type boolean
   * @private
   */
  _renderInPlace: computed('renderInPlace', function() {
    return this.get('renderInPlace') || typeof document === 'undefined' || !document.getElementById('ember-bootstrap-wormhole');
  }),

  /**
   * Current hover state, 'in', 'out' or null
   *
   * @property hoverState
   * @type string
   * @private
   */
  hoverState: null,

  /**
   * Current state for events
   *
   * @property inState
   * @type {InState}
   * @private
   */
  inState: computed(function() {
    return InState.create();
  }),

  /**
   * Ember.run timer
   *
   * @property timer
   * @private
   */
  timer: null,

  /**
   * This action is called immediately when the tooltip/popover is about to be shown.
   *
   * @event onShow
   * @public
   */
  onShow() {
  },

  /**
   * This action will be called when the tooltip/popover has been made visible to the user (will wait for CSS transitions to complete).
   *
   * @event onShown
   * @public
   */
  onShown() {
  },

  /**
   * This action is called immediately when the tooltip/popover is about to be hidden.
   *
   * @event onHide
   * @public
   */
  onHide() {
  },

  /**
   * This action is called when the tooltip/popover has finished being hidden from the user (will wait for CSS transitions to complete).
   *
   * @event onHidden
   * @public
   */
  onHidden() {
  },

  /**
   * Called when a show event has been received
   *
   * @method enter
   * @param e
   * @private
   */
  enter(e) {
    if (e) {
      let eventType = e.type === 'focusin' ? 'focus' : 'hover';
      this.get('inState').set(eventType, true);
    }

    if (this.get('showHelp') || this.get('hoverState') === 'in') {
      this.set('hoverState', 'in');
      return;
    }

    cancel(this.timer);

    this.set('hoverState', 'in');

    if (!this.get('hasDelayShow')) {
      return this.show();
    }

    this.timer = later(this, function() {
      if (this.get('hoverState') === 'in') {
        this.show();
      }
    }, this.get('delayShow'));
  },

  /**
   * Called when a hide event has been received
   *
   * @method leave
   * @param e
   * @private
   */
  leave(e) {
    if (e) {
      let eventType = e.type === 'focusout' ? 'focus' : 'hover';
      this.get('inState').set(eventType, false);
    }

    if (this.get('inState.showHelp')) {
      return;
    }

    cancel(this.timer);

    this.set('hoverState', 'out');

    if (!this.get('hasDelayHide')) {
      return this.hide();
    }

    this.timer = later(this, function() {
      if (this.get('hoverState') === 'out') {
        this.hide();
      }
    }, this.get('delayHide'));
  },

  /**
   * Called for a click event
   *
   * @method toggle
   * @param e
   * @private
   */
  toggle(e) {
    if (e) {
      this.get('inState').toggleProperty('click');
      if (this.get('inState.showHelp')) {
        this.enter();
      } else {
        this.leave();
      }
    } else {
      if (this.get('showHelp')) {
        this.leave();
      } else {
        this.enter();
      }
    }
  },

  /**
   * Show the tooltip/popover
   *
   * @method show
   * @private
   */
  show() {
    if (this.get('isDestroyed')) {
      return;
    }

    if (false === this.get('onShow')(this)) {
      return;
    }

    // this waits for the tooltip/popover element to be created. when animating a wormholed tooltip/popover we need to wait until
    // ember-wormhole has moved things in the DOM for the animation to be correct, so use Ember.run.next in this case
    let delayFn = !this.get('_renderInPlace') && this.get('fade') ? next : function(target, fn) {
      schedule('afterRender', target, fn);
    };

    this.set('inDom', true);
    delayFn(this, this._show);
  },

  _show(skipTransition = false) {
    let element = this.get('triggerTargetElement');
    let placement = this.get('placement');

    // this.$element.attr('aria-describedby', tipId) @todo ?

    let tip = this.get('overlayElement');
    tip.style.top = 0;
    tip.style.left = 0;
    tip.style.display = 'block';

    let pos = getPosition(element);
    let actualWidth = tip.offsetWidth;
    let actualHeight = tip.offsetHeight;

    if (this.get('autoPlacement')) {
      let viewportDim = getPosition(this.get('viewportElement'));

      placement = placement === 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'
        : placement === 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom'
          : placement === 'right' && pos.right + actualWidth > viewportDim.width ? 'left'
            : placement === 'left' && pos.left - actualWidth < viewportDim.left ? 'right'
              : placement;
    }

    this.set('_placement', placement);

    let calculatedOffset = getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    this.applyPlacement(calculatedOffset, placement);

    function tooltipShowComplete() {
      if (this.get('isDestroyed')) {
        return;
      }
      let prevHoverState = this.get('hoverState');

      this.get('onShown')(this);
      this.set('hoverState', null);

      if (prevHoverState === 'out') {
        this.leave();
      }
    }

    if (skipTransition === false && this.get('usesTransition')) {
      transitionEnd(this.get('overlayElement'), tooltipShowComplete, this, this.get('transitionDuration'));
    } else {
      tooltipShowComplete.call(this);
    }
  },

  /**
   * Position the tooltip/popover
   *
   * @method applyPlacement
   * @param offset
   * @param placement
   * @private
   */
  applyPlacement(offset, placement) {
    let tip = this.get('overlayElement');
    let width = tip.offsetWidth;
    let height = tip.offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    let marginTop = parseInt(window.getComputedStyle(tip).marginTop, 10);
    let marginLeft = parseInt(window.getComputedStyle(tip).marginLeft, 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) {
      marginTop = 0;
    }
    if (isNaN(marginLeft)) {
      marginLeft = 0;
    }

    offset.top += marginTop;
    offset.left += marginLeft;

    setOffset(tip, offset);

    this.set('showHelp', true);

    schedule('afterRender', () => {
      // check to see if placing tip in new offset caused the tip to resize itself
      let actualWidth = tip.offsetWidth;
      let actualHeight = tip.offsetHeight;

      if (placement === 'top' && actualHeight !== height) {
        offset.top = offset.top + height - actualHeight;
      }

      let delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

      if (delta.left) {
        offset.left += delta.left;
      } else {
        offset.top += delta.top;
      }

      let isVertical = /top|bottom/.test(placement);
      let arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
      let arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

      setOffset(tip, offset);
      this.replaceArrow(arrowDelta, tip[arrowOffsetPosition], isVertical);
    });
  },

  /**
   * @method getViewportAdjustedDelta
   * @param placement
   * @param pos
   * @param actualWidth
   * @param actualHeight
   * @return {{top: number, left: number}}
   * @private
   */
  getViewportAdjustedDelta(placement, pos, actualWidth, actualHeight) {
    let delta = { top: 0, left: 0 };
    let viewport = this.get('viewportElement');
    if (!viewport) {
      return delta;
    }

    let viewportPadding = this.get('viewportPadding');
    let viewportDimensions = getPosition(viewport);

    if (/right|left/.test(placement)) {
      let topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      let bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      let leftEdgeOffset = pos.left - viewportPadding;
      let rightEdgeOffset = pos.left + viewportPadding + actualWidth;
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  },

  /**
   * Position the tooltip/popover's arrow
   *
   * @method replaceArrow
   * @param delta
   * @param dimension
   * @param isVertical
   * @private
   */
  replaceArrow(delta, dimension, isVertical) {
    let el = this.get('arrowElement');
    el.style[isVertical ? 'left' : 'top'] = `${50 * (1 - delta / dimension)}%`;
    el.style[isVertical ? 'top' : 'left'] = null;
  },

  /**
   * Hide the tooltip/popover
   *
   * @method hide
   * @private
   */
  hide() {
    if (this.get('isDestroyed')) {
      return;
    }

    if (false === this.get('onHide')(this)) {
      return;
    }

    function tooltipHideComplete() {
      if (this.get('isDestroyed')) {
        return;
      }
      if (this.get('hoverState') !== 'in') {
        this.set('inDom', false);
      }
      this.get('onHidden')(this);
    }

    this.set('showHelp', false);

    if (this.get('usesTransition')) {
      transitionEnd(this.get('overlayElement'), tooltipHideComplete, this, this.get('transitionDuration'));
    } else {
      tooltipHideComplete.call(this);
    }

    this.set('hoverState', null);
  },

  /**
   * @method addListeners
   * @private
   */
  addListeners() {
    let target = this.get('triggerTargetElement');

    this.get('_triggerEvents')
      .forEach((event) => {
        if (isArray(event)) {
          let [inEvent, outEvent] = event;
          target.addEventListener(inEvent, this._handleEnter);
          target.addEventListener(outEvent, this._handleLeave);
        } else {
          target.addEventListener(event, this._handleToggle);
        }
      });
  },

  /**
   * @method removeListeners
   * @private
   */
  removeListeners() {
    let target = this.get('triggerTargetElement');
    this.get('_triggerEvents')
      .forEach((event) => {
        if (isArray(event)) {
          let [inEvent, outEvent] = event;
          target.removeEventListener(inEvent, this._handleEnter);
          target.removeEventListener(outEvent, this._handleLeave);
        } else {
          target.removeEventListener(event, this._handleToggle);
        }
      });
  },

  init() {
    this._super(...arguments);
    this._handleEnter = run.bind(this, this.enter);
    this._handleLeave = run.bind(this, this.leave);
    this._handleToggle = run.bind(this, this.toggle);
  },

  didInsertElement() {
    this._super(...arguments);
    this.addListeners();
    if (this.get('visible')) {
      next(this, this._show, true);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeListeners();
  },

  _watchVisible: observer('visible', function() {
    if (this.get('visible')) {
      this.show();
    } else {
      this.hide();
    }
  })

});
