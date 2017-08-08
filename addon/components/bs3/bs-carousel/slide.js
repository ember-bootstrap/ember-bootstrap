import CarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

export default CarouselSlide.extend({
  classNameBindings: ['left', 'next', 'prev', 'right'],
  classNames: ['item']
});
