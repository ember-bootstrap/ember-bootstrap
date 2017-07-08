import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-carousel/slide';

/**
  A visible user-defined slide.

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselSlide
  @namespace Components
  @extends Ember.Component
  @public  
 */
export default Ember.Component.extend({
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

  didReceiveAttrs() {
    this._super(...arguments);
    let slides = this.get('slides');
    if (slides) {
      slides.pushObject(this);
    }
  },
  willDestroyElement() {
    this._super(...arguments);
    let slides = this.get('slides');
    if (slides) {
      slides.removeObject(this);
    }
  }
});
