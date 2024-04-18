import templateOnly from '@ember/component/template-only';

interface DropdownButtonSignature {
  Element: HTMLButtonElement;
  Args: {
    block?: boolean;

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
    onKeyDown: () => void;

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
export default templateOnly<DropdownButtonSignature>();
