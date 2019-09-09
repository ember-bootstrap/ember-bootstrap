import { classNameBindings, classNames } from '@ember-decorators/component';
import BaseCarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

@classNameBindings('left', 'next', 'prev', 'right')
@classNames('item')
export default class CarouselSlide extends BaseCarouselSlide {}
