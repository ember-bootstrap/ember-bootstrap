import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
  {{! @glint-nocheck }}
  {{#if @hasLabel}}
    <@labelComponent />
  {{/if}}
  {{yield}}
  <@errorsComponent />
  <@helpTextComponent />
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
