import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface TitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLHeadingElement;
}

export default <template>
  <h5 class='modal-title' ...attributes>
    {{yield}}
  </h5>
</template> satisfies TemplateOnlyComponent<TitleSignature>;
