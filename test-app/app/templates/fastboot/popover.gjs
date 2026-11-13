import RouteTemplate from 'ember-route-template';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsPopover from 'ember-bootstrap/components/bs-popover';

export default RouteTemplate(
  <template>
    <BsButton>
      Popover on left
      <BsPopover @placement='left' title='Popover on left'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
        magnam similique voluptate!
      </BsPopover>
    </BsButton>
  </template>,
);
