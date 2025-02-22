import { ModifierLike } from '@glint/template';
import { Options as FocusTrapOptions } from 'focus-trap';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'focus-trap': ModifierLike<{
      Args: {
        Named: {
          shouldSelfFocus?: boolean;
          focusTrapOptions?: FocusTrapOptions;
        };
      };
    }>;
  }
}
