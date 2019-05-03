import CarouselSlide from 'ember-bootstrap/components/bs-carousel/slide';
import Component from '@ember/component';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import layout from 'ember-bootstrap/templates/components/bs-carousel';
import { computed, observer } from '@ember/object';
import { filter, lte, gt, readOnly } from '@ember/object/computed';
import { schedule, scheduleOnce } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';
import RSVP from 'rsvp';

/**
  Ember implementation of Bootstrap's Carousel. Supports all original features but API is partially different:

  | Description | Original | Component |
  | ------ | ------ | ------ |
  | Autoplays after first user event or on page load. | ride='carousel'\|false | autoPlay=false\|true |
  | Disable automatic cycle. | interval=false | interval=0 |
  | If first slide should follow last slide on "previous" event, the opposite will also be true for "next" event. | wrap=false\|true | wrap=false\|true |
  | Jumps into specific slide index | data-slide-to=n | index=n |
  | Keyboard events. | keyboard=false\|true | keyboard=false\|true |
  | Left-to-right or right-to-left sliding. | N/A |  ltr=false\|true |
  | Pause current cycle on mouse enter. | pause='hover'\|null | pauseOnMouseEnter=false\|true |
  | Show or hide controls  | Tag manipulation. | showControls=false\|true |
  | Show or hide indicators  | Tag manipulation. | showIndicators=false\|true |
  | Waiting time of slides in a automatic cycle. | interval=n | interval=n |

  Default settings are the same as the original so you don't have to worry about changing parameters.

 ```hbs
  {{#bs-carousel as |car|}}
    {{#car.slide}}
      <img alt="First slide" src="slide1.jpg">
    {{/car.slide}}
    {{#car.slide}}
      <img alt="Second slide" src="slide2.jpg">
    {{/car.slide}}
    {{#car.slide}}
      <img alt="Third slide" src="slide3.jpg">
    {{/car.slide}}
  {{/bs-carousel}}
 ```

  To better understand the whole documentation, you should be aware of the following operations:

  | Operation | Description |
  | ------ | ------ |
  | Transition | Swaps two slides. |
  | Interval | Waiting time after a transition. |
  | Presentation | Represents a single transition, or a single interval, or the union of both. |
  | Cycle | Presents all slides until it reaches first or last slide. |
  | Wrap | wrap slides, cycles without stopping at first or last slide. |
  ```

  @class Carousel
  @namespace Components
  @extends Ember.Component
  @public
 */
export default Component.extend(ComponentParent, {
  attributeBindings: ['tabindex'],
  classNames: ['carousel', 'slide'],
  layout,
  tabindex: '1',

  /**
   * @property slideComponent
   * @type {String}
   * @private
   */
  slideComponent: 'bs-carousel/slide',

  /**
   * If a slide can turn to left, including corners.
   *
   * @private
   * @property canTurnToLeft
   */
  canTurnToLeft: computed('wrap', 'currentIndex', function() {
    return this.get('wrap') || this.get('currentIndex') > 0;
  }),

  /**
   * If a slide can turn to right, including corners.
   *
   * @private
   * @property canTurnToRight
   */
  canTurnToRight: computed('childSlides.length', 'wrap', 'currentIndex', function() {
    return this.get('wrap') || this.get('currentIndex') < this.get('childSlides.length') - 1;
  }),

  /**
   * All `CarouselSlide` child components.
   *
   * @private
   * @property childSlides
   * @readonly
   * @type array
   */
  childSlides: filter('children', function(view) {
    return view instanceof CarouselSlide;
  }).readOnly(),

  /**
   * This observer is the entry point for real time insertion and removing of slides.
   *
   * @private
   * @property childSlidesObserver
   */
  childSlidesObserver: observer('childSlides.[]', 'autoPlay', function() {
    scheduleOnce('actions', () => {
      let childSlides = this.get('childSlides');
      if (childSlides.length === 0) {
        return;
      }
      // Sets new current index
      let currentIndex = this.get('currentIndex');
      if (currentIndex >= childSlides.length) {
        currentIndex = childSlides.length - 1;
        this.set('currentIndex', currentIndex);
      }
      // Automatic sliding
      if (this.get('autoPlay')) {
        this.get('waitIntervalToInitCycle').perform();
      }
      // Initial slide state
      this.set('presentationState', null);
    });
  }),

  /**
   * Indicates the current index of the current slide.
   *
   * @property currentIndex
   * @private
   */
  currentIndex: null,

  /**
   * The current slide object that is going to be used by the nested slides components.
   *
   * @property currentSlide
   * @private
   *
   */
  currentSlide: computed('childSlides', 'currentIndex', function() {
    return this.get('childSlides').objectAt(this.get('currentIndex'));
  }).readOnly(),

  /**
   * Bootstrap style to indicate that a given slide should be moving to left/right.
   *
   * @property directionalClassName
   * @private
   * @type string
   */
  directionalClassName: null,

  /**
   * Indicates the next slide index to move into.
   *
   * @property followingIndex
   * @private
   * @type number
   */
  followingIndex: null,

  /**
   * The following slide object that is going to be used by the nested slides components.
   *
   * @property followingIndex
   * @private
   */
  followingSlide: computed('childSlides', 'followingIndex', function() {
    return this.get('childSlides').objectAt(this.get('followingIndex'));
  }).readOnly(),

  /**
   * @private
   * @property hasInterval
   * @type boolean
   */
  hasInterval: gt('interval', 0).readOnly(),

  /**
   * This observer is the entry point for programmatically slide changing.
   *
   * @property indexObserver
   * @private
   */
  indexObserver: observer('index', function() {
    this.send('toSlide', this.get('index'));
  }),

  /**
   * @property indicators
   * @private
   */
  indicators: computed('childSlides.length', function() {
    return [...Array(this.get('childSlides.length'))];
  }),

  /**
   * If user is hovering its cursor on component.
   * This property is only manipulated when 'pauseOnMouseEnter' is true.
   *
   * @property isMouseHovering
   * @private
   * @type boolean
   */
  isMouseHovering: false,

  /**
   * The class name to append to the next control link element.
   *
   * @property nextControlClassName
   * @type string
   * @private
   */
  nextControlClassName: null,

  /**
   * Bootstrap style to indicate the next/previous slide.
   *
   * @property orderClassName
   * @private
   * @type string
   */
  orderClassName: null,

  /**
   * The current state of the current presentation, can be either "didTransition"
   * or "willTransit".
   *
   * @private
   * @property presentationState
   * @type string
   */
  presentationState: null,

  /**
   * The class name to append to the previous control link element.
   *
   * @property prevControlClassName
   * @type string
   * @private
   */
  prevControlClassName: null,

  /**
   * @private
   * @property shouldNotDoPresentation
   * @type boolean
   */
  shouldNotDoPresentation: lte('childSlides.length', 1),

  /**
   * @private
   * @property shouldRunAutomatically
   * @type boolean
   */
  shouldRunAutomatically: readOnly('hasInterval'),

  /**
   * Starts automatic sliding on page load.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default false
   * @property autoPlay
   * @public
   * @type boolean
   */
  autoPlay: false,

  /**
   * If false will hard stop on corners, i.e., first slide won't make a transition to the
   * last slide and vice versa.
   *
   * @default true
   * @property wrap
   * @public
   * @type boolean
   */
  wrap: true,

  /**
   * Index of starting slide.
   *
   * @default 0
   * @property index
   * @public
   * @type number
   */
  index: 0,

  /**
   * Waiting time before automatically show another slide.
   * Automatic sliding is canceled if interval is less than or equal to zero.
   *
   * @default 5000
   * @property interval
   * @public
   * @type number
   */
  interval: 5000,

  /**
   * Should bind keyboard events into sliding.
   *
   * @default true
   * @property keyboard
   * @public
   * @type boolean
   */
  keyboard: true,

  /**
   * If automatic sliding should be left-to-right or right-to-left.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default true
   * @property ltr
   * @public
   * @type boolean
   */
  ltr: true,

  /**
   * The next control icon to be displayed.
   *
   * @default null
   * @property nextControlIcon
   * @type string
   * @public
   */
  nextControlIcon: null,

  /**
   * Label for screen readers, defaults to 'Next'.
   *
   * @default 'Next'
   * @property nextControlLabel
   * @type string
   * @public
   */
  nextControlLabel: 'Next',

  /**
   * Pauses automatic sliding if mouse cursor is hovering the component.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default true
   * @property pauseOnMouseEnter
   * @public
   * @type boolean
   */
  pauseOnMouseEnter: true,

  /**
   * The previous control icon to be displayed.
   *
   * @default null
   * @property prevControlIcon
   * @type string
   * @public
   */
  prevControlIcon: null,

  /**
   * Label for screen readers, defaults to 'Previous'.
   *
   * @default 'Previous'
   * @property prevControlLabel
   * @type string
   * @public
   */
  prevControlLabel: 'Previous',

  /**
   * Show or hide controls.
   *
   * @default true
   * @property showControls
   * @public
   * @type boolean
   */
  showControls: true,

  /**
   * Show or hide indicators.
   *
   * @default true
   * @property showIndicators
   * @public
   * @type boolean
   */
  showIndicators: true,

  /**
   * The duration of the slide transition.
   * You should also change this parameter in Bootstrap CSS file.
   *
   * @default 600
   * @property transitionDuration
   * @public
   * @type number
   */
  transitionDuration: 600,

  /**
   * The type slide transition to perform.
   * Options are 'fade' or 'slide'. Note: BS4 only
   *
   * @default 'slide'
   * @property transition
   * @public
   * @type string
   */
  transition: 'slide',

  /**
   * Do a presentation and calls itself to perform a cycle.
   *
   * @method cycle
   * @private
   */
  cycle: task(function* () {
    yield this.get('transitioner').perform();
    yield timeout(this.get('interval'));
    this.toAppropriateSlide();
  }).restartable(),

  /**
   * @method transitioner
   * @private
   */
  transitioner: task(function* () {
    this.set('presentationState', 'willTransit');
    yield timeout(this.get('transitionDuration'));
    this.set('presentationState', 'didTransition');
    // Must change current index after execution of 'presentationStateObserver' method
    // from child components.
    yield new RSVP.Promise((resolve) => {
      schedule('afterRender', this, function() {
        this.set('currentIndex', this.get('followingIndex'));
        resolve();
      });
    });
  }).drop(),

  /**
   * Waits an interval time to start a cycle.
   *
   * @method waitIntervalToInitCycle
   * @private
   */
  waitIntervalToInitCycle: task(function* () {
    if (this.get('shouldRunAutomatically') === false) {
      return;
    }
    yield timeout(this.get('interval'));
    this.toAppropriateSlide();
  }).restartable(),

  actions: {
    toSlide(toIndex) {
      if (this.get('currentIndex') === toIndex || this.get('shouldNotDoPresentation')) {
        return;
      }
      this.assignClassNameControls(toIndex);
      this.setFollowingIndex(toIndex);
      if (this.get('shouldRunAutomatically') === false || this.get('isMouseHovering')) {
        this.get('transitioner').perform();
      } else {
        this.get('cycle').perform();
      }
    },

    toNextSlide() {
      if (this.get('canTurnToRight')) {
        this.send('toSlide', this.get('currentIndex') + 1);
      }
    },

    toPrevSlide() {
      if (this.get('canTurnToLeft')) {
        this.send('toSlide', this.get('currentIndex') - 1);
      }
    }
  },

  /**
   * Indicates what class names should be applicable to the current transition slides.
   *
   * @method assignClassNameControls
   * @private
   */
  assignClassNameControls(toIndex) {
    if (toIndex < this.get('currentIndex')) {
      this.set('directionalClassName', 'right');
      this.set('orderClassName', 'prev');
    } else {
      this.set('directionalClassName', 'left');
      this.set('orderClassName', 'next');
    }
  },

  /**
   * Initial page loading configuration.
   */
  didInsertElement() {
    this._super(...arguments);
    this.registerEvents();
    this.triggerChildSlidesObserver();
  },

  init() {
    this._super(...arguments);
    this.set('currentIndex', this.get('index'));
  },

  /**
   * mouseEnter() and mouseLeave() doesn't work with ember-native-dom-event-dispatcher.
   *
   * @method registerEvents
   * @private
   */
  registerEvents() {
    let self = this;
    this.element.addEventListener('mouseenter', function() {
      if (self.get('pauseOnMouseEnter')) {
        self.set('isMouseHovering', true);
        self.get('cycle').cancelAll();
        self.get('waitIntervalToInitCycle').cancelAll();
      }
    });
    this.element.addEventListener('mouseleave', function() {
      if (
        self.get('pauseOnMouseEnter')
        && (
          self.get('transitioner.last') !== null
          || self.get('waitIntervalToInitCycle.last') !== null
        )
      ) {
        self.set('isMouseHovering', false);
        self.get('waitIntervalToInitCycle').perform();
      }
    });
  },

  keyDown: function(e) {
    let code = e.keyCode || e.which;
    if (
      this.get('keyboard') === false
      || /input|textarea/i.test(e.target.tagName)
    ) {
      return;
    }
    switch (code) {
      case 37:
        this.send('toPrevSlide');
        break;
      case 39:
        this.send('toNextSlide');
        break;
      default: break;
    }
  },

  /**
   * Sets the following slide index within the lower and upper bounds.
   *
   * @method setFollowingIndex
   * @private
   */
  setFollowingIndex(toIndex) {
    let slidesLengthMinusOne = this.get('childSlides').length - 1;
    if (toIndex > slidesLengthMinusOne) {
      this.set('followingIndex', 0);
    } else if (toIndex < 0) {
      this.set('followingIndex', slidesLengthMinusOne);
    } else {
      this.set('followingIndex', toIndex);
    }
  },

  /**
   * Coordinates the correct slide movement direction.
   *
   * @method toAppropriateSlide
   * @private
   */
  toAppropriateSlide() {
    if (this.get('ltr')) {
      this.send('toNextSlide');
    } else {
      this.send('toPrevSlide');
    }
  },

  /**
   * @method triggerChildSlidesObserver
   * @private
   */
  triggerChildSlidesObserver() {
    this.get('childSlides');
  }
});
