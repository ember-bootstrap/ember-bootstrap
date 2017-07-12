import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-carousel';

const {
  A,
  computed,
  run: { cancel, debounce, later, next },
  set
} = Ember;

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
  | Show or hide controls  | Tag manipulation. | Nested component. |
  | Show or hide indicators  | Tag manipulation. | showIndicators=false\|true |
  | Waiting time of slides in a automatic cycle. | interval=n | interval=n |

  Default settings are the same as the original so you don't have to worry about changing parameters.

 ```hbs
  {{#bs-carousel as |car|}}
    {{car.controls}}
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
export default Ember.Component.extend({
  classNames: ['carousel', 'slide'],
  layout,

  /**
   * @private
   * @property canTurnToLeft
   */
  canTurnToLeft: computed('continuouslyCycle', 'index', function() {
    return this.get('continuouslyCycle') || this.get('index') > 0;
  }),

  /**
   * @private
   * @property canTurnToRight
   */
  canTurnToRight: computed('continuouslyCycle', 'index', 'slides', function() {
    return this.get('continuouslyCycle') || this.get('index') < this.get('slides').length - 1;
  }),

  /**
   * Holds the cycle scheduled item.
   *
   * @property cycle
   * @private
   */
  cycle: null,

  /**
   * Bootstrap style to indicate that a given slide should be moving to left/right.
   *
   * @property directionalClassName
   * @private
   * @type string
   */
  directionalClassName: null,

  /**
   * Contains all information to render indicators.
   *
   * @property indicators
   * @private
   */
  indicators: null,

  /**
   * Relative to current index, indicates the next slide to move into.
   *
   * @property followingSlideIndex
   * @private
   * @type string
   */
  followingSlideIndex: null,

  /**
   * Bootstrap style to indicate the next/previous slide.
   *
   * @property orderClassName
   * @private
   * @type string
   */
  orderClassName: null,

  /**
   * Contains all components slides children.
   *
   * @property slides
   * @private
   */
  slides: null,

  /**
   * If user is hovering its cursor on component.
   *
   * @property isMouseHovering
   * @private
   * @type boolean
   */
  isMouseHovering: false,

  /**
   * Current slide transition has finished.
   *
   * @property transitionFinished
   * @private
   * @type boolean
   */
  transitionFinished: true,

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
   * Pauses automatic sliding if mouse cursor is hovering the component.
   * This parameter has no effect if interval is less than or equal to zero.
   * 
   * @property pauseOnMouseEnter
   * @public
   * @type boolean
   */
  pauseOnMouseEnter: true,

  /**
   * Show or hide indicators.
   * 
   * @property showIndicators
   * @public
   * @type boolean
   */
  showIndicators: true,

  /**
   * The duration of the slides transition.
   * 
   * @default 600
   * @property transitionDuration
   * @public
   * @type number
   */
  transitionDuration: 600,

  actions: {
    toSlide(toIndex) {
      if (this.get('index') === toIndex) {
        return;
      }
      if (this.shouldRunAutomatically() && this.get('isMouseHovering') === false) {
        this.cancelCycle();
        this.waitPresentationToInitCycle();
      }
      this.transition(toIndex, true);
    },

    toNextSlide() {
      if (this.get('canTurnToRight')) {
        this.send('toSlide', this.get('index') + 1);
      }
    },

    toPrevSlide() {
      if (this.get('canTurnToLeft')) {
        this.send('toSlide', this.get('index') - 1);
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.populateIndicators();
    this.registerEvents();
    if (this.get('slides').length !== 0) {
      this.get('slides')[this.get('index')].set('active', true);
    }
    if (this.shouldRunAutomatically() && this.get('autoPlay')) {
      this.waitIntervalToInitCycle();
    }
  },

  init() {
    this._super(...arguments);
    this.set('slides', A([]));
  },

  /**
   * Transfers 'active' class name of current index to the next follwing index.
   * 
   * @method adjustIndicators
   * @private
   */
  adjustIndicators() {
    let indicators = this.get('indicators');
    let currIndicator = indicators[this.get('index')];
    let followingIndicator = indicators[this.get('followingSlideIndex')];
    set(currIndicator, 'active', false);
    set(followingIndicator, 'active', true);
  },

  /**
   * Indicates what class names should be applicable to the current transition slides. 
   * 
   * @method assignClassNameControls
   * @private
   */
  assignClassNameControls(toIndex) {
    if (toIndex < this.get('index')) {
      this.set('directionalClassName', 'right');
      this.set('orderClassName', 'prev');
    } else {
      this.set('directionalClassName', 'left');
      this.set('orderClassName', 'next');
    }
  },

  /**
   * Cancels a scheduled cycle item.
   * 
   * @method cancelCycle
   * @private
   */
  cancelCycle() {
    cancel(this.get('cycle'));
  },

  /**
   * Do a presentation and calls itself to perform a cycle.
   * 
   * @method doCycle
   * @private
   */
  doCycle() {
    if (this.get('ltr') && this.get('canTurnToRight')) {
      this.transition(this.get('index') + 1);
    } else if (this.get('ltr') === false && this.get('canTurnToLeft')) {
      this.transition(this.get('index') - 1);
    } else {
      return null;
    }
    return later(this, function() {
      this.set('cycle', this.doCycle());
    }, this.get('transitionDuration') + this.get('interval'));
  },

  /**
   * Applies class names to slides, sets the current index as the following index and
   * indicates that the transition has finished.
   * 
   * @method didTransition
   * @private
   */
  didTransition(currSlide, followingSlide) {
    currSlide.set('active', false);
    currSlide.set(this.get('directionalClassName'), false);
    followingSlide.set('active', true);
    followingSlide.set(this.get('directionalClassName'), false);
    followingSlide.set(this.get('orderClassName'), false);
    this.set('index', this.get('followingSlideIndex'));
    this.set('transitionFinished', true);
  },

  /**
   * @method doTransition
   * @private
   */
  doTransition(toIndex) {
    this.assignClassNameControls(toIndex);
    this.setFollowingSlideIndex(toIndex);
    let slides = this.get('slides');
    let currSlide = slides[this.get('index')];
    let followingSlide = slides[this.get('followingSlideIndex')];
    this.willTransit(currSlide, followingSlide);
    later(
      this,
      this.didTransition,
      currSlide,
      followingSlide,
      this.get('transitionDuration'));
  },

  /**
   * Starts a cycle.
   * 
   * @method initCycle
   * @private
   */
  initCycle() {
    this.set('cycle', this.doCycle());
  },

  /**
   * Populate indicators array based on filled slides.
   * 
   * @method populateIndicators
   * @private
   */
  populateIndicators() {
    let indicators = A([]);
    for (let a = 0; a < this.get('slides').length; a++) {
      indicators.push({
        active: false,
        index: a
      });
    }
    if (indicators.length !== 0) {
      indicators[this.get('index')].active = true;
    }
    this.set('indicators', indicators);
  },

  /**
   * For some reason Ember's mouseEnter(), mouseLeave() and keyPress() doesn't work.
   * 
   * @method registerEvents
   * @private
   */
  registerEvents() {
    let self = this;
    this.element.addEventListener('mouseenter', function() {
      self.set('isMouseHovering', true);
      if (self.shouldRunAutomatically() && self.get('pauseOnMouseEnter')) {
        self.cancelCycle();
      }
    });
    this.element.addEventListener('mouseleave', function() {
      self.set('isMouseHovering', false);
      if (self.shouldRunAutomatically() && self.get('pauseOnMouseEnter')) {
        if (self.get('cycle') !== null && self.get('autoplay')) {
          return;
        }
        self.waitIntervalToInitCycle();
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
   * @method shouldRunAutomatically
   * @private
   */
  shouldRunAutomatically() {
    return this.get('interval') > 0;
  },

  /**
   * Sets the following slide index within the lower and upper bounds.
   * 
   * @method setFollowingSlideIndex
   * @private
   */
  setFollowingSlideIndex(toIndex) {
    let slidesLengthMinusOne = this.get('slides').length - 1;
    if (toIndex > slidesLengthMinusOne) {
      this.set('followingSlideIndex', 0);
    } else if (toIndex < 0) {
      this.set('followingSlideIndex', slidesLengthMinusOne);
    } else {
      this.set('followingSlideIndex', toIndex);
    }
  },

  /**
   * Groups all transition functionalities.
   * 
   * @method transition
   * @private
   */
  transition(toIndex) {
    if (this.get('transitionFinished')) {
      this.set('transitionFinished', false);
      this.doTransition(toIndex);
    }
  },

  /**
   * Waits a slide presentation time to start a cycle.
   * Debounce is used to prevent user event abuse.
   * 
   * @method waitPresentationToInitCycle
   * @private
   */
  waitPresentationToInitCycle() {
    debounce(this, this.initCycle, this.get('transitionDuration') + this.get('interval'));
  },

  /**
   * Waits a slide interval time to start a cycle.
   * Debounce is used to prevent user event abuse.
   * 
   * 
   * @method waitIntervalToInitCycle
   * @private
   */
  waitIntervalToInitCycle() {
    debounce(this, this.initCycle, this.get('interval'));
  },

  /**
   * @method willTransit
   * @private
   */
  willTransit(currSlide, followingSlide) {
    this.adjustIndicators();
    followingSlide.set(this.get('orderClassName'), true);
    next(this, function() {
      this.element.offsetHeight;
      currSlide.set(this.get('directionalClassName'), true);
      followingSlide.set(this.get('directionalClassName'), true);
    });
  }
});