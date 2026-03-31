import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
  {{! @glint-nocheck }}
  {{#if @show}}
    <span class='form-control-feedback {{@iconName}}' aria-hidden='true'></span>
  {{/if}}
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
