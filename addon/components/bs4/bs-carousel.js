import { classNameBindings } from '@ember-decorators/component';
import { equal } from '@ember/object/computed';
import BaseCarousel from 'ember-bootstrap/components/base/bs-carousel';
import defaultValue from 'ember-bootstrap/utils/default-decorator';

@classNameBindings('carouselFade')
export default class Carousel extends BaseCarousel {
  @defaultValue
  nextControlClassName = 'carousel-control-next';

  @defaultValue
  nextControlIcon = 'carousel-control-next-icon';

  @defaultValue
  prevControlClassName = 'carousel-control-prev';

  @defaultValue
  prevControlIcon = 'carousel-control-prev-icon';

  @(equal('transition', 'fade').readOnly())
  carouselFade;
}
