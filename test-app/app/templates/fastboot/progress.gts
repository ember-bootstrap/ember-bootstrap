import RouteTemplate from 'ember-route-template';
import BsProgress from 'ember-bootstrap/components/bs-progress';

export default RouteTemplate(
  <template>
    <BsProgress as |pg|>
      <pg.bar @value={{50}} />
    </BsProgress>
  </template>,
);
