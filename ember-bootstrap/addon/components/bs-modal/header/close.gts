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
