import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { ref } from 'ember-ref-bucket';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';

/**
  A visible user-defined slide.

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselSlide
  @namespace Components
  @extends Component
  @public
 */
export default class CarouselSlide extends Component {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('mainNode') _element = null;

  /**
   * Defines slide visibility.
   *
   * @property active
   * @type boolean
   * @private
   */
  @tracked
  active = this.isCurrentSlide && this.args.presentationState === null;

  /**
   * @private
   * @property isCurrentSlide
   * @type boolean
   */
  get isCurrentSlide() {
    return this.args.currentSlide === this;
  }

  /**
   * @private
   * @property isFollowingSlide
   * @type boolean
   */
  get isFollowingSlide() {
    return this.args.followingSlide === this;
  }

  /**
   * Slide is moving to the left.
   *
   * @property left
   * @type boolean
   * @private
   */
  left = false;

  /**
   * Next to appear in a left sliding.
   *
   * @property next
   * @type boolean
   * @private
   */
  next = false;

  /**
   * Next to appear in a right sliding.
   *
   * @property prev
   * @type boolean
   * @private
   */
  prev = false;

  /**
   * Slide is moving to the right.
   *
   * @property right
   * @type boolean
   * @private
   */
  right = false;

  constructor(owner, args) {
    super(owner, args);

    args.registerChild?.(this);
    registerDestructor(this, () => {
      this.args.unregisterChild?.(this);
    });
  }

  /**
   * Coordinates the execution of a presentation.
   *
   * @method presentationStateObserver
   * @private
   */
  @action
  presentationStateObserver() {
    if (!this.active) {
      this.active = this.isCurrentSlide && this.args.presentationState === null;
    }
    let presentationState = this.args.presentationState;
    if (this.isCurrentSlide) {
      switch (presentationState) {
        case 'didTransition':
          this.currentSlideDidTransition();
          break;
        case 'willTransit':
          this.currentSlideWillTransit();
          break;
      }
    }
    if (this.isFollowingSlide) {
      switch (presentationState) {
        case 'didTransition':
          this.followingSlideDidTransition();
          break;
        case 'willTransit':
          this.followingSlideWillTransit();
          break;
      }
    }
  }

  /**
   * @method currentSlideDidTransition
   * @private
   */
  currentSlideDidTransition() {
    this.directionalClassName = false;
    this.active = false;
  }

  /**
   * @method currentSlideWillTransit
   * @private
   */
  currentSlideWillTransit() {
    this.active = true;
    next(this, function () {
      this.directionalClassName = true;
    });
  }

  /**
   * @method followingSlideDidTransition
   * @private
   */
  followingSlideDidTransition() {
    this.active = true;
    this.directionalClassName = false;
    this.orderClassName = false;
  }

  /**
   * @method followingSlideWillTransit
   * @private
   */
  followingSlideWillTransit() {
    this.orderClassName = true;
    next(this, () => {
      this.reflow();
      this.directionalClassName = true;
    });
  }

  /**
   * Makes things more stable, especially when fast changing.
   */
  reflow() {
    this._element.offsetHeight;
  }
}
