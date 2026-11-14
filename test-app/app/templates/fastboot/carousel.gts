import RouteTemplate from 'ember-route-template';
import BsCarousel from 'ember-bootstrap/components/bs-carousel';

export default RouteTemplate(
  <template>
    <BsCarousel
      @autoPlay={{true}}
      @showControls={{true}}
      @showIndicators={{true}}
      as |car|
    >
      <car.slide />
      <car.slide />
      <car.slide />
    </BsCarousel>
  </template>,
);
