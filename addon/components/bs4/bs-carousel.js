import Carousel from 'ember-bootstrap/components/base/bs-carousel';
import { equal } from '@ember/object/computed';


export default Carousel.extend({
  nextControlClassName: 'carousel-control-next',
  nextControlIcon: 'carousel-control-next-icon',
  prevControlClassName: 'carousel-control-prev',
  prevControlIcon: 'carousel-control-prev-icon',
  classNameBindings: ['carouselFade'],
  carouselFade: equal('transition', 'fade').readOnly()
});
