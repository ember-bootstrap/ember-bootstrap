import bsFormHorizInputClass from 'ember-bootstrap/helpers/bs-form-horiz-input-class';
import bsFormHorizOffsetClass from 'ember-bootstrap/helpers/bs-form-horiz-offset-class';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
  {{! @glint-nocheck }}
  {{#if @hasLabel}}
    <@labelComponent @labelClass={{@horizontalLabelGridClass}} />
    <div class={{bsFormHorizInputClass @horizontalLabelGridClass}}>
      {{yield}}
      <@errorsComponent />
      <@helpTextComponent />
    </div>
  {{else}}
    <div
      class='{{bsFormHorizInputClass @horizontalLabelGridClass}}
        {{bsFormHorizOffsetClass @horizontalLabelGridClass}}'
    >
      {{yield}}
      <@errorsComponent />
      <@helpTextComponent />
    </div>
  {{/if}}
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
