import CarouselSlide from 'ember-bootstrap/components/base/bs-carousel/slide';

export default CarouselSlide.extend({
  classNameBindings: [
    'left:carousel-item-left',
    'next:carousel-item-next',
    'prev:carousel-item-prev',
    'right:carousel-item-right'
  ],
  classNames: ['carousel-item']
});
