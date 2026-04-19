import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface BodySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default <template>
  <div class='modal-body' ...attributes>
    {{yield}}
  </div>
</template> satisfies TemplateOnlyComponent<BodySignature>;
