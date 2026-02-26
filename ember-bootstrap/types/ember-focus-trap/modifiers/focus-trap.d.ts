import { ModifierLike } from '@glint/template';
import { Options as FocusTrapOptions } from 'focus-trap';

const focusTrap: ModifierLike<{
  Args: {
    Named: {
      shouldSelfFocus?: boolean;
      focusTrapOptions?: FocusTrapOptions;
    };
  };
}>;

export default focusTrap;
