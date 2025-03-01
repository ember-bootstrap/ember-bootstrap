import Component from '@glimmer/component';
import { next } from '@ember/runloop';
import { ref } from 'ember-ref-bucket';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import type { PresentationState } from '../bs-carousel';

export type DirectionalClassName = keyof Pick<CarouselSlide, 'left' | 'right'>;
export type OrderClassName = keyof Pick<CarouselSlide, 'prev' | 'next'>;

export interface CarouselSlideSignature {
  Args: {
    currentSlide?: CarouselSlide;
    directionalClassName?: DirectionalClassName | null;
    followingSlide?: CarouselSlide;
    orderClassName?: OrderClassName | null;
    presentationState?: PresentationState | null;
    registerChild?: (slide: CarouselSlide) => void;
    unregisterChild?: (slide: CarouselSlide) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

/**
  A visible user-defined slide.

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselSlide
  @namespace Components
  @extends Component
  @public
 */
export default class CarouselSlide extends Component<CarouselSlideSignature> {
  /**
   * @property _element
   * @type null | HTMLElement
   * @private
   */
  @ref('mainNode') _element: HTMLElement | null = null;

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
  @tracked
  left = false;

  /**
   * Next to appear in a left sliding.
   *
   * @property next
   * @type boolean
   * @private
   */
  @tracked
  next = false;

  /**
   * Next to appear in a right sliding.
   *
   * @property prev
   * @type boolean
   * @private
   */
  @tracked
  prev = false;

  /**
   * Slide is moving to the right.
   *
   * @property right
   * @type boolean
   * @private
   */
  @tracked
  right = false;

  constructor(owner: Owner, args: CarouselSlideSignature['Args']) {
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
    const presentationState = this.args.presentationState;
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
    if (this.args.directionalClassName) {
      this[this.args.directionalClassName] = false;
    }
    this.active = false;
  }

  /**
   * @method currentSlideWillTransit
   * @private
   */
  currentSlideWillTransit() {
    this.active = true;
    next(this, function (this: CarouselSlide) {
      if (this.args.directionalClassName) {
        this[this.args.directionalClassName] = true;
      }
    });
  }

  /**
   * @method followingSlideDidTransition
   * @private
   */
  followingSlideDidTransition() {
    this.active = true;
    if (this.args.directionalClassName) {
      this[this.args.directionalClassName] = false;
    }
    if (this.args.orderClassName) {
      this[this.args.orderClassName] = false;
    }
  }

  /**
   * @method followingSlideWillTransit
   * @private
   */
  followingSlideWillTransit() {
    if (this.args.orderClassName) {
      this[this.args.orderClassName] = true;
    }
    next(this, () => {
      this.reflow();
      if (this.args.directionalClassName) {
        this[this.args.directionalClassName] = true;
      }
    });
  }

  /**
   * Makes things more stable, especially when fast changing.
   */
  reflow() {
    this._element?.offsetHeight;
  }
}
