import CarouselSlide from 'ember-bootstrap/components/bs-carousel/slide';
import ComponentParent from 'ember-bootstrap/mixins/component-parent';
import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-carousel';
import listenTo from 'ember-bootstrap/utils/listen-to-cp';
import { computed, observer } from '@ember/object';
import { next, schedule } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';

/**
  Ember implementation of Bootstrap's Carousel. Supports all original features but API is different:

  | Description | Original | Component |
  | ------ | ------ | ------ |
  | Autoplays after first user event or on page load. | ride='carousel'\|false | autoPlay=false\|true |
  | Disable automatic cycle. | interval=false | interval=0 |
  | If first slide should follow last slide on "previous" event, the  opposite will also be true for "next" event. | wrap=false\|true | continuouslyCicle=false\|true |
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
      <img alt="First slide" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNzc3OiM1NTUvdGV4dDpGaXJzdCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1Y2ZlYzcyYmI5IHRleHQgeyBmaWxsOiM1NTU7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTVjZmVjNzJiYjkiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNzc3Ii8+PGc+PHRleHQgeD0iMzA4IiB5PSIyNjcuMSI+Rmlyc3Qgc2xpZGU8L3RleHQ+PC9nPjwvZz48L3N2Zz4=">
    {{/car.slide}}
    {{#car.slide}}
      <img alt="Second slide" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNjY2OiM0NDQvdGV4dDpTZWNvbmQgc2xpZGUKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWNmZWM3NGFmMSB0ZXh0IHsgZmlsbDojNDQ0O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjQ1cHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1Y2ZlYzc0YWYxIj48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzY2NiIvPjxnPjx0ZXh0IHg9IjI2NC41IiB5PSIyNjcuMSI+U2Vjb25kIHNsaWRlPC90ZXh0PjwvZz48L2c+PC9zdmc+">
    {{/car.slide}}
    {{#car.slide}}
      <img alt="Third slide" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDkwMCA1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzkwMHg1MDAvYXV0by8jNTU1OiMzMzMvdGV4dDpUaGlyZCBzbGlkZQpDcmVhdGVkIHdpdGggSG9sZGVyLmpzIDIuNi4wLgpMZWFybiBtb3JlIGF0IGh0dHA6Ly9ob2xkZXJqcy5jb20KKGMpIDIwMTItMjAxNSBJdmFuIE1hbG9waW5za3kgLSBodHRwOi8vaW1za3kuY28KLS0+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48IVtDREFUQVsjaG9sZGVyXzE1Y2ZlYzZmYWFmIHRleHQgeyBmaWxsOiMzMzM7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6NDVwdCB9IF1dPjwvc3R5bGU+PC9kZWZzPjxnIGlkPSJob2xkZXJfMTVjZmVjNmZhYWYiPjxyZWN0IHdpZHRoPSI5MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNTU1Ii8+PGc+PHRleHQgeD0iMjk3LjUiIHk9IjI2Ny4xIj5UaGlyZCBzbGlkZTwvdGV4dD48L2c+PC9nPjwvc3ZnPg==">
    {{/car.slide}}
  {{/bs-carousel}}
 ```

  To better understand the whole documentation, you should be aware of the following operations:

  | Operation | Description |
  | ------ | ------ |
  | Transition | Swaps two slides. |
  | Interval | Waiting time after a transition. |
  | Presentation | (Transition ⋁ Interval) of a single slide. |
  | Cycle | Presents all slides until it reaches first or last slide. |
  | Continuously cycle | Infinite cycling without stops. |
  ```

  @class Carousel
  @namespace Components
  @extends Ember.Component
  @public
 */
export default Ember.Component.extend(ComponentParent, {
  classNames: ['carousel', 'slide'],
  layout,

  /**
   * If a slide can turn to left, including corners.
   * 
   * @private
   * @property canTurnToLeft
   */
  canTurnToLeft: computed('continuouslyCycle', 'currentIndex', function() {
    return this.get('continuouslyCycle') || this.get('currentIndex') > 0;
  }),

  /**
   * If a slide can turn to right, including corners.
   * 
   * @private
   * @property canTurnToRight
   */
  canTurnToRight: computed('childSlides.length', 'continuouslyCycle', 'currentIndex', function() {
    return this.get('continuouslyCycle') || this.get('currentIndex') < this.get('childSlides.length') - 1;
  }),

  /**
   * All `CarouselSlide` child components.
   *
   * @private
   * @property childSlides
   * @readonly
   * @type array
   */
  childSlides: computed.filter('children', function(view) {
    return view instanceof CarouselSlide;
  }),

  /**
   * This observer is the entry point for real time insertion and removing of slides.
   * 
   * @private
   * @property childSlidesObserver
   */
  childSlidesObserver: observer('childSlides', function() {
    let childSlides = this.get('childSlides');
    if (childSlides.length > 0) {
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
      // Default starting slide parameters
      if (this.get('directionalClassName') !== null && this.get('orderClassName') !== null) {
        childSlides[currentIndex].set(this.get('orderClassName'), false);
        childSlides[currentIndex].set(this.get('directionalClassName'), false);
      }
      childSlides[currentIndex].set('active', true);
    }
  }),

  /**
   * Listen to the provided starting index, you should see the mixin for more information.
   * 
   * @property currentIndex
   * @private
   */
  currentIndex: listenTo('index'),

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
   * @property indicators
   * @private
   */
  indicators: computed('childSlides.length', function() {
    return [...Array(this.get('childSlides.length'))];
  }),

  /**
   * If user is hovering its cursor on component.
   * This property is only manipulated when 'pauseOneMouseEnter' is true.
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
  shouldNotDoPresentation: computed.lt('childSlides.length', 2),

  /**
   * @private
   * @property shouldRunAutomatically
   * @type boolean
   */
  shouldRunAutomatically: computed.gt('interval', 0),

  /**
   * Starts automatic sliding on page load.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @property autoPlay
   * @public
   * @type boolean
   */
  autoPlay: false,

  /**
   * Should have hard stop on slides indexes corners.
   *
   * @property continuouslyCycle
   * @public
   * @type boolean
   */
  continuouslyCycle: true,

  /**
   * Index of starting slide.
   *
   * @property index
   * @public
   * @type number
   */
  index: 0,

  /**
   * Waiting time before automatically show another slide.
   * Automatic sliding is canceled if interval is less than or equal to zero.
   *
   * @property interval
   * @public
   * @type number
   */
  interval: 5000,

  /**
   * Should bind keyboard events into sliding.
   *
   * @property keyboard
   * @public
   * @type boolean
   */
  keyboard: true,

  /**
   * If automatic sliding should be left-to-right or right-to-left.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @property ltr
   * @public
   * @type boolean
   */
  ltr: true,

  /**
   * The next icon to be displayed to the user.
   *
   * @property nextControlIcon
   * @type string
   * @public
   */
  nextControlIcon: null,

  /**
   * Label for screen readers, defaults to 'Next'.
   *
   * @property nextControlLabel
   * @type string
   * @public
   */
  nextControlLabel: 'Next',

  /**
   * Pauses automatic sliding if mouse cursor is hovering the component.
   * This parameter has no effect if interval is less than or equal to zero.
   * 
   * @property pauseOnMouseEnter
   * @public
   * @type boolean
   */
  pauseOnMouseEnter: true,

  /**
   * The previous icon to be displayed to the user.
   *
   * @property prevControlIcon
   * @type string
   * @public
   */
  prevControlIcon: null,

  /**
   * Label for screen readers, defaults to 'Previous'.
   *
   * @property prevControlLabel
   * @type string
   * @public
   */
  prevControlLabel: 'Previous',

  /**
   * Show or hide controls.
   * 
   * @property showControls
   * @public
   * @type boolean
   */
  showControls: true,

  /**
   * Show or hide indicators.
   * 
   * @property showIndicators
   * @public
   * @type boolean
   */
  showIndicators: true,

  /**
   * The duration of the slide transition.
   *
   * @default 600
   * @property transitionDuration
   * @public
   * @type number
   */
  transitionDuration: 600,

  /**
   * Do a presentation and calls itself to perform a cycle.
   * 
   * @method cycle
   * @private
   */
  cycle: task(function* () {
    this.get('transition').perform();
    yield timeout(this.get('interval') + this.get('transitionDuration'));
    if (this.get('ltr')) {
      this.send('toNextSlide');
    } else {
      this.send('toPrevSlide');
    }
  }).restartable(),

  /**
   * @method transition
   * @private
   */
  transition: task(function* () {
    let slides = this.get('childSlides');
    let currSlide = slides[this.get('currentIndex')];
    let followingSlide = slides[this.get('followingIndex')];
    this.set('currentIndex', this.get('followingIndex'));
    this.willTransit(currSlide, followingSlide);
    yield timeout(this.get('transitionDuration'));
    this.didTransition(currSlide, followingSlide);
  }).drop(),

  /**
   * Waits a interval time to start a cycle.
   * 
   * @method waitIntervalToInitCycle
   * @private
   */
  waitIntervalToInitCycle: task(function* () {
    if (this.get('shouldRunAutomatically') === false) {
      return;
    }
    yield timeout(this.get('interval'));
    if (this.get('ltr')) {
      this.send('toNextSlide');
    } else {
      this.send('toPrevSlide');
    }
  }).restartable(),

  actions: {
    toSlide(toIndex) {
      if (this.get('currentIndex') === toIndex || this.get('shouldNotDoPresentation')) {
        return;
      }
      this.assignClassNameControls(toIndex);
      this.setfollowingIndex(toIndex);
      if (this.get('shouldRunAutomatically') === false || this.get('isMouseHovering')) {
        this.get('transition').perform();
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

  didInsertElement() {
    this._super(...arguments);
    this.registerEvents();
    // Weird bug?! On page load, any carousel without indicators doesn't
    // trigger the 'childSlidesObserver', thus, nothing happens.
    schedule('sync', this, function() {
      if (this.get('showIndicators') === false) {
        this.notifyPropertyChange('childSlides');
      }
    });
  },

  /**
   * Applies class names to slides, sets the current index as the following index and
   * indicates that the transition has finished.
   * 
   * @method didTransition
   * @private
   */
  didTransition(currSlide, followingSlide) {
    if (currSlide.isDestroyed === false) {
      currSlide.set('active', false);
      currSlide.set(this.get('directionalClassName'), false);
    }
    if (followingSlide.isDestroyed === false) {
      followingSlide.set('active', true);
      followingSlide.set(this.get('directionalClassName'), false);
      followingSlide.set(this.get('orderClassName'), false);
    }
  },

  /**
   * For some reason Ember's mouseEnter() and mouseLeave() doesn't work and keypress() doesn't 
   * work without tabindex (IE11+).
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
          self.get('transition.last') !== null
          || self.get('waitIntervalToInitCycle.last') !== null
        )
      ) {
        self.set('isMouseHovering', false);
        self.get('waitIntervalToInitCycle').perform();
      }
    });
    window.addEventListener('keypress', function(e) {
      if (self.get('keyboard')) {
        let code = e.keyCode || e.which;
        switch (code) {
          case 37:
            self.send('toPrevSlide');
            break;
          case 39:
            self.send('toNextSlide');
            break;
          default: break;
        }
      }
    });
  },

  /**
   * Sets the following slide index within the lower and upper bounds.
   * 
   * @method setfollowingIndex
   * @private
   */
  setfollowingIndex(toIndex) {
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
   * @method willTransit
   * @private
   */
  willTransit(currSlide, followingSlide) {
    followingSlide.set(this.get('orderClassName'), true);
    next(this, function() {
      this.element.offsetHeight;
      currSlide.set(this.get('directionalClassName'), true);
      followingSlide.set(this.get('directionalClassName'), true);
    });
  }
});