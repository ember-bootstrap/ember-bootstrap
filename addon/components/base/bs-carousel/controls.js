import Ember from 'ember';
import layout from 'ember-bootstrap/templates/components/bs-carousel/controls';

/**
  Controls user interaction for next or previous slides. 

  See [Components.Carousel](Components.Carousel.html) for examples.

  @class CarouselControls
  @namespace Components
  @extends Ember.Component
  @public
 */
export default Ember.Component.extend({
  layout,
  tagName: '',

  /**
   * The class name to append to the next link element.
   *
   * @property nextClassName
   * @type string
   * @private
   */
  nextClassName: null,

  /**
   * The parent's id of this component.
   *
   * @property parentElementId
   * @type string
   * @private
   */
  parentElementId: null,

  /**
   * The class name to append to the previous link element.
   *
   * @property prevClassName
   * @type string
   * @private
   */
  prevClassName: null,

  /**
   * Function to call on next click event.
   *
   * @property toNextSlide
   * @private
   */
  toNextSlide: null,

  /**
   * Function to call on previous click event.
   *
   * @property toPrevSlide
   * @private
   */
  toPrevSlide: null,

  /**
   * The next icon to be displayed to the user.
   *
   * @property nextIcon
   * @type string
   * @public
   */
  nextIcon: 'icon-next',

  /**
   * Label for screen readers, defaults to 'Next'.
   *
   * @property nextLabel
   * @type string
   * @public
   */
  nextLabel: 'Next',

  /**
   * The previos icon to be displayed to the user.
   *
   * @property nextIcon
   * @type string
   * @public
   */
  prevIcon: 'icon-prev',

  /**
   * Label for screen readers, defaults to 'Prev'.
   *
   * @property prevLabel
   * @type string
   * @public
   */
  prevLabel: 'Previous'
});
