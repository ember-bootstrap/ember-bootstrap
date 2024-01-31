import { action } from '@ember/object';
import CarouselSlide from 'ember-bootstrap/components/bs-carousel/slide';
import Component from '@glimmer/component';
import { schedule } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

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
  | Waiting time of slides in an automatic cycle. | interval=n | interval=n |

  Default settings are the same as the original, so you don't have to worry about changing parameters.

  ```hbs
  <BsCarousel as |car|>
    <car.slide>
      <img alt="First slide" src="slide1.jpg">
    </car.slide>
    <car.slide>
      <img alt="Second slide" src="slide2.jpg">
    </car.slide>
    <car.slide>
      <img alt="Third slide" src="slide3.jpg">
    </car.slide>
  </BsCarousel>
  ```

  To better understand the whole documentation, you should be aware of the following operations:

  | Operation | Description |
  | ------ | ------ |
  | Transition | Swaps two slides. |
  | Interval | Waiting time after a transition. |
  | Presentation | Represents a single transition, or a single interval, or the union of both. |
  | Cycle | Presents all slides until it reaches first or last slide. |
  | Wrap | wrap slides, cycles without stopping at first or last slide. |

  *Note that only invoking the component in a template as shown above is considered part of its public API. Extending from it (subclassing) is generally not supported, and may break at any time.*

  @class Carousel
  @namespace Components
  @extends Component
  @public
*/
export default class Carousel extends Component {
  tabindex = '1';

  /**
   * @property slideComponent
   * @type {String}
   * @private
   */

  /**
   * If a slide can turn to left, including corners.
   *
   * @private
   * @property canTurnToLeft
   */
  get canTurnToLeft() {
    return this.wrap || this.currentIndex > 0;
  }

  /**
   * If a slide can turn to right, including corners.
   *
   * @private
   * @property canTurnToRight
   */
  get canTurnToRight() {
    return this.wrap || this.currentIndex < this.childSlides.length - 1;
  }

  @tracked
  children = [];

  /**
   * All `CarouselSlide` child components.
   *
   * @private
   * @property childSlides
   * @readonly
   * @type array
   */
  get childSlides() {
    return this.children.filter((view) => view instanceof CarouselSlide);
  }

  /**
   * This observer is the entry point for real time insertion and removing of slides.
   *
   * @private
   * @property childSlidesObserver
   */
  @action
  childSlidesObserver() {
    let childSlides = this.childSlides;
    if (childSlides.length === 0) {
      return;
    }
    // Sets new current index
    let currentIndex = this.currentIndex;
    if (currentIndex >= childSlides.length) {
      currentIndex = childSlides.length - 1;
      this.currentIndex = currentIndex;
    }
    // Automatic sliding
    if (this.autoPlay) {
      this.waitIntervalToInitCycle.perform();
    }
    // Initial slide state
    this.presentationState = null;
  }

  /**
   * Indicates the current index of the current slide.
   *
   * @property currentIndex
   * @private
   */
  @tracked
  currentIndex = this.index;

  /**
   * The current slide object that is going to be used by the nested slides components.
   *
   * @property currentSlide
   * @private
   *
   */
  get currentSlide() {
    return this.childSlides[this.currentIndex];
  }

  /**
   * Bootstrap style to indicate that a given slide should be moving to left/right.
   *
   * @property directionalClassName
   * @private
   * @type { 'left' | 'right' | null }
   */
  @tracked
  directionalClassName = null;

  /**
   * Indicates the next slide index to move into.
   *
   * @property followingIndex
   * @private
   * @type number
   */
  @tracked
  followingIndex = null;

  /**
   * The following slide object that is going to be used by the nested slides components.
   *
   * @property followingIndex
   * @private
   */
  get followingSlide() {
    return this.childSlides[this.followingIndex];
  }

  /**
   * @private
   * @property hasInterval
   * @type boolean
   */
  get hasInterval() {
    return this.interval > 0;
  }

  /**
   * This observer is the entry point for programmatically slide changing.
   *
   * @property indexObserver
   * @private
   */
  @action
  indexObserver() {
    this.toSlide(this.index);
  }

  /**
   * @property indicators
   * @private
   */
  get indicators() {
    return [...Array(this.childSlides.length)];
  }

  /**
   * If user is hovering its cursor on component.
   * This property is only manipulated when 'pauseOnMouseEnter' is true.
   *
   * @property isMouseHovering
   * @private
   * @type boolean
   */
  @tracked
  isMouseHovering = false;

  /**
   * The class name to append to the next control link element.
   *
   * @property nextControlClassName
   * @type string
   * @private
   */

  /**
   * Bootstrap style to indicate the next/previous slide.
   *
   * @property orderClassName
   * @private
   * @type string
   */
  @tracked
  orderClassName = null;

  /**
   * The current state of the current presentation, can be either "didTransition"
   * or "willTransit".
   *
   * @private
   * @property presentationState
   * @type { 'didTransition' | 'willTransit' | null }
   */
  @tracked
  presentationState = null;

  /**
   * The class name to append to the previous control link element.
   *
   * @property prevControlClassName
   * @type string
   * @private
   */

  /**
   * @private
   * @property shouldNotDoPresentation
   * @type boolean
   */
  get shouldNotDoPresentation() {
    return this.childSlides.length <= 1;
  }

  /**
   * @private
   * @property shouldRunAutomatically
   * @type boolean
   */
  get shouldRunAutomatically() {
    return this.hasInterval;
  }

  /**
   * Starts automatic sliding on page load.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default false
   * @property autoPlay
   * @public
   * @type boolean
   */
  get autoPlay() {
    return this.args.autoPlay ?? false;
  }

  /**
   * If false will hard stop on corners, i.e., first slide won't make a transition to the
   * last slide and vice versa.
   *
   * @default true
   * @property wrap
   * @public
   * @type boolean
   */
  get wrap() {
    return this.args.wrap ?? true;
  }

  /**
   * Index of starting slide.
   *
   * @default 0
   * @property index
   * @public
   * @type number
   */
  get index() {
    return this.args.index ?? 0;
  }

  /**
   * Waiting time before automatically show another slide.
   * Automatic sliding is canceled if interval is less than or equal to zero.
   *
   * @default 5000
   * @property interval
   * @public
   * @type number
   */
  get interval() {
    return this.args.interval ?? 5000;
  }

  /**
   * Should bind keyboard events into sliding.
   *
   * @default true
   * @property keyboard
   * @public
   * @type boolean
   */
  get keyboard() {
    return this.args.keyboard ?? true;
  }

  /**
   * If automatic sliding should be left-to-right or right-to-left.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default true
   * @property ltr
   * @public
   * @type boolean
   */
  get ltr() {
    return this.args.ltr ?? true;
  }

  /**
   * The next control icon to be displayed.
   *
   * @default null
   * @property nextControlIcon
   * @type string
   * @public
   */

  /**
   * Label for screen readers, defaults to 'Next'.
   *
   * @default 'Next'
   * @property nextControlLabel
   * @type string
   * @public
   */
  get nextControlLabel() {
    return this.args.nextControlLabel ?? 'Next';
  }

  /**
   * Pauses automatic sliding if mouse cursor is hovering the component.
   * This parameter has no effect if interval is less than or equal to zero.
   *
   * @default true
   * @property pauseOnMouseEnter
   * @public
   * @type boolean
   */
  get pauseOnMouseEnter() {
    return this.args.pauseOnMouseEnter ?? true;
  }

  /**
   * The previous control icon to be displayed.
   *
   * @default null
   * @property prevControlIcon
   * @type string
   * @public
   */

  /**
   * Label for screen readers, defaults to 'Previous'.
   *
   * @default 'Previous'
   * @property prevControlLabel
   * @type string
   * @public
   */
  get prevControlLabel() {
    return this.args.prevControlLabel ?? 'Previous';
  }

  /**
   * Show or hide controls.
   *
   * @default true
   * @property showControls
   * @public
   * @type boolean
   */
  get showControls() {
    return this.args.showControls ?? true;
  }

  /**
   * Show or hide indicators.
   *
   * @default true
   * @property showIndicators
   * @public
   * @type boolean
   */
  get showIndicators() {
    return this.args.showIndicators ?? true;
  }

  /**
   * The duration of the slide transition.
   * You should also change this parameter in Bootstrap CSS file.
   *
   * @default 600
   * @property transitionDuration
   * @public
   * @type number
   */
  get transitionDuration() {
    return this.args.transitionDuration ?? 600;
  }

  /**
   * The type slide transition to perform.
   * Options are 'fade' or 'slide'. Note: BS4 only
   *
   * @default 'slide'
   * @property transition
   * @public
   * @type string
   */
  get transition() {
    return this.args.transition ?? 'slide';
  }

  get carouselFade() {
    return this.transition === 'fade';
  }

  /**
   * Action called after the slide has changed.
   *
   * @event onSlideChanged
   * @param toIndex
   * @public
   */

  /**
   * Do a presentation and calls itself to perform a cycle.
   *
   * @method cycle
   * @this Carousel
   * @private
   */
  cycle = task({ restartable: true }, async () => {
    await this.transitioner.perform();
    await timeout(this.interval);
    this.toAppropriateSlide();
  });

  /**
   * @method transitioner
   * @this Carousel
   * @private
   */
  transitioner = task({ drop: true }, async () => {
    this.presentationState = 'willTransit';
    await timeout(this.transitionDuration);
    this.presentationState = 'didTransition';
    // Must change current index after execution of 'presentationStateObserver' method
    // from child components.
    await new Promise((resolve) => {
      schedule('afterRender', this, () => {
        this.currentIndex = this.followingIndex;
        resolve();
      });
    });
  });

  /**
   * Waits an interval time to start a cycle.
   *
   * @method waitIntervalToInitCycle
   * @this Carousel
   * @private
   */
  waitIntervalToInitCycle = task({ restartable: true }, async () => {
    if (this.shouldRunAutomatically === false) {
      return;
    }
    await timeout(this.interval);
    this.toAppropriateSlide();
  });

  @action
  toSlide(toIndex) {
    if (this.currentIndex === toIndex || this.shouldNotDoPresentation) {
      return;
    }
    this.assignClassNameControls(toIndex);
    this.setFollowingIndex(toIndex);
    if (this.shouldRunAutomatically === false || this.isMouseHovering) {
      this.transitioner.perform();
    } else {
      this.cycle.perform();
    }
    this.args.onSlideChanged?.(toIndex);
  }

  @action
  toNextSlide() {
    if (this.canTurnToRight) {
      this.toSlide(this.currentIndex + 1);
    }
  }

  @action
  toPrevSlide() {
    if (this.canTurnToLeft) {
      this.toSlide(this.currentIndex - 1);
    }
  }

  /**
   * Indicates what class names should be applicable to the current transition slides.
   *
   * @method assignClassNameControls
   * @private
   */
  assignClassNameControls(toIndex) {
    if (toIndex < this.currentIndex) {
      this.directionalClassName = 'right';
      this.orderClassName = 'prev';
    } else {
      this.directionalClassName = 'left';
      this.orderClassName = 'next';
    }
  }

  @action
  handleMouseEnter() {
    if (this.pauseOnMouseEnter) {
      this.isMouseHovering = true;
      this.cycle.cancelAll();
      this.waitIntervalToInitCycle.cancelAll();
    }
  }

  @action
  handleMouseLeave() {
    if (
      this.pauseOnMouseEnter &&
      (this.transitioner.last !== null ||
        this.waitIntervalToInitCycle.last !== null)
    ) {
      this.isMouseHovering = false;
      this.waitIntervalToInitCycle.perform();
    }
  }

  @action
  handleKeyDown(e) {
    let code = e.keyCode || e.which;
    if (this.keyboard === false || /input|textarea/i.test(e.target.tagName)) {
      return;
    }
    switch (code) {
      case 37:
        this.toPrevSlide();
        break;
      case 39:
        this.toNextSlide();
        break;
      default:
        break;
    }
  }

  /**
   * Sets the following slide index within the lower and upper bounds.
   *
   * @method setFollowingIndex
   * @private
   */
  setFollowingIndex(toIndex) {
    let slidesLengthMinusOne = this.childSlides.length - 1;
    if (toIndex > slidesLengthMinusOne) {
      this.followingIndex = 0;
    } else if (toIndex < 0) {
      this.followingIndex = slidesLengthMinusOne;
    } else {
      this.followingIndex = toIndex;
    }
  }

  /**
   * Coordinates the correct slide movement direction.
   *
   * @method toAppropriateSlide
   * @private
   */
  toAppropriateSlide() {
    if (this.ltr) {
      this.toNextSlide();
    } else {
      this.toPrevSlide();
    }
  }

  @action
  registerChild(element) {
    schedule('actions', this, () => {
      this.children = [...this.children, element];
    });
  }

  @action
  unregisterChild(element) {
    schedule('actions', this, () => {
      this.children = this.children.filter((value) => value !== element);
    });
  }
}
