import type { ComponentLike } from '@glint/template';
import bsDefault from 'ember-bootstrap/helpers/bs-default';
import BsButton from 'ember-bootstrap/components/bs-button';
import { on } from '@ember/modifier';
import bsNoop from 'ember-bootstrap/helpers/bs-noop';
import bsConditionalAttribute from 'ember-bootstrap/modifiers/bs-conditional-attribute';
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
  {{#let (bsDefault @buttonComponent (component BsButton)) as |Button|}}
    <div
      class='modal-footer'
      ...attributes
      {{on 'submit' (bsDefault @onSubmit (bsNoop))}}
    >
      {{#if (has-block)}}
        {{yield}}
      {{else}}
        {{#if @submitTitle}}
          <Button @onClick={{@onClose}}>{{bsDefault @closeTitle 'Ok'}}</Button>
          <Button
            @type={{bsDefault @submitButtonType 'primary'}}
            @onClick={{@onSubmit}}
            {{bsConditionalAttribute 'disabled' @submitDisabled 'disabled'}}
          >
            {{@submitTitle}}
          </Button>
        {{else}}
          <Button @type='primary' @onClick={{@onClose}}>{{bsDefault
              @closeTitle
              'Ok'
            }}</Button>
        {{/if}}
      {{/if}}
    </div>
  {{/let}}
</template> satisfies TemplateOnlyComponent<FooterSignature>;
