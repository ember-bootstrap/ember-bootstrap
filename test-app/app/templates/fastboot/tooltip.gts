import RouteTemplate from 'ember-route-template';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsTooltip from 'ember-bootstrap/components/bs-tooltip';

export default RouteTemplate(
  <template>
    <BsButton class='mb-1'>
      Tooltip on left
      <BsTooltip @placement='left'>Tooltip on left</BsTooltip>
    </BsButton>
  </template>,
);
