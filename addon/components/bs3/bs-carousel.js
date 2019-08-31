import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Carousel from 'ember-bootstrap/components/base/bs-carousel';


@classic
@classNameBindings('carouselFade')
export default class BsCarousel extends Carousel {
  nextControlClassName = 'carousel-control right';
  nextControlIcon = 'icon-next';
  prevControlClassName = 'carousel-control left';
  prevControlIcon = 'icon-prev';
}
