import Component from '@glimmer/component';
import { type ButtonSignature } from '../bs-button';

interface DropdownButtonSignature {
  Element: HTMLButtonElement;
  Args: Pick<
    ButtonSignature['Args'],
    'active' | 'block' | 'size' | 'type' | 'outline'
  > & {
    /**
     * @internal
     */
    isOpen: boolean;

    /**
     * @internal
     */
    onClick: () => void;

    /**
     * @internal
     */
    onKeyDown: (event: Event) => void;

    /**
     * @internal
     */
    registerChildElement: (
      element: HTMLButtonElement,
      [type]: ['toggle'],
    ) => void;

    /**
     * @internal
     */
    unregisterChildElement: (
      element: HTMLButtonElement,
      [type]: ['toggle'],
    ) => void;
  };
  Blocks: {
    default: [];
  };
}

/**
 Button component with that can act as a dropdown toggler.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @public
 */
export default class BsDropdownButtonComponent extends Component<DropdownButtonSignature> {
  get block() {
    return this.args.block ?? false;
  }
}
export { type DropdownButtonSignature };
