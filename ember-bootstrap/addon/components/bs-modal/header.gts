import type { ComponentLike } from '@glint/template';
import type { TitleSignature } from './header/title';
import type { CloseSignature } from './header/close';
import bsDefault from 'ember-bootstrap/helpers/bs-default';
import BsModalHeaderTitle from 'ember-bootstrap/components/bs-modal/header/title';
import BsModalHeaderClose from 'ember-bootstrap/components/bs-modal/header/close';
import { hash } from '@ember/helper';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HeaderSignature {
  Args: {
    closeButton?: boolean;
    title?: string;
    titleComponent?: ComponentLike<TitleSignature>;
    closeComponent?: ComponentLike<CloseSignature>;
    onClose?: () => void;
  };
  Blocks: {
    default: [
      {
        title: ComponentLike<TitleSignature>;
        close: ComponentLike<CloseSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default <template>
  {{#let
    (bsDefault @titleComponent (component BsModalHeaderTitle))
    (component
      (bsDefault @closeComponent (component BsModalHeaderClose))
      onClick=@onClose
    )
    as |Title Close|
  }}
    <div class='modal-header' ...attributes>
      {{#if (has-block-params)}}
        {{yield (hash title=Title close=Close)}}
      {{else}}
        {{#if (has-block)}}
          {{yield (hash title=Title close=Close)}}
        {{else}}
          <Title>{{@title}}</Title>
        {{/if}}
        {{#if (bsDefault @closeButton true)}}
          <Close />
        {{/if}}
      {{/if}}
    </div>
  {{/let}}
</template> satisfies TemplateOnlyComponent<HeaderSignature>;
