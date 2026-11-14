import RouteTemplate from 'ember-route-template';
import BsNav from 'ember-bootstrap/components/bs-nav';

export default RouteTemplate(
  <template>
    <BsNav as |nav|>
      <nav.item>
        <nav.link-to @route="acceptance.linkto" @model="1">
          first
        </nav.link-to>
      </nav.item>
      <nav.item>
        <nav.link-to @route="acceptance.linkto" @model="2">
          second
        </nav.link-to>
      </nav.item>
      <nav.item>
        <nav.link-to @route="acceptance.linkto" @model={{@model}}>
          current
        </nav.link-to>
      </nav.item>
    </BsNav>
  </template>,
);
