import { ModifierLike } from '@glint/template';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'focus-trap': ModifierLike<{
      Args: {
        Named: {
          shouldSelfFocus?: boolean;
          focusTrapOptions?: {
            clickOutsideDeactivates?: boolean;
            fallbackFocus?: string;
            escapeDeactivates?: boolean;
          };
        };
      };
    }>;
  }
}
