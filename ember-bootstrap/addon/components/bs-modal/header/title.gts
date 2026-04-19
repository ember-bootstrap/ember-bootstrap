/**
 *
 * @class ModalHeaderTitle
 * @namespace Components
 * @extends Glimmer.Component
 * @private
 */
import templateOnly from '@ember/component/template-only';

export interface TitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLHeadingElement;
}

export default templateOnly<TitleSignature>();
