import RouteTemplate from 'ember-route-template';
import BsButton from 'ember-bootstrap/components/bs-button';
import BsForm from 'ember-bootstrap/components/bs-form';

export default RouteTemplate(
  <template>
    <BsForm @model={{@controller}} as |form|>
      <form.element
        @controlType="email"
        @label="Email"
        @placeholder="Email"
        @property="email"
        @required={{true}}
      />
      <BsButton @defaultText="Submit" @type="primary" type="submit" />
    </BsForm>
  </template>,
);
