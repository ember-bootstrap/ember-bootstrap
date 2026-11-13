import RouteTemplate from 'ember-route-template';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsModalSimple from 'ember-bootstrap/components/bs-modal-simple';

export default RouteTemplate(
  <template>
    <BsButton id='openModal' @onClick={{@controller.addModal}}>Open</BsButton>

    {{#if @controller.hasModal}}
      <BsModalSimple
        @open={{@controller.modal}}
        @onHidden={{@controller.removeModal}}
        @title='Dynamic Dialog'
      >
        Hi there
      </BsModalSimple>
    {{/if}}
  </template>,
);
