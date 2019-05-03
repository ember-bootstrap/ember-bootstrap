import { or, reads, gt } from '@ember/object/computed';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { isArray } from '@ember/array';
import EmberObject, { observer, computed } from '@ember/object';
import { next, schedule, cancel, later, run } from '@ember/runloop';
import TransitionSupport from 'ember-bootstrap/mixins/transition-support';
import transitionEnd from 'ember-bootstrap/utils/transition-end';

const InState = EmberObject.extend({
  hover: false,
  focus: false,
  click: false,
  showHelp: or('hover', 'focus', 'click')
});

function noop() {}

/**

 @class Components.ContextualHelp
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TransitionSupport
 @private
 */
let component = Component.extend(TransitionSupport, {
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
  autoPlacement: true,

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
  inDom: false,

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
  showHelp: reads('visible'),

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
  delayShow: reads('delay'),

  /**
   * Delay hiding the tooltip/popover. This property overrides the general delay set with the `delay` property.
   *
   * @property delayHide
   * @type number
   * @default 0
   * @public
   */
  delayHide: reads('delay'),

  hasDelayShow: gt('delayShow', 0),
  hasDelayHide: gt('delayHide', 0),

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
   * @method getTriggerTargetElement
   * @private
   */
  getTriggerTargetElement() {
    let triggerElement = this.get('triggerElement');

    if (!triggerElement) {
      return this._parent;
    } else if (triggerElement === 'parentView') {
      return this.get('parentView.element');
    } else {
      return document.querySelector(triggerElement);
    }
  },

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
    if (this.get('isDestroyed') || this.get('isDestroying')) {
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
    this.set('showHelp', true);

    // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

    // See https://github.com/twbs/bootstrap/pull/22481
    if ('ontouchstart' in document.documentElement) {
      let { children } = document.body;
      for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('mouseover', noop);
      }
    }

    let tooltipShowComplete = () => {
      if (this.get('isDestroyed')) {
        return;
      }
      let prevHoverState = this.get('hoverState');

      this.get('onShown')(this);
      this.set('hoverState', null);

      if (prevHoverState === 'out') {
        this.leave();
      }
    };

    if (skipTransition === false && this.get('usesTransition')) {
      transitionEnd(this.get('overlayElement'), this.get('transitionDuration'))
        .then(tooltipShowComplete);
    } else {
      tooltipShowComplete();
    }
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

    let tooltipHideComplete = () => {
      if (this.get('isDestroyed')) {
        return;
      }
      if (this.get('hoverState') !== 'in') {
        this.set('inDom', false);
      }
      this.get('onHidden')(this);
    };

    this.set('showHelp', false);

    // if this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      let { children } = document.body;
      for (let i = 0; i < children.length; i++) {
        children[i].removeEventListener('mouseover', noop);
      }
    }

    if (this.get('usesTransition')) {
      transitionEnd(this.get('overlayElement'), this.get('transitionDuration'))
        .then(tooltipHideComplete);
    } else {
      tooltipHideComplete();
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
    try {
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
    } catch(e) {} // eslint-disable-line no-empty
  },

  /**
   * @method handleTriggerEvent
   * @private
   */
  handleTriggerEvent(handler, e) {
    let overlayElement = this.get('overlayElement');
    if (overlayElement && overlayElement.contains(e.target)) {
      return;
    }
    return handler.call(this, e);
  },

  actions: {
    close() {
      // Make sure our click state is off, otherwise the next click would
      // close the already-closed tooltip/popover. We don't need to worry
      // about this for hover/focus because those aren't "stateful" toggle
      // events like click.
      this.set('inState.click', false);
      this.hide();
    }
  },

  init() {
    this._super(...arguments);
    this._handleEnter = run.bind(this, this.handleTriggerEvent, this.enter);
    this._handleLeave = run.bind(this, this.handleTriggerEvent, this.leave);
    this._handleToggle = run.bind(this, this.handleTriggerEvent, this.toggle);
    this._parentFinder = self.document ? self.document.createTextNode('') : '';
    this.inDom = this.get('visible') && this.get('triggerTargetElement');
  },

  didInsertElement() {
    this._super(...arguments);
    this._parent = this._parentFinder.parentNode;
    this.triggerTargetElement = this.getTriggerTargetElement();
    this.addListeners();
    if (this.get('visible')) {
      next(this, this.show, true);
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

Object.defineProperties(component.prototype, {

  /**
   * The DOM element of the overlay element.
   *
   * @property overlayElement
   * @type object
   * @readonly
   * @private
   */
  overlayElement: {
    get() {
      return document.getElementById(this.get('overlayId'));
    }
  }
});

export default component;
