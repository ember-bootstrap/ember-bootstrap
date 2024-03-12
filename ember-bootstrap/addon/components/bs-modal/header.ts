/**

 Modal header element used within [Components.Modal](Components.Modal.html) components. See there for examples.

 @class ModalHeader
 @namespace Components
 @extends Glimmer.Component
 @public
 */

/**
 * Show a close button (x icon)
 *
 * @property closeButton
 * @type boolean
 * @default true
 * @public
 */

/**
 * The title to display in the modal header
 *
 * @property title
 * @type string
 * @default null
 * @public
 */

/**
 * @property titleComponent
 * @type {String}
 * @private
 */

/**
 * @property closeComponent
 * @type {String}
 * @private
 */

/**
 * @event onClose
 * @public
 */
import templateOnly from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';

type TitleComponentSignature = {
  Blocks: {
    default: [];
  };
};

type CloseComponentSignature = {
  Args: {
    onClose?: () => void;
  };
};

type BsModalHeaderSignature = {
  Args: {
    closeButton?: boolean;
    title?: string;
    titleComponent?: ComponentLike<TitleComponentSignature>;
    closeComponent?: ComponentLike<CloseComponentSignature>;
    onClose?: () => void;
  };
  Blocks: {
    default: [
      {
        title: ComponentLike<TitleComponentSignature>;
        close: ComponentLike<CloseComponentSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
};

export default templateOnly<BsModalHeaderSignature>();
