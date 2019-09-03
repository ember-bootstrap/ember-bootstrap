import { classNameBindings, layout as templateLayout } from '@ember-decorators/component';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import Component from '@ember/component';
import ComponentChild from 'ember-bootstrap/mixins/component-child';
import layout from 'ember-bootstrap/templates/components/bs-carousel/slide';
import { next } from '@ember/runloop';
import overrideableCP from 'ember-bootstrap/utils/cp/overrideable';

/**
  A visible user-defined slide.

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselSlide
  @namespace Components
  @extends Ember.Component
  @public
 */
@classNameBindings('active')
@templateLayout(layout)
export default class CarouselSlide extends Component.extend(ComponentChild) {
  /**
   * Defines slide visibility.
   *
   * @property active
   * @type boolean
   * @private
   */
  @overrideableCP('isCurrentSlide', 'presentationState', function() {
    return this.get('isCurrentSlide') && this.get('presentationState') === null;
  })
  active;

  /**
   * @private
   * @property isCurrentSlide
   * @type boolean
   */
  @(computed('currentSlide').readOnly())
  get isCurrentSlide() {
    return this.get('currentSlide') === this;
  }

  /**
   * @private
   * @property isFollowingSlide
   * @type boolean
   */
  @(computed('followingSlide').readOnly())
  get isFollowingSlide() {
    return this.get('followingSlide') === this;
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

  /**
   * Coordinates the execution of a presentation.
   *
   * @method presentationStateObserver
   * @private
   */
  @observes('presentationState')
  presentationStateObserver() {
    let presentationState = this.get('presentationState');
    if (this.get('isCurrentSlide')) {
      switch (presentationState) {
        case 'didTransition':
          this.currentSlideDidTransition();
          break;
        case 'willTransit':
          this.currentSlideWillTransit();
          break;
      }
    }
    if (this.get('isFollowingSlide')) {
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
    this.set(this.get('directionalClassName'), false);
    this.set('active', false);
  }

  /**
   * @method currentSlideWillTransit
   * @private
   */
  currentSlideWillTransit() {
    this.set('active', true);
    next(this, function() {
      this.set(this.get('directionalClassName'), true);
    });
  }

  /**
   * @method followingSlideDidTransition
   * @private
   */
  followingSlideDidTransition() {
    this.set('active', true);
    this.set(this.get('directionalClassName'), false);
    this.set(this.get('orderClassName'), false);
  }

  /**
   * @method followingSlideWillTransit
   * @private
   */
  followingSlideWillTransit() {
    this.set(this.get('orderClassName'), true);
    next(this, function() {
      this.reflow();
      this.set(this.get('directionalClassName'), true);
    });
  }

  /**
   * Makes things more stable, especially when fast changing.
   */
  reflow() {
    this.element.offsetHeight;
  }
}
