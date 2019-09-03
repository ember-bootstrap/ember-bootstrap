import { classNameBindings, classNames } from '@ember-decorators/component';
import BaseCarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

@classNameBindings(
  'left:carousel-item-left',
  'next:carousel-item-next',
  'prev:carousel-item-prev',
  'right:carousel-item-right'
)
@classNames('carousel-item')
export default class CarouselSlide extends BaseCarouselSlide {}
