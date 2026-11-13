import RouteTemplate from 'ember-route-template';
import BsCollapse from 'ember-bootstrap/components/bs-collapse';

export default RouteTemplate(
  <template>
    <BsCollapse @collapsed={{false}}>
      <div class='well'>
        <p>This is collapsible content</p>
      </div>
    </BsCollapse>
  </template>,
);
