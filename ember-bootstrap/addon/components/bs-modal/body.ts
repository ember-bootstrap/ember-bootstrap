/**

 Modal body element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalBody
 @namespace Components
 @extends Glimmer.Component
 @public
 */
import templateOnly from '@ember/component/template-only';

interface BsModalBodySignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default templateOnly<BsModalBodySignature>();
