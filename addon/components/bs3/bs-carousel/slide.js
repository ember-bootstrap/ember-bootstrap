import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import CarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

@classic
@classNameBindings('left', 'next', 'prev', 'right')
@classNames('item')
export default class Slide extends CarouselSlide {}
