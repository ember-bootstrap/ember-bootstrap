import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import CarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

@classic
@classNameBindings(
  'left:carousel-item-left',
  'next:carousel-item-next',
  'prev:carousel-item-prev',
  'right:carousel-item-right'
)
@classNames('carousel-item')
export default class Slide extends CarouselSlide {}
