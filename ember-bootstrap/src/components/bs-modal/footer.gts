import type { ComponentLike } from '@glint/template';
import bsDefault from '../../helpers/bs-default.ts';
import BsButton from '../bs-button.gts';
import { on } from '@ember/modifier';
import bsNoop from '../../helpers/bs-noop.ts';
import bsConditionalAttribute from '../../modifiers/bs-conditional-attribute.ts';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface FooterSignature {
  Args: {
    buttonComponent?: ComponentLike<{
      Element: Element;
      Args: {
        type?: string;
        onClick?: () => void;
      };
      Blocks: {
        default: [unknown];
      };
    }>;
    closeTitle?: string;
    onClose?: (event?: MouseEvent) => void;
    onSubmit?: (event?: SubmitEvent) => void;
    submitButtonType?: string;
    submitDisabled?: boolean;
    submitTitle?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default <template>
  {{#let (bsDefault @buttonComponent BsButton) as |Button|}}
    <div
      class='modal-footer'
      ...attributes
      {{on 'submit' (bsDefault @onSubmit (bsNoop))}}
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{#if @submitTitle}}
          {{! @glint-expect-error - Glint has issues with ComponentLike vs the actual component. Not sure why }}
          <Button @onClick={{@onClose}}>{{bsDefault @closeTitle 'Ok'}}</Button>\
          {{! @glint-expect-error - Glint has issues with ComponentLike vs the actual component. Not sure why }}
          <Button
            @type={{bsDefault @submitButtonType 'primary'}}
            @onClick={{@onSubmit}}
            {{bsConditionalAttribute 'disabled' @submitDisabled 'disabled'}}
          >
            {{@submitTitle}}
          </Button>
        {{else}}
          {{! @glint-expect-error - Glint has issues with ComponentLike vs the actual component. Not sure why }}
          <Button @type='primary' @onClick={{@onClose}}>{{bsDefault
              @closeTitle
              'Ok'
            }}</Button>
        {{/if}}
      {{/if}}
    </div>
  {{/let}}
</template> satisfies TemplateOnlyComponent<FooterSignature>;
