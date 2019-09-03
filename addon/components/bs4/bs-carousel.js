import { classNameBindings } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import BaseCarousel from 'ember-bootstrap/components/base/bs-carousel';

@classNameBindings('carouselFade')
export default class Carousel extends BaseCarousel {
  nextControlClassName = 'carousel-control-next';
  nextControlIcon = 'carousel-control-next-icon';
  prevControlClassName = 'carousel-control-prev';
  prevControlIcon = 'carousel-control-prev-icon';

  @(equal('transition', 'fade').readOnly())
  carouselFade;
}
