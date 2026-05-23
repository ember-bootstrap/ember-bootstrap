import { on } from '@ember/modifier';
import bsDefault from '../../../helpers/bs-default.ts';
import bsNoop from '../../../helpers/bs-noop.ts';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface CloseSignature {
  Args: {
    onClick?: (event: MouseEvent) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
}

export default <template>
  <button
    type='button'
    aria-label='Close'
    class={{if
      (macroCondition (macroGetOwnConfig 'isBS4'))
      'close'
      'btn-close'
    }}
    ...attributes
    {{on 'click' (bsDefault @onClick (bsNoop))}}
  >
    {{#if (macroCondition (macroGetOwnConfig 'isBS4'))}}<span
        aria-hidden='true'
      >&times;</span>{{/if}}
  </button>
</template> satisfies TemplateOnlyComponent<CloseSignature>;
