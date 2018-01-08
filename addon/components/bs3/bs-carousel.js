import Carousel from 'ember-bootstrap/components/base/bs-carousel';

export default Carousel.extend({
  nextControlClassName: 'carousel-control right',
  nextControlIcon: 'icon-next',
  prevControlClassName: 'carousel-control left',
  prevControlIcon: 'icon-prev'
});
