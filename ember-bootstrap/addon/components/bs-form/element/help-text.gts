import type { TemplateOnlyComponent } from '@ember/component/template-only';
export default <template>
  {{! @glint-nocheck }}
  <div id={{@id}} class='form-text' ...attributes>
    {{@text}}
  </div>
</template> satisfies TemplateOnlyComponent<{ Args: {} }>;
