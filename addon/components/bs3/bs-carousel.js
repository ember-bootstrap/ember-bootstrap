import { classNameBindings } from '@ember-decorators/component';
import BaseCarousel from 'ember-bootstrap/components/base/bs-carousel';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@classNameBindings('carouselFade')
export default class Carousel extends BaseCarousel {
  @defaultValue
  nextControlClassName = 'carousel-control right';

  @defaultValue
  nextControlIcon = 'icon-next';

  @defaultValue
  prevControlClassName = 'carousel-control left';

  @defaultValue
  prevControlIcon = 'icon-prev';
}
