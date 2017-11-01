import ComponentChild from 'ember-bootstrap/mixins/component-child';
import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-carousel/slide';
import { computed, observer } from '@ember/object';
import { next } from '@ember/runloop';
/**
  A visible user-defined slide.

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselSlide
  @namespace Components
  @extends Ember.Component
  @public
 */
export default Ember.Component.extend(ComponentChild, {
  classNameBindings: ['active'],
  layout,

  /**
   * Defines slide visibility.
   *
   * @property active
   * @type boolean
   * @private
   */
  active: false,

  isCurrentSlide: computed('currentSlide', function() {
    return this.get('currentSlide') === this;
  }),

  isFollowingSlide: computed('followingSlide', function() {
    return this.get('followingSlide') === this;
  }),

  /**
   * Slide is moving to the left.
   *
   * @property left
   * @type boolean
   * @private
   */
  left: false,

  /**
   * Next to appear in a left sliding.
   *
   * @property next
   * @type boolean
   * @private
   */
  next: false,

  /**
   * Next to appear in a right sliding.
   *
   * @property prev
   * @type boolean
   * @private
   */
  prev: false,

  /**
   * Slide is moving to the right.
   *
   * @property right
   * @type boolean
   * @private
   */
  right: false,

  stateObserver: observer('state', function() {
    let state = this.get('state');
    if (this.get('isCurrentSlide')) {
      switch (state) {
        case 'didTransition':
          this.currentSlideDidTransition();
          break;
        case 'initialization':
          this.currentSlideInitialization();
          break;
        case 'willTransit':
          this.currentSlideWillTransit();
          break;
      }
    }
    if (this.get('isFollowingSlide')) {
      switch (state) {
        case 'didTransition':
          this.followingSlideDidTransition();
          break;
        case 'willTransit':
          this.followingSlideWillTransit();
          break;
      }
    }
  }),

  currentSlideInitialization() {
    if (this.get('directionalClassName') !== null && this.get('orderClassName') !== null) {
      this.set(this.get('directionalClassName'), false);
      this.set(this.get('orderClassName'), false);
    }
    this.set('active', true);
  },

  currentSlideDidTransition() {
    this.set(this.get('directionalClassName'), false);
    this.set('active', false);
  },

  currentSlideWillTransit() {
    next(this, function() {
      this.set(this.get('directionalClassName'), true);
    });
  },

  followingSlideDidTransition() {
    this.set('active', true);
    this.set(this.get('directionalClassName'), false);
    this.set(this.get('orderClassName'), false);
  },

  followingSlideWillTransit() {
    this.set(this.get('orderClassName'), true);
    next(this, function() {
      this.set(this.get('directionalClassName'), true);
    });
  }
});
