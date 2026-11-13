import RouteTemplate from 'ember-route-template';
import BsModalSimple from 'ember-bootstrap/components/bs-modal-simple';

export default RouteTemplate(
  <template>
    <BsModalSimple @open={{true}} @title='Simple Modal' @size='sm'>
      Hi there
    </BsModalSimple>
  </template>,
);
