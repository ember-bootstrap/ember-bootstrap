import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import Carousel from 'ember-bootstrap/components/base/bs-carousel';


@classic
@classNameBindings('carouselFade')
export default class BsCarousel extends Carousel {
  nextControlClassName = 'carousel-control-next';
  nextControlIcon = 'carousel-control-next-icon';
  prevControlClassName = 'carousel-control-prev';
  prevControlIcon = 'carousel-control-prev-icon';

  @(equal('transition', 'fade').readOnly())
  carouselFade;
}
