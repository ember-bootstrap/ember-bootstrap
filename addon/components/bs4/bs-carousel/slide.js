import CarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

export default CarouselSlide.extend({
  classNameBindings: [
    'carousel-item-left:left',
    'carousel-item-next:next',
    'carousel-item-prev:prev',
    'carousel-item-right:right'
  ],
  classNames: ['carousel-item']
});