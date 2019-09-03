import { classNameBindings } from '@ember-decorators/component';
import BaseCarousel from 'ember-bootstrap/components/base/bs-carousel';

@classNameBindings('carouselFade')
export default class Carousel extends BaseCarousel {
  nextControlClassName = 'carousel-control right';
  nextControlIcon = 'icon-next';
  prevControlClassName = 'carousel-control left';
  prevControlIcon = 'icon-prev';
}
