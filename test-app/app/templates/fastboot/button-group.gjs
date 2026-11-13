import RouteTemplate from 'ember-route-template';
import BsButtonGroup from 'ember-bootstrap/components/bs-button-group';

export default RouteTemplate(
  <template>
    <BsButtonGroup @type='checkbox' as |bg|>
      <bg.button @value='1'>1</bg.button>
      <bg.button @value='2'>2</bg.button>
      <bg.button @value='3'>3</bg.button>
    </BsButtonGroup>
  </template>,
);
