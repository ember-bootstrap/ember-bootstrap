/**
 *
 * @class ModalHeaderClose
 * @namespace Components
 * @extends Glimmer.Component
 * @private
 */

/**
 * @event onClick
 * @public
 */

import templateOnly from '@ember/component/template-only';

export interface CloseSignature {
  Args: {
    onClick?: (event: MouseEvent) => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
}

export default templateOnly<CloseSignature>();

<button type="button" aria-label="Close" class={{if (macroCondition (macroGetOwnConfig "isBS4")) "close" "btn-close"}} ...attributes {{on "click" (bs-default @onClick (bs-noop))}}>
  {{#if (macroCondition (macroGetOwnConfig "isBS4"))}}<span aria-hidden="true">&times;</span>{{/if}}
</button>