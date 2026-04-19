import { on } from '@ember/modifier';
import bsDefault from 'ember-bootstrap/helpers/bs-default';
import bsNoop from 'ember-bootstrap/helpers/bs-noop';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { macroCondition } from '@embroider/macros';
declare function macroGetOwnConfig(path: string): boolean;

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
